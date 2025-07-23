"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { useWeb3 } from "@/hooks/use-web3"
import { Leaf, Loader2 } from "lucide-react"

// Mock data for carbon credits
const carbonCredits = [
  {
    id: "cc-1",
    farmName: "Green Valley Organic Farm",
    location: "Iowa, USA",
    creditsAvailable: 45,
    pricePerCredit: 15,
    description: "Carbon credits from no-till farming and cover crops.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "cc-2",
    farmName: "Sunrise Dairy Farm",
    location: "Wisconsin, USA",
    creditsAvailable: 30,
    pricePerCredit: 18,
    description: "Carbon credits from methane capture and renewable energy.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "cc-3",
    farmName: "Blue Ridge Apple Orchard",
    location: "North Carolina, USA",
    creditsAvailable: 25,
    pricePerCredit: 12,
    description: "Carbon credits from agroforestry and sustainable water management.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    id: "cc-4",
    farmName: "Prairie Wind Cattle Ranch",
    location: "Montana, USA",
    creditsAvailable: 60,
    pricePerCredit: 14,
    description: "Carbon credits from rotational grazing and soil carbon sequestration.",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export function CarbonCreditMarket() {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCredit, setSelectedCredit] = useState<any>(null)
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to purchase carbon credits.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate purchase process
    setTimeout(() => {
      setIsLoading(false)
      setIsDialogOpen(false)

      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${purchaseAmount} carbon credits from ${selectedCredit.farmName}.`,
      })
    }, 2000)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {carbonCredits.map((credit) => (
          <Card key={credit.id}>
            <CardHeader className="p-4">
              <div className="flex items-center space-x-2">
                <Leaf className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">{credit.farmName}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground">{credit.location}</p>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Credits Available</span>
                  <span className="font-medium">{credit.creditsAvailable}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price per Credit</span>
                  <span className="font-medium">${credit.pricePerCredit}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{credit.description}</p>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Dialog
                open={isDialogOpen && selectedCredit?.id === credit.id}
                onOpenChange={(open) => {
                  setIsDialogOpen(open)
                  if (open) setSelectedCredit(credit)
                }}
              >
                <DialogTrigger asChild>
                  <Button
                    className="w-full"
                    onClick={() => {
                      setSelectedCredit(credit)
                      setPurchaseAmount("")
                    }}
                  >
                    Purchase Credits
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Purchase Carbon Credits</DialogTitle>
                    <DialogDescription>
                      Enter the number of carbon credits you want to purchase from {selectedCredit?.farmName}.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePurchase}>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <Label htmlFor="credit-amount">Number of Credits</Label>
                        <Input
                          id="credit-amount"
                          type="number"
                          placeholder="e.g., 10"
                          min="1"
                          max={selectedCredit?.creditsAvailable.toString()}
                          value={purchaseAmount}
                          onChange={(e) => setPurchaseAmount(e.target.value)}
                          required
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium">Purchase Details</h4>
                        <p className="text-sm text-muted-foreground">Farm: {selectedCredit?.farmName}</p>
                        <p className="text-sm text-muted-foreground">
                          Price per Credit: ${selectedCredit?.pricePerCredit}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Total Cost: $
                          {purchaseAmount
                            ? (Number.parseInt(purchaseAmount) * selectedCredit?.pricePerCredit).toFixed(2)
                            : "0.00"}
                        </p>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          "Confirm Purchase"
                        )}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

