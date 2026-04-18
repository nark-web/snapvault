import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Camera,
  FolderOpen,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";

const NAV_LINKS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/folders", label: "My Folders", icon: FolderOpen },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

function Sidebar({ onClose }: { onClose?: () => void }) {
  const { isAuthenticated, logout } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <aside className="flex flex-col h-full bg-sidebar border-r border-sidebar-border w-64">
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-sidebar-border">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.logo_link"
        >
          <div className="w-8 h-8 rounded-sm bg-accent flex items-center justify-center shadow-sm">
            <Camera className="w-4 h-4 text-accent-foreground" />
          </div>
          <span className="font-display font-semibold text-lg text-sidebar-foreground tracking-tight">
            SnapVault
          </span>
        </Link>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4">
        {isAuthenticated ? (
          <ul className="space-y-0.5">
            {NAV_LINKS.map(({ to, label, icon: Icon }) => {
              const active = currentPath.startsWith(to);
              return (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={onClose}
                    data-ocid={`nav.${label.toLowerCase().replace(/\s+/g, "_")}_link`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-sm text-sm font-medium transition-smooth",
                      active
                        ? "bg-sidebar-accent text-sidebar-foreground"
                        : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    <Icon
                      className={cn(
                        "w-4 h-4 shrink-0",
                        active ? "text-accent" : "",
                      )}
                    />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="text-sm text-muted-foreground px-3 py-2">
            Sign in to access your dashboard
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 space-y-1">
        <Separator className="mb-3 opacity-40" />
        {isAuthenticated ? (
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={logout}
            data-ocid="nav.logout_button"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        ) : (
          <div className="px-3 text-xs text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              caffeine.ai
            </a>
          </div>
        )}
      </div>
    </aside>
  );
}

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const { isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const shouldShowSidebar = showSidebar && isAuthenticated;

  return (
    <div className="dark min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      {shouldShowSidebar && (
        <div className="hidden lg:flex lg:flex-shrink-0">
          <Sidebar />
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {shouldShowSidebar && mobileOpen && (
        <>
          <div
            role="button"
            tabIndex={0}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
            <Sidebar onClose={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile top bar */}
        {shouldShowSidebar && (
          <header className="lg:hidden flex items-center gap-3 px-4 py-3 bg-card border-b border-border sticky top-0 z-30">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open menu"
              data-ocid="nav.mobile_menu_button"
            >
              <Menu className="w-5 h-5" />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <Camera className="w-4 h-4 text-accent" />
              <span className="font-display font-semibold text-base tracking-tight">
                SnapVault
              </span>
            </Link>
          </header>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>

        {/* Footer for non-sidebar layouts */}
        {!shouldShowSidebar && (
          <footer className="bg-card border-t border-border py-6 px-6">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-accent" />
                <span className="font-display font-medium text-foreground">
                  SnapVault
                </span>
              </div>
              <p>
                © {new Date().getFullYear()}. Built with love using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  caffeine.ai
                </a>
              </p>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

export function DashboardHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl font-semibold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
