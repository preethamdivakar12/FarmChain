import { ethers } from "ethers"

// Mock Farm NFT Contract Interface
export const mockFarmNFTContract = {
  mintFarmNFT: async (
    farmName: string,
    farmLocation: string,
    farmSize: string,
    fundingGoal: string,
    profitShare: string,
    farmDescription: string,
  ) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },

  getFarmNFTs: async (address: string) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock farm NFTs
    return [
      {
        id: 1,
        name: "Green Valley Organic Farm",
        location: "Iowa, USA",
        size: "50",
        fundingGoal: ethers.utils.parseEther("50000"),
        fundingRaised: ethers.utils.parseEther("32500"),
        profitShare: 20,
        description: "Family-owned organic farm specializing in corn, soybeans, and wheat.",
        owner: address,
      },
      {
        id: 2,
        name: "Sunrise Dairy Farm",
        location: "Wisconsin, USA",
        size: "75",
        fundingGoal: ethers.utils.parseEther("75000"),
        fundingRaised: ethers.utils.parseEther("45000"),
        profitShare: 15,
        description: "Sustainable dairy farm with 200 grass-fed cows producing organic milk.",
        owner: address,
      },
    ]
  },

  investInFarm: async (farmId: number, amount: string) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },
}

// Mock Carbon Credit Contract Interface
export const mockCarbonCreditContract = {
  getCarbonCredits: async (address: string) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Return mock carbon credits
    return {
      total: 125,
      available: 85,
      traded: 40,
      value: ethers.utils.parseEther("1275"),
      practices: [
        { name: "No-Till Farming", credits: 45, progress: 75 },
        { name: "Cover Crops", credits: 30, progress: 60 },
        { name: "Reduced Fertilizer", credits: 25, progress: 50 },
        { name: "Agroforestry", credits: 15, progress: 30 },
        { name: "Rotational Grazing", credits: 10, progress: 20 },
      ],
    }
  },

  tradeCarbonCredits: async (amount: number) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },

  purchaseCarbonCredits: async (farmId: string, amount: number, price: number) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },
}

// Mock Marketplace Contract Interface
export const mockMarketplaceContract = {
  listProduct: async (
    name: string,
    price: string,
    quantity: number,
    unit: string,
    category: string,
    description: string,
  ) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },

  purchaseProduct: async (productId: string, quantity: number) => {
    // Simulate blockchain delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Return mock transaction hash
    return {
      hash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
      wait: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { status: 1 }
      },
    }
  },
}

