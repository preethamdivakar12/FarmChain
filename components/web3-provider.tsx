"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import { ethers } from "ethers"

interface Web3ContextType {
  provider: ethers.providers.Web3Provider | null
  signer: ethers.Signer | null
  account: string | null
  isConnected: boolean
  connect: (walletType: string) => Promise<void>
  disconnect: () => Promise<void>
  chainId: number | null
  networkName: string
  balance: string
  isCorrectNetwork: boolean
}

export const Web3Context = createContext<Web3ContextType>({
  provider: null,
  signer: null,
  account: null,
  isConnected: false,
  connect: async () => {},
  disconnect: async () => {},
  chainId: null,
  networkName: "",
  balance: "0",
  isCorrectNetwork: false,
})

interface Web3ProviderProps {
  children: ReactNode
}

// Network mapping
const networks: Record<number, string> = {
  1: "Ethereum Mainnet",
  5: "Goerli Testnet",
  11155111: "Sepolia Testnet",
  137: "Polygon Mainnet",
  80001: "Mumbai Testnet",
  // Add more networks as needed
}

// Target network from env
const targetChainId = process.env.NEXT_PUBLIC_CHAIN_ID ? Number.parseInt(process.env.NEXT_PUBLIC_CHAIN_ID) : 11155111 // Default to Sepolia

export function Web3Provider({ children }: Web3ProviderProps) {
  const [provider, setProvider] = useState<ethers.providers.Web3Provider | null>(null)
  const [signer, setSigner] = useState<ethers.Signer | null>(null)
  const [account, setAccount] = useState<string | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const [networkName, setNetworkName] = useState<string>("")
  const [balance, setBalance] = useState<string>("0")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)

  // Function to update account details
  const updateAccountDetails = async (provider: ethers.providers.Web3Provider, address: string) => {
    try {
      const network = await provider.getNetwork()
      const chainId = network.chainId
      setChainId(chainId)
      setNetworkName(networks[chainId] || `Chain ID: ${chainId}`)
      setIsCorrectNetwork(chainId === targetChainId)

      const balance = await provider.getBalance(address)
      setBalance(ethers.utils.formatEther(balance))
    } catch (error) {
      console.error("Error updating account details:", error)
    }
  }

  const connect = async (walletType: string) => {
    try {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        // Request account access
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

        // Create ethers provider
        const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
        const ethersSigner = ethersProvider.getSigner()
        const address = await ethersSigner.getAddress()

        setProvider(ethersProvider)
        setSigner(ethersSigner)
        setAccount(address)
        setIsConnected(true)

        // Update account details
        await updateAccountDetails(ethersProvider, address)

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length === 0) {
            // User disconnected their wallet
            disconnect()
          } else {
            setAccount(accounts[0])
            if (ethersProvider) {
              updateAccountDetails(ethersProvider, accounts[0])
            }
          }
        })

        // Listen for chain changes
        window.ethereum.on("chainChanged", () => {
          window.location.reload()
        })

        return address
      } else {
        console.warn("Please install MetaMask or another Web3 wallet to use this feature.")
        alert("Please install MetaMask or another Web3 wallet to use this feature.")
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnect = async () => {
    setProvider(null)
    setSigner(null)
    setAccount(null)
    setIsConnected(false)
    setChainId(null)
    setNetworkName("")
    setBalance("0")
    setIsCorrectNetwork(false)
  }

  // Check if wallet is already connected on page load
  useEffect(() => {
    const checkConnection = async () => {
      if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
        try {
          const ethersProvider = new ethers.providers.Web3Provider(window.ethereum)
          const accounts = await ethersProvider.listAccounts()

          if (accounts.length > 0) {
            const ethersSigner = ethersProvider.getSigner()
            const address = await ethersSigner.getAddress()

            setProvider(ethersProvider)
            setSigner(ethersSigner)
            setAccount(address)
            setIsConnected(true)

            await updateAccountDetails(ethersProvider, address)
          }
        } catch (error) {
          console.error("Error checking wallet connection:", error)
        }
      }
    }

    checkConnection()
  }, [])

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        account,
        isConnected,
        connect,
        disconnect,
        chainId,
        networkName,
        balance,
        isCorrectNetwork,
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

