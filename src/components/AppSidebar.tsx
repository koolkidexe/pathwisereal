import { Home, Map, BookOpen, BarChart3, Brain, Flame, Zap, Coins, LogOut } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import { UserProfile, useAuth } from "@/contexts/AuthContext";
import { LEVEL_TITLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const allNavItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home, requiresDiagnostic: false },
  { title: "Study Plan", url: "/study-plan", icon: Map, requiresDiagnostic: false },
  { title: "All Material", url: "/material", icon: BookOpen, requiresDiagnostic: false },
  { title: "Diagnostic", url: "/diagnostic", icon: Brain, hideWhenDiagnosticDone: true, requiresDiagnostic: false },
  { title: "Progress", url: "/progress", icon: BarChart3, requiresDiagnostic: false },
];

interface AppSidebarProps {
  profile: UserProfile;
}

export function AppSidebar({ profile }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const title = LEVEL_TITLES[Math.min(profile.level - 1, LEVEL_TITLES.length - 1)];

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50">
      <SidebarContent className="bg-sidebar">
        {/* Logo */}
        <div className="p-4 pb-2">
          {!collapsed && (
            <h2 className="text-xl font-display font-bold">
              <span className="text-primary glow-text">Path</span>wise
            </h2>
          )}
          {collapsed && (
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
              <span className="text-primary font-display font-bold text-sm">P</span>
            </div>
          )}
        </div>

        {/* Stats mini */}
        {!collapsed && (
          <div className="px-4 pb-3 space-y-2">
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <div className="flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-streak" />
                <span className="font-semibold">{profile.streak}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-primary" />
                <span className="font-semibold">{profile.xp} XP</span>
              </div>
              <div className="flex items-center gap-1">
                <Coins className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-semibold">{profile.coins ?? 0}</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Lvl {profile.level} • {title}</p>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs text-muted-foreground/70">Navigate</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end
                      className="hover:bg-muted/50 transition-colors"
                      activeClassName="bg-primary/10 text-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
