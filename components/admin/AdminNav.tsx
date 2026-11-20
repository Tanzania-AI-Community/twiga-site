import Link from "next/link";
import { Activity, LayoutDashboard, LogOut, Users } from "lucide-react";

import { adminLogout } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { FilterPopover } from "@/components/admin/FilterPopover";

type AdminPage = "dashboard" | "telemetry";

const PAGES: { key: AdminPage; href: string; label: string; icon: typeof Activity }[] = [
  { key: "dashboard", href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "telemetry", href: "/admin/telemetry", label: "Telemetry", icon: Activity },
];

/**
 * Slim sticky admin nav: brand and page links on the left, grouped actions on
 * the right. Filters live behind a popover and only apply to the dashboard.
 */
export function AdminNav({ active = "dashboard" }: { active?: AdminPage }) {
  return (
    <header className="sticky top-0 z-30 border-b border-green-100 bg-white">
      <div className="container mx-auto flex items-center gap-3 px-4 py-2.5">
        <div className="flex items-center gap-2.5">
          <div className="grid h-8 w-8 flex-none place-items-center rounded-full bg-green-100">
            <Users className="h-4 w-4 text-green-600" />
          </div>
          <h1 className="whitespace-nowrap text-lg font-bold text-green-700 max-sm:hidden">
            Twiga Admin
          </h1>
        </div>
        <nav className="ml-1 flex items-center gap-1 sm:ml-3" aria-label="Admin pages">
          {PAGES.map(({ key, href, label, icon: Icon }) => (
            <Link
              key={key}
              href={href}
              aria-current={active === key ? "page" : undefined}
              className={cn(
                "inline-flex h-8 items-center gap-1.5 rounded-md px-2.5 text-sm font-medium transition-colors",
                active === key
                  ? "bg-green-100 text-green-800"
                  : "text-slate-600 hover:bg-green-50 hover:text-green-700"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          {active === "dashboard" && <FilterPopover />}
          <form action={adminLogout}>
            <Button variant="outline" className="gap-2 rounded-md">
              <LogOut className="h-4 w-4" />
              <span className="max-sm:hidden">Sign Out</span>
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
