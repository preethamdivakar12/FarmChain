"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { ArrowRight, Award, Leaf, TrendingUp } from "lucide-react"
import { mockCarbonCreditContract } from "@/lib/contracts/mock-contracts"

export function CarbonCreditsWidget() {
  const { toast } = useToast()
  const { isConnected, account } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [carbonCredits, setCarbonCredits] = useState({
    total: 0,
    available: 0,
    traded: 0,
    value: 0,
    practices: [] as { name: string; credits: number; progress: number }[],
  })
  const [isLoadingCredits, setIsLoadingCredits] = useState(true)

  // Fetch carbon credits when component mounts
  useEffect(() => {
    const fetchCarbonCredits = async () => {
      if (isConnected && account) {
        setIsLoadingCredits(true)
        try {
          const credits = await mockCarbonCreditContract.getCarbonCredits(account)
          setCarbonCredits(credits)
        } catch (error) {
          console.error("Error fetching carbon credits:", error)
          toast({
            title: "Error",
            description: "Failed to load carbon credits data.",
            variant: "destructive",
          })
        } finally {
          setIsLoadingCredits(false)
        }
      }
    }

    fetchCarbonCredits()
  }, [isConnected, account, toast])

  const handleTradeCredits = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to trade carbon credits.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Call mock contract function
      const tx = await mockCarbonCreditContract.tradeCarbonCredits(carbonCredits.available)

      // Wait for transaction confirmation (simulated)
      const receipt = await tx.wait()

      if (receipt.status === 1) {
        toast({
          title: "Carbon Credits Listed",
          description: "Your carbon credits are now available for trading.",
        })

        // Update local state to reflect the trade
        setCarbonCredits((prev) => ({
          ...prev,
          available: 0,
          traded: prev.traded + prev.available,
        }))
      } else {
        throw new Error("Transaction failed")
      }
    } catch (error) {
      console.error("Error trading carbon credits:", error)
      toast({
        title: "Error Trading Credits",
        description: "There was an error listing your carbon credits. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingCredits) {
    return (
      <div className="flex justify-center items-center py-12">
        <Leaf className="h-8 w-8 text-green-600 animate-pulse" />
        <span className="ml-2">Loading carbon credits data...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <Leaf className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Total Credits</h3>
              <p className="text-3xl font-bold">{carbonCredits.total}</p>
              <p className="text-sm text-muted-foreground">Carbon credits earned</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <Award className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Available</h3>
              <p className="text-3xl font-bold">{carbonCredits.available}</p>
              <p className="text-sm text-muted-foreground">Credits available to trade</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col items-center space-y-2">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-medium">Value</h3>
              <p className="text-3xl font-bold">${carbonCredits.value}</p>
              <p className="text-sm text-muted-foreground">Estimated market value</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="practices">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="practices">Sustainable Practices</TabsTrigger>
          <TabsTrigger value="trading">Credit Trading</TabsTrigger>
        </TabsList>

        <TabsContent value="practices" className="mt-4 space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Your Sustainable Practices</h3>
            <p className="text-sm text-muted-foreground">
              Track your progress in sustainable farming practices and earn carbon credits.
            </p>

            <div className="space-y-4">
              {carbonCredits.practices.map((practice, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{practice.name}</span>
                    <span className="text-sm text-muted-foreground">{practice.credits} credits</span>
                  </div>
                  <Progress value={practice.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{practice.progress}% of target achieved</p>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="trading" className="mt-4 space-y-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Carbon Credit Trading</h3>
            <p className="text-sm text-muted-foreground">
              Trade your carbon credits with investors and businesses looking to offset their carbon footprint.
            </p>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Available Credits</h4>
                      <p className="text-sm text-muted-foreground">Credits ready to trade</p>
                    </div>
                    <p className="text-2xl font-bold">{carbonCredits.available}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Current Market Rate</h4>
                      <p className="text-sm text-muted-foreground">Per carbon credit</p>
                    </div>
                    <p className="text-2xl font-bold">$15.00</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Potential Value</h4>
                      <p className="text-sm text-muted-foreground">If all available credits are sold</p>
                    </div>
                    <p className="text-2xl font-bold">${carbonCredits.available * 15}</p>
                  </div>

                  <Button
                    onClick={handleTradeCredits}
                    disabled={isLoading || carbonCredits.available === 0}
                    className="w-full"
                  >
                    {isLoading ? "Processing..." : "List Credits for Trading"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

