"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet } from "lucide-react"
import { useWeb3 } from "@/hooks/use-web3"

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const { connect, disconnect, account, isConnected } = useWeb3()

  const handleConnect = async (walletType: string) => {
    try {
      await connect(walletType)
      setOpen(false)
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error("Failed to disconnect wallet:", error)
    }
  }

  return (
    <>
      {isConnected ? (
        <Button variant="outline" onClick={handleDisconnect} className="hidden md:flex">
          <Wallet className="mr-2 h-4 w-4" />
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : "Connected"}
        </Button>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="hidden md:flex">
              <Wallet className="mr-2 h-4 w-4" />
              Connect Wallet
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Connect Wallet</DialogTitle>
              <DialogDescription>Connect your wallet to access the platform features.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Button onClick={() => handleConnect("metamask")} className="w-full">
                MetaMask
              </Button>
              <Button onClick={() => handleConnect("walletconnect")} className="w-full">
                WalletConnect
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}

