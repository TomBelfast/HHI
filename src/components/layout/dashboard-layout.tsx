import * as React from "react"
import { Sidebar } from "./sidebar"
import { Header } from "./header"

interface DashboardLayoutProps {
  children: React.ReactNode
  className?: string
}

export function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Sidebar 
        isOpen={sidebarOpen} 
        onToggle={() => setSidebarOpen(!sidebarOpen)} 
      />
      
      <div className="lg:pl-64">
        <Header onSidebarToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className={`p-4 lg:p-6 ${className}`}>
          {children}
        </main>
      </div>
    </div>
  )
} 