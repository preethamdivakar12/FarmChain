/**
 * This file contains a mock implementation of the AI price prediction model.
 * In a real-world application, this would be a machine learning model trained on
 * historical crop prices, weather data, and market trends.
 */

interface PricePredictionInput {
  cropType: string
  quantity: number
  location: string
  harvestDate: string
}

interface PricePredictionOutput {
  predictedPrice: number
  priceRange: {
    min: number
    max: number
  }
  confidence: number
  historicalPrices: {
    date: string
    price: number
  }[]
}

// Mock crop base prices
const cropBasePrices: Record<string, number> = {
  corn: 4.25,
  wheat: 5.75,
  soybeans: 12.5,
  rice: 18.25,
  apples: 0.75, // per pound
  milk: 3.5, // per gallon
  beef: 4.25, // per pound
}

// Mock location price modifiers
const locationModifiers: Record<string, number> = {
  midwest: 1.0,
  northeast: 1.15,
  south: 0.95,
  west: 1.2,
}

// Mock seasonal price modifiers (by month)
const seasonalModifiers: Record<number, number> = {
  0: 1.05, // January
  1: 1.08, // February
  2: 1.1, // March
  3: 1.05, // April
  4: 1.0, // May
  5: 0.95, // June
  6: 0.9, // July
  7: 0.85, // August
  8: 0.9, // September
  9: 0.95, // October
  10: 1.0, // November
  11: 1.02, // December
}

// Generate mock historical prices
function generateHistoricalPrices(basePrice: number, months = 6): { date: string; price: number }[] {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const currentDate = new Date()
  const result = []

  for (let i = months; i > 0; i--) {
    const monthIndex = (currentDate.getMonth() - i + 12) % 12
    const randomVariation = 0.9 + Math.random() * 0.2 // Random variation between 0.9 and 1.1
    const price = basePrice * seasonalModifiers[monthIndex] * randomVariation

    result.push({
      date: monthNames[monthIndex],
      price: Number.parseFloat(price.toFixed(2)),
    })
  }

  return result
}

// Mock AI price prediction function
export async function predictPrice(input: PricePredictionInput): Promise<PricePredictionOutput> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const { cropType, location, harvestDate } = input

  // Get base price for crop type
  const basePrice = cropBasePrices[cropType.toLowerCase()] || 5.0

  // Apply location modifier
  const locationModifier = locationModifiers[location.toLowerCase()] || 1.0

  // Apply seasonal modifier based on harvest date
  const harvestMonth = new Date(harvestDate).getMonth()
  const seasonalModifier = seasonalModifiers[harvestMonth] || 1.0

  // Apply random market fluctuation
  const marketFluctuation = 0.95 + Math.random() * 0.1 // Random fluctuation between 0.95 and 1.05

  // Calculate predicted price
  const predictedPrice = basePrice * locationModifier * seasonalModifier * marketFluctuation

  // Calculate price range (±10%)
  const priceRange = {
    min: Number.parseFloat((predictedPrice * 0.9).toFixed(2)),
    max: Number.parseFloat((predictedPrice * 1.1).toFixed(2)),
  }

  // Generate random confidence level between 75% and 95%
  const confidence = Math.floor(75 + Math.random() * 20)

  // Generate historical prices
  const historicalPrices = generateHistoricalPrices(basePrice)

  return {
    predictedPrice: Number.parseFloat(predictedPrice.toFixed(2)),
    priceRange,
    confidence,
    historicalPrices,
  }
}

