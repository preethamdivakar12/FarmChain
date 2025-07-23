import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Leaf, LineChart, ShoppingCart } from "lucide-react"

export function HowItWorks() {
  return (
    <section className="py-12 md:py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">How It Works</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform connects farmers, investors, and consumers in a transparent ecosystem
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <CardTitle>For Farmers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                List your produce, apply for funding by minting NFTs, and receive AI-based price predictions to maximize
                your profits.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <LineChart className="h-8 w-8 text-green-600" />
              <CardTitle>For Investors</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Browse farms, invest by purchasing farm NFTs, and track funding usage transparently using blockchain
                data.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <ShoppingCart className="h-8 w-8 text-green-600" />
              <CardTitle>For Consumers</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">
                Buy farm produce directly using stablecoins and view verified farm details and sustainability practices.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}

