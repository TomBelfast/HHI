import * as React from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarToggle } from "./sidebar"
import { Bell, Search } from "lucide-react"

interface HeaderProps {
  onSidebarToggle: () => void
  className?: string
}

export function Header({ onSidebarToggle, className }: HeaderProps) {
  return (
    <header className={`flex h-16 items-center justify-between border-b bg-background px-4 lg:px-6 ${className}`}>
      <div className="flex items-center space-x-4">
        <SidebarToggle onToggle={onSidebarToggle} />
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-64 rounded-md border border-input bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-destructive text-xs text-destructive-foreground flex items-center justify-center">
            3
          </span>
        </Button>
        
        <div className="flex items-center space-x-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/admin.jpg" alt="Admin" />
            <AvatarFallback>AD</AvatarFallback>
          </Avatar>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-muted-foreground">admin@hhi.com</p>
          </div>
        </div>
      </div>
    </header>
  )
} 