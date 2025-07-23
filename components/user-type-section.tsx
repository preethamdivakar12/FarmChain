import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Leaf, LineChart, ShoppingCart } from "lucide-react"

export function UserTypeSection() {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Choose Your Path</h2>
            <p className="max-w-[900px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Select your role in our ecosystem and get started today
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3 md:gap-8">
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
              <Leaf className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Farmers</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              List your produce, apply for funding, and earn carbon credits for sustainable practices.
            </p>
            <Link href="/farmer/dashboard">
              <Button className="mt-auto">
                Farmer Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
              <LineChart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Investors</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Browse farms, invest by purchasing farm NFTs, and track funding usage transparently.
            </p>
            <Link href="/investor/dashboard">
              <Button className="mt-auto">
                Investor Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-green-100 p-3 text-green-600 dark:bg-green-900 dark:text-green-400">
              <ShoppingCart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-bold">Consumers</h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Buy farm produce directly and view verified farm details and sustainability practices.
            </p>
            <Link href="/marketplace">
              <Button className="mt-auto">
                Browse Marketplace
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

