"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { PricePredictionChart } from "@/components/price-prediction-chart"
import { FarmNFTMinter } from "@/components/farm-nft-minter"
import { CarbonCreditsWidget } from "@/components/carbon-credits-widget"
import { useWeb3 } from "@/hooks/use-web3"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Plus } from "lucide-react"

export default function FarmerDashboard() {
  const { isConnected } = useWeb3()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [predictionData, setPredictionData] = useState<any>(null)

  const handlePredictPrice = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call for price prediction
    setTimeout(() => {
      const mockData = {
        crop: "Corn",
        predictedPrice: 4.25,
        priceRange: { min: 3.85, max: 4.65 },
        confidence: 85,
        historicalPrices: [
          { date: "Jan", price: 3.8 },
          { date: "Feb", price: 3.9 },
          { date: "Mar", price: 4.1 },
          { date: "Apr", price: 4.0 },
          { date: "May", price: 4.2 },
          { date: "Jun", price: 4.3 },
        ],
      }

      setPredictionData(mockData)
      setIsLoading(false)

      toast({
        title: "Price Prediction Generated",
        description: `Predicted price for Corn: $${mockData.predictedPrice}/bushel`,
      })
    }, 2000)
  }

  const handleListCrop = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call for listing crop
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Crop Listed Successfully",
        description: "Your crop has been listed on the marketplace.",
      })
    }, 1500)
  }

  if (!isConnected) {
    return (
      <div className="container py-10">
        <Card>
          <CardHeader>
            <CardTitle>Farmer Dashboard</CardTitle>
            <CardDescription>Please connect your wallet to access the farmer dashboard.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Farmer Dashboard</h1>

      <Tabs defaultValue="price-prediction">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="price-prediction">Price Prediction</TabsTrigger>
          <TabsTrigger value="crop-listing">Crop Listing</TabsTrigger>
          <TabsTrigger value="funding">Funding</TabsTrigger>
          <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
        </TabsList>

        <TabsContent value="price-prediction" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Price Prediction</CardTitle>
              <CardDescription>
                Get AI-powered price predictions for your crops based on market data and trends.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePredictPrice} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="crop-type">Crop Type</Label>
                    <Select defaultValue="corn">
                      <SelectTrigger id="crop-type">
                        <SelectValue placeholder="Select crop type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="corn">Corn</SelectItem>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="soybeans">Soybeans</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity (bushels)</Label>
                    <Input id="quantity" type="number" defaultValue="1000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Select defaultValue="midwest">
                      <SelectTrigger id="location">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="midwest">Midwest</SelectItem>
                        <SelectItem value="northeast">Northeast</SelectItem>
                        <SelectItem value="south">South</SelectItem>
                        <SelectItem value="west">West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date">Harvest Date</Label>
                    <Input id="harvest-date" type="date" />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Predicting...
                    </>
                  ) : (
                    "Predict Price"
                  )}
                </Button>
              </form>

              {predictionData && (
                <div className="mt-6 space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="text-lg font-medium">Prediction Results</h3>
                    <div className="mt-2 grid grid-cols-2 gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Predicted Price</p>
                        <p className="text-2xl font-bold">${predictionData.predictedPrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <p className="text-lg">
                          ${predictionData.priceRange.min} - ${predictionData.priceRange.max}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Confidence</p>
                        <p className="text-lg">{predictionData.confidence}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Crop</p>
                        <p className="text-lg">{predictionData.crop}</p>
                      </div>
                    </div>
                  </div>
                  <PricePredictionChart
                    data={predictionData.historicalPrices}
                    predictedPrice={predictionData.predictedPrice}
                  />
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crop-listing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>List Your Crops</CardTitle>
              <CardDescription>Add your produce to the marketplace for direct sales to consumers.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleListCrop} className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="crop-name">Crop Name</Label>
                    <Input id="crop-name" placeholder="e.g., Organic Sweet Corn" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="crop-category">Category</Label>
                    <Select defaultValue="vegetables">
                      <SelectTrigger id="crop-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="vegetables">Vegetables</SelectItem>
                        <SelectItem value="fruits">Fruits</SelectItem>
                        <SelectItem value="grains">Grains</SelectItem>
                        <SelectItem value="dairy">Dairy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity-available">Quantity Available</Label>
                    <Input id="quantity-available" type="number" placeholder="e.g., 500" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit</Label>
                    <Select defaultValue="bushel">
                      <SelectTrigger id="unit">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bushel">Bushel</SelectItem>
                        <SelectItem value="pound">Pound</SelectItem>
                        <SelectItem value="kilogram">Kilogram</SelectItem>
                        <SelectItem value="crate">Crate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Price per Unit ($)</Label>
                    <Input id="price" type="number" step="0.01" placeholder="e.g., 4.99" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="harvest-date">Harvest Date</Label>
                    <Input id="harvest-date" type="date" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your crop, growing methods, and any special features..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="crop-image">Crop Images</Label>
                  <Input id="crop-image" type="file" multiple />
                </div>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Listing...
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 h-4 w-4" />
                      List Crop
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Farm Funding</CardTitle>
              <CardDescription>Mint NFTs representing your farm to receive funding from investors.</CardDescription>
            </CardHeader>
            <CardContent>
              <FarmNFTMinter />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sustainability" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Rewards</CardTitle>
              <CardDescription>
                Track and trade carbon credits earned through sustainable farming practices.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CarbonCreditsWidget />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

