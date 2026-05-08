"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Briefcase, 
  FolderGit2, 
  Code2, 
  Award, 
  Mail, 
  Settings, 
  LogOut,
  GraduationCap
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Education", href: "/admin/education", icon: GraduationCap },
  { name: "Experience", href: "/admin/experience", icon: Briefcase },
  { name: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { name: "Skills", href: "/admin/skills", icon: Code2 },
  { name: "Certificates", href: "/admin/certificates", icon: Award },
  { name: "Messages", href: "/admin/contacts", icon: Mail },
  { name: "Hero Settings", href: "/admin/settings/hero", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="w-64 border-r border-border glass hidden md:flex flex-col z-20">
        <div className="h-16 flex items-center px-6 border-b border-border">
          <span className="text-lg font-bold font-heading text-primary">Admin Panel</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-border">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 flex items-center px-6 border-b border-border glass-card shrink-0 z-10 relative">
          <h2 className="text-lg font-semibold font-heading capitalize text-foreground">
            {pathname.split("/").pop() || "Dashboard"}
          </h2>
        </header>
        <div className="flex-1 overflow-y-auto p-6 relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
          <div className="relative z-10">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
