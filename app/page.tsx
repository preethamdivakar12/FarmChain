import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, LineChart, ShoppingCart, Users } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { StatsCard } from "@/components/stats-card"
import { HowItWorks } from "@/components/how-it-works"
import { UserTypeSection } from "@/components/user-type-section"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-background py-20 md:py-28">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Decentralized Farm Investment & Marketplace
                </h1>
                <p className="max-w-[600px] text-gray-500 dark:text-gray-400 md:text-xl">
                  Connect farmers, investors, and consumers in a transparent ecosystem powered by blockchain technology.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/marketplace">
                  <Button className="bg-green-600 hover:bg-green-700">
                    Explore Marketplace
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/funding">
                  <Button variant="outline">Invest in Farms</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-[350px] w-full md:h-[400px] lg:h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=500"
                  alt="Farm illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-background">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
            <StatsCard icon={<Users />} value="1,200+" label="Farmers" />
            <StatsCard icon={<LineChart />} value="$5.2M+" label="Investments" />
            <StatsCard icon={<ShoppingCart />} value="8,500+" label="Products" />
            <StatsCard icon={<Leaf />} value="12,000+" label="Carbon Credits" />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <HowItWorks />

      {/* User Types Section */}
      <UserTypeSection />
    </div>
  )
}

