<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;


class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Categories/Index', compact('categories'));
    }

    public function store(CategoryRequest $request)
    {
        $imageName = time() . '_' . $request->name . '.' . $request->image_url->extension();
        $imagePath = $request->image_url->storeAs('categories', $imageName, 'public');

        Category::create([
            'name' => $request->name,
            'image_url' => $imagePath,
        ]);

        return redirect()->route('categories.index')
            ->with('message', 'Category created successfully');
    }

    public function update(CategoryRequest $request, Category $category)
    {
        $data = $request->validated();

        if ($request->hasFile('image_url')) {
            if ($category->image_url) {
                Storage::disk('public')->delete($category->image_url);
            }
            $imageName = time() . '_' . $request->name . '.' . $request->image_url->extension();

            $imagePath = $request->image_url->storeAs('categories', $imageName, 'public');
            $data['image_url'] = $imagePath;
        }
        $category->update($data);

        return redirect()->route('categories.index')->with('message', 'Category updated successfully');
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->route('categories.index')->with('message', 'Category deleted successfully');
    }
}
