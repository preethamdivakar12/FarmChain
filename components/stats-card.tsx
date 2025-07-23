import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsCardProps {
  icon: ReactNode
  value: string
  label: string
}

export function StatsCard({ icon, value, label }: StatsCardProps) {
  return (
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <div className="mb-2 rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
          {icon}
        </div>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  )
}

