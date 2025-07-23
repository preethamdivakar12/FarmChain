"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
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
import { Loader2, MapPin, Star, Users } from "lucide-react"

interface FarmCardProps {
  farm: {
    id: string
    name: string
    location: string
    description: string
    fundingGoal: number
    fundingRaised: number
    profitShare: number
    image: string
    owner: string
    rating: number
    reviews: number
  }
}

export function FarmCard({ farm }: FarmCardProps) {
  const { toast } = useToast()
  const { isConnected } = useWeb3()
  const [isLoading, setIsLoading] = useState(false)
  const [investmentAmount, setInvestmentAmount] = useState("")
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const fundingPercentage = Math.round((farm.fundingRaised / farm.fundingGoal) * 100)

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to invest in farms.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate investment process
    setTimeout(() => {
      setIsLoading(false)
      setIsDialogOpen(false)

      toast({
        title: "Investment Successful",
        description: `You have successfully invested $${investmentAmount} in ${farm.name}.`,
      })
    }, 2000)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image src={farm.image || "/placeholder.svg"} alt={farm.name} fill className="object-cover" />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{farm.name}</CardTitle>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{farm.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({farm.reviews})</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {farm.location}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{farm.description}</p>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Funding Progress</span>
              <span className="font-medium">
                ${farm.fundingRaised} / ${farm.fundingGoal}
              </span>
            </div>
            <Progress value={fundingPercentage} className="h-2" />
            <div className="flex justify-between text-sm">
              <span className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                Profit Share
              </span>
              <span className="font-medium">{farm.profitShare}%</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">Invest Now</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invest in {farm.name}</DialogTitle>
                <DialogDescription>
                  Enter the amount you want to invest in this farm. You will receive NFTs representing your ownership
                  stake.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleInvest}>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="investment-amount">Investment Amount (USD)</Label>
                    <Input
                      id="investment-amount"
                      type="number"
                      placeholder="e.g., 1000"
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-medium">Investment Details</h4>
                    <p className="text-sm text-muted-foreground">Farm: {farm.name}</p>
                    <p className="text-sm text-muted-foreground">Location: {farm.location}</p>
                    <p className="text-sm text-muted-foreground">Profit Share: {farm.profitShare}%</p>
                    <p className="text-sm text-muted-foreground">Farm Owner: {farm.owner}</p>
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
                      "Confirm Investment"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  )
}

