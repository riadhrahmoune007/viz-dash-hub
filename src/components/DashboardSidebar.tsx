
import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart2,
  Database,
  BrainCircuit,
  Settings,
  Upload,
  Users,
  FileText,
  HelpCircle,
  User
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

export function DashboardSidebar({ className, isCollapsed = false }: SidebarProps) {
  return (
    <div
      className={cn(
        "flex flex-col h-screen border-r bg-white",
        isCollapsed ? "w-14" : "w-60",
        className
      )}
    >
      <div className="flex h-14 items-center justify-center border-b">
        <User className="h-6 w-6 text-dashboard-blue" />
        {!isCollapsed && <span className="font-bold ml-2 text-dashboard-blue">DataViz Hub</span>}
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid gap-1 px-2">
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <LayoutDashboard className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Dashboard</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <Database className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Data Explorer</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Visualizations</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <BrainCircuit className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>ML Models</span>}
          </Button>

          <Separator className="my-2" />
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <Upload className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Upload Data</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <FileText className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Reports</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <Users className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Team</span>}
          </Button>
        </nav>
      </div>

      <div className="mt-auto p-2">
        <Separator className="my-2" />
        <nav className="grid gap-1">
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <Settings className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Settings</span>}
          </Button>
          
          <Button
            variant="ghost"
            className={cn(
              "justify-start",
              !isCollapsed ? "px-2" : "justify-center px-0"
            )}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            {!isCollapsed && <span>Help</span>}
          </Button>
        </nav>
      </div>
    </div>
  );
}

export default DashboardSidebar;
