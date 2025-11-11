import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar';

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/components/ui/collapsible';

import { resolveUrl } from '@/lib/utils';
import { NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>

            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.subItems && item.subItems.length > 0 ? (
                            <Collapsible
                                defaultOpen={false}
                                className="group/collapsible"
                            >
                                <CollapsibleTrigger asChild>
                                    <SidebarMenuButton
                                        isActive={page.url.startsWith(
                                            resolveUrl(item.href ?? '#'),
                                        )}
                                        className="flex cursor-pointer items-center justify-between"
                                    >
                                        <div className="flex items-center gap-2">
                                            {item.icon && (
                                                <item.icon className="h-4 w-4" />
                                            )}
                                            <span>{item.title}</span>
                                        </div>
                                        <ChevronDown className="transition-transform duration-300 group-data-[state=open]/collapsible:rotate-180" />
                                    </SidebarMenuButton>
                                </CollapsibleTrigger>

                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.subItems.map((sub) => (
                                            <SidebarMenuSubItem key={sub.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={page.url.startsWith(
                                                        resolveUrl(
                                                            sub.href ?? '#',
                                                        ),
                                                    )}
                                                >
                                                    <Link href={sub.href}>
                                                        {sub.title}
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </Collapsible>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={page.url.startsWith(
                                    resolveUrl(item.href ?? '#'),
                                )}
                            >
                                <Link href={item.href ?? '#'}>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
