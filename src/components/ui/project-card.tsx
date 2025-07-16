import * as React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Badge } from "./badge"
import { cn } from "@/lib/utils"

export interface ProjectCardProps {
  id: string
  title: string
  description: string
  status: "quote" | "approved" | "in-progress" | "completed"
  customer: string
  totalCost: number
  startDate?: string
  endDate?: string
  className?: string
}

const statusConfig = {
  quote: { label: "Quote", variant: "secondary" as const, color: "bg-gray-100 text-gray-800" },
  approved: { label: "Approved", variant: "default" as const, color: "bg-primary text-primary-foreground" },
  "in-progress": { label: "In Progress", variant: "default" as const, color: "bg-accent text-accent-foreground" },
  completed: { label: "Completed", variant: "default" as const, color: "bg-green-100 text-green-800" },
}

export function ProjectCard({
  id,
  title,
  description,
  status,
  customer,
  totalCost,
  startDate,
  endDate,
  className,
}: ProjectCardProps) {
  const statusInfo = statusConfig[status]

  return (
    <Card className={cn("hover:shadow-md transition-shadow", className)}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{title}</CardTitle>
            <CardDescription>{customer}</CardDescription>
          </div>
          <Badge variant={statusInfo.variant} className={statusInfo.color}>
            {statusInfo.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm">
          <div className="space-y-1">
            <p className="font-medium">£{totalCost.toLocaleString()}</p>
            <p className="text-muted-foreground">Total Cost</p>
          </div>
          {startDate && (
            <div className="text-right space-y-1">
              <p className="font-medium">{new Date(startDate).toLocaleDateString()}</p>
              <p className="text-muted-foreground">Start Date</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 