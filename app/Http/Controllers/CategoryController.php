<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\RedirectResponse;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return Inertia::render('Categories/Index', compact('categories'));
    }

    public function store(CategoryRequest $request): RedirectResponse
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
}
