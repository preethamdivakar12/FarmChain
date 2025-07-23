"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FarmCard } from "@/components/farm-card"
import { InvestmentTracker } from "@/components/investment-tracker"
import { CarbonCreditMarket } from "@/components/carbon-credit-market"
import { useWeb3 } from "@/hooks/use-web3"
import { Search } from "lucide-react"

// Mock data for farms
const farms = [
  {
    id: "farm-1",
    name: "Green Valley Organic Farm",
    location: "Iowa, USA",
    description: "Family-owned organic farm specializing in corn, soybeans, and wheat.",
    fundingGoal: 50000,
    fundingRaised: 32500,
    profitShare: 20,
    image: "/placeholder.svg?height=200&width=300",
    owner: "0x1234...5678",
    rating: 4.8,
    reviews: 24,
  },
  {
    id: "farm-2",
    name: "Sunrise Dairy Farm",
    location: "Wisconsin, USA",
    description: "Sustainable dairy farm with 200 grass-fed cows producing organic milk.",
    fundingGoal: 75000,
    fundingRaised: 45000,
    profitShare: 15,
    image: "/placeholder.svg?height=200&width=300",
    owner: "0x8765...4321",
    rating: 4.5,
    reviews: 18,
  },
  {
    id: "farm-3",
    name: "Blue Ridge Apple Orchard",
    location: "North Carolina, USA",
    description: "Heritage apple orchard growing over 50 varieties of apples using sustainable methods.",
    fundingGoal: 40000,
    fundingRaised: 28000,
    profitShare: 25,
    image: "/placeholder.svg?height=200&width=300",
    owner: "0x5678...9012",
    rating: 4.9,
    reviews: 32,
  },
  {
    id: "farm-4",
    name: "Prairie Wind Cattle Ranch",
    location: "Montana, USA",
    description: "Grass-fed beef cattle ranch practicing rotational grazing and carbon sequestration.",
    fundingGoal: 100000,
    fundingRaised: 65000,
    profitShare: 18,
    image: "/placeholder.svg?height=200&width=300",
    owner: "0x9012...3456",
    rating: 4.7,
    reviews: 15,
  },
]

export default function InvestorDashboard() {
  const { isConnected } = useWeb3()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("funding")

  // Filter and sort farms
  const filteredFarms = farms
    .filter((farm) => {
      if (searchTerm === "") return true
      return (
        farm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        farm.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .filter((farm) => {
      if (filterType === "all") return true
      // Add more filter logic here based on farm type
      return true
    })
    .sort((a, b) => {
      if (sortBy === "funding") {
        return b.fundingRaised / b.fundingGoal - a.fundingRaised / a.fundingGoal
      } else if (sortBy === "profit") {
        return b.profitShare - a.profitShare
      } else if (sortBy === "rating") {
        return b.rating - a.rating
      }
      return 0
    })

  if (!isConnected) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Investor Dashboard</CardTitle>
            <CardDescription>Please connect your wallet to access the investor dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Investor Dashboard</h1>

      <Tabs defaultValue="marketplace">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="marketplace">Farm Marketplace</TabsTrigger>
          <TabsTrigger value="investments">My Investments</TabsTrigger>
          <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
        </TabsList>

        <TabsContent value="marketplace" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Marketplace</CardTitle>
              <CardDescription>Browse farms seeking funding and invest by purchasing farm NFTs.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4">
                <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                  <div className="flex-1 space-y-2">
                    <Label htmlFor="search">Search Farms</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Search by name, location, or description..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full md:w-[180px] space-y-2">
                    <Label htmlFor="filter-type">Farm Type</Label>
                    <Select value={filterType} onValueChange={setFilterType}>
                      <SelectTrigger id="filter-type">
                        <SelectValue placeholder="Filter by type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Types</SelectItem>
                        <SelectItem value="crop">Crop Farms</SelectItem>
                        <SelectItem value="livestock">Livestock</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                        <SelectItem value="organic">Organic</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full md:w-[180px] space-y-2">
                    <Label htmlFor="sort-by">Sort By</Label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger id="sort-by">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="funding">Funding Progress</SelectItem>
                        <SelectItem value="profit">Profit Share</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  {filteredFarms.map((farm) => (
                    <FarmCard key={farm.id} farm={farm} />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investments" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>My Investments</CardTitle>
              <CardDescription>Track your farm investments and profit sharing.</CardDescription>
            </CardHeader>
            <CardContent>
              <InvestmentTracker />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="carbon" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Carbon Credit Market</CardTitle>
              <CardDescription>Browse and purchase carbon credits from sustainable farms.</CardDescription>
            </CardHeader>
            <CardContent>
              <CarbonCreditMarket />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

