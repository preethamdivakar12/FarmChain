"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { ArrowUpRight, Leaf, TrendingUp } from "lucide-react"

// Mock data for investments
const investments = [
  {
    id: "inv-1",
    farmName: "Green Valley Organic Farm",
    location: "Iowa, USA",
    investmentAmount: 5000,
    investmentDate: "2023-10-15",
    profitShare: 20,
    profitsEarned: 750,
    status: "active",
    fundingProgress: 65,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inv-2",
    farmName: "Sunrise Dairy Farm",
    location: "Wisconsin, USA",
    investmentAmount: 3000,
    investmentDate: "2023-11-22",
    profitShare: 15,
    profitsEarned: 325,
    status: "active",
    fundingProgress: 60,
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "inv-3",
    farmName: "Blue Ridge Apple Orchard",
    location: "North Carolina, USA",
    investmentAmount: 2500,
    investmentDate: "2024-01-05",
    profitShare: 25,
    profitsEarned: 150,
    status: "active",
    fundingProgress: 70,
    image: "/placeholder.svg?height=100&width=100",
  },
]

// Mock data for profit history
const profitHistory = [
  { month: "Jan", profit: 120 },
  { month: "Feb", profit: 180 },
  { month: "Mar", profit: 200 },
  { month: "Apr", profit: 250 },
  { month: "May", profit: 300 },
  { month: "Jun", profit: 375 },
]

export function InvestmentTracker() {
  const [activeTab, setActiveTab] = useState("active")

  const totalInvested = investments.reduce((sum, inv) => sum + inv.investmentAmount, 0)
  const totalProfits = investments.reduce((sum, inv) => sum + inv.profitsEarned, 0)
  const averageROI = (totalProfits / totalInvested) * 100

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Total Invested</h3>
              <p className="text-3xl font-bold">${totalInvested.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Across {investments.length} farms</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <ArrowUpRight className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Total Profits</h3>
              <p className="text-3xl font-bold">${totalProfits.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Earned from investments</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Average ROI</h3>
              <p className="text-3xl font-bold">{averageROI.toFixed(2)}%</p>
              <p className="text-sm text-muted-foreground">Return on investment</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-medium mb-4">Profit History</h3>
          <div className="h-[300px] w-full">
            <ChartContainer>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={profitHistory} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <ChartTooltip>
                            <ChartTooltipContent>
                              <div className="flex flex-col">
                                <span className="text-sm font-bold">{data.month}</span>
                                <span className="text-sm">${data.profit}</span>
                              </div>
                            </ChartTooltipContent>
                          </ChartTooltip>
                        )
                      }
                      return null
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="profit"
                    stroke="#16a34a"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Investments</TabsTrigger>
          <TabsTrigger value="history">Investment History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-4">
          <div className="space-y-4">
            {investments.map((investment) => (
              <Card key={investment.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative h-24 w-24 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={investment.image || "/placeholder.svg"}
                        alt={investment.farmName}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="font-medium">{investment.farmName}</h3>
                        <p className="text-sm text-muted-foreground">{investment.location}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Investment</p>
                          <p className="font-medium">${investment.investmentAmount}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Date</p>
                          <p className="font-medium">{new Date(investment.investmentDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profit Share</p>
                          <p className="font-medium">{investment.profitShare}%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profits Earned</p>
                          <p className="font-medium">${investment.profitsEarned}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>{investment.fundingProgress}%</span>
                        </div>
                        <Progress value={investment.fundingProgress} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-4">
          <Card>
            <CardContent className="p-6">
              <p className="text-center text-muted-foreground py-8">
                No completed investments yet. Your investment history will appear here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

