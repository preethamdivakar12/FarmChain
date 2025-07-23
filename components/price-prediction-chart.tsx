"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ResponsiveContainer } from "recharts"

interface PriceData {
  date: string
  price: number
}

interface PricePredictionChartProps {
  data: PriceData[]
  predictedPrice: number
}

export function PricePredictionChart({ data, predictedPrice }: PricePredictionChartProps) {
  // Add predicted price point to the end of the data
  const chartData = [...data, { date: "Predicted", price: predictedPrice }]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Price Trend & Prediction</CardTitle>
        <CardDescription>Historical prices and AI-predicted future price</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={["auto", "auto"]} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload
                      return (
                        <ChartTooltip>
                          <ChartTooltipContent>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold">{data.date}</span>
                              <span className="text-sm">${data.price.toFixed(2)}</span>
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
                  dataKey="price"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <ReferenceLine
                  y={predictedPrice}
                  stroke="#ef4444"
                  strokeDasharray="3 3"
                  label={{ value: `Predicted: $${predictedPrice}`, position: "insideBottomRight" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  )
}

