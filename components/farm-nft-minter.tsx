"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useWeb3 } from "@/hooks/use-web3"
import { useToast } from "@/hooks/use-toast"
import { Loader2, Upload } from "lucide-react"
import { mockFarmNFTContract } from "@/lib/contracts/mock-contracts"

export function FarmNFTMinter() {
  const { isConnected, account } = useWeb3()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [fundingGoal, setFundingGoal] = useState("")
  const [profitShare, setProfitShare] = useState("")
  const [farmName, setFarmName] = useState("")
  const [farmDescription, setFarmDescription] = useState("")
  const [farmLocation, setFarmLocation] = useState("")
  const [farmSize, setFarmSize] = useState("")
  const [farmType, setFarmType] = useState("crop")
  const [farmImage, setFarmImage] = useState<File | null>(null)

  const handleMintNFT = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!isConnected) {
      toast({
        title: "Wallet Not Connected",
        description: "Please connect your wallet to mint farm NFTs.",
        variant: "destructive",
      })
      return
    }

    if (!farmName || !farmLocation || !farmSize || !fundingGoal || !profitShare || !farmDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Call mock contract function
      const tx = await mockFarmNFTContract.mintFarmNFT(
        farmName,
        farmLocation,
        farmSize,
        fundingGoal,
        profitShare,
        farmDescription,
      )

      // Wait for transaction confirmation (simulated)
      const receipt = await tx.wait()

      if (receipt.status === 1) {
        toast({
          title: "Farm NFT Created Successfully",
          description: "Your farm has been tokenized and is now available for funding.",
        })

        // Reset form
        setFarmName("")
        setFarmLocation("")
        setFarmSize("")
        setFundingGoal("")
        setProfitShare("")
        setFarmDescription("")
        setFarmImage(null)
      } else {
        throw new Error("Transaction failed")
      }
    } catch (error) {
      console.error("Error minting farm NFT:", error)
      toast({
        title: "Error Creating Farm NFT",
        description: "There was an error creating your farm NFT. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How Farm Funding Works</h3>
              <p className="text-sm text-muted-foreground">
                1. Create a Farm NFT with details about your farm and funding needs.
              </p>
              <p className="text-sm text-muted-foreground">
                2. Set your funding goal and the profit share percentage for investors.
              </p>
              <p className="text-sm text-muted-foreground">
                3. Once approved, your farm will be listed for investors to fund.
              </p>
              <p className="text-sm text-muted-foreground">
                4. Receive funding directly to your wallet as investors purchase your NFTs.
              </p>
              <p className="text-sm text-muted-foreground">
                5. Share profits with investors according to the smart contract terms.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Benefits of NFT Funding</h3>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                <li>Direct access to capital without traditional bank loans</li>
                <li>Transparent funding process on the blockchain</li>
                <li>Build a community of supporters for your farm</li>
                <li>Automated profit sharing through smart contracts</li>
                <li>Increased visibility for your farm and products</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      <form onSubmit={handleMintNFT} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="farm-name">Farm Name</Label>
            <Input
              id="farm-name"
              placeholder="e.g., Green Valley Organic Farm"
              value={farmName}
              onChange={(e) => setFarmName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farm-location">Farm Location</Label>
            <Input
              id="farm-location"
              placeholder="e.g., Iowa, USA"
              value={farmLocation}
              onChange={(e) => setFarmLocation(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farm-size">Farm Size (acres)</Label>
            <Input
              id="farm-size"
              type="number"
              placeholder="e.g., 50"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="farm-type">Farm Type</Label>
            <Select value={farmType} onValueChange={setFarmType}>
              <SelectTrigger id="farm-type">
                <SelectValue placeholder="Select farm type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="crop">Crop Farm</SelectItem>
                <SelectItem value="livestock">Livestock Farm</SelectItem>
                <SelectItem value="dairy">Dairy Farm</SelectItem>
                <SelectItem value="mixed">Mixed Farm</SelectItem>
                <SelectItem value="organic">Organic Farm</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="funding-goal">Funding Goal (USD)</Label>
            <Input
              id="funding-goal"
              type="number"
              placeholder="e.g., 50000"
              value={fundingGoal}
              onChange={(e) => setFundingGoal(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="profit-share">Profit Share (%)</Label>
            <Input
              id="profit-share"
              type="number"
              placeholder="e.g., 20"
              value={profitShare}
              onChange={(e) => setProfitShare(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="farm-description">Farm Description</Label>
          <Textarea
            id="farm-description"
            placeholder="Describe your farm, its history, and what you plan to do with the funding..."
            rows={4}
            value={farmDescription}
            onChange={(e) => setFarmDescription(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="farm-image">Farm Image</Label>
          <Input
            id="farm-image"
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFarmImage(e.target.files[0])
              }
            }}
          />
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Minting NFT...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Mint Farm NFT
            </>
          )}
        </Button>
      </form>
    </div>
  )
}

