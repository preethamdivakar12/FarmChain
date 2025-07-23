"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ProductCard } from "@/components/product-card"
import { ShoppingCart, Search } from "lucide-react"

// Mock data for products
const products = [
  {
    id: "prod-1",
    name: "Organic Sweet Corn",
    farmName: "Green Valley Organic Farm",
    location: "Iowa, USA",
    price: 4.99,
    unit: "dozen",
    category: "vegetables",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.8,
    reviews: 24,
    inStock: true,
  },
  {
    id: "prod-2",
    name: "Fresh Organic Milk",
    farmName: "Sunrise Dairy Farm",
    location: "Wisconsin, USA",
    price: 5.49,
    unit: "gallon",
    category: "dairy",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 36,
    inStock: true,
  },
  {
    id: "prod-3",
    name: "Heritage Apples Mix",
    farmName: "Blue Ridge Apple Orchard",
    location: "North Carolina, USA",
    price: 3.99,
    unit: "pound",
    category: "fruits",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.7,
    reviews: 18,
    inStock: true,
  },
  {
    id: "prod-4",
    name: "Grass-Fed Ground Beef",
    farmName: "Prairie Wind Cattle Ranch",
    location: "Montana, USA",
    price: 8.99,
    unit: "pound",
    category: "meat",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.6,
    reviews: 42,
    inStock: true,
  },
  {
    id: "prod-5",
    name: "Organic Soybeans",
    farmName: "Green Valley Organic Farm",
    location: "Iowa, USA",
    price: 3.49,
    unit: "pound",
    category: "grains",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.5,
    reviews: 15,
    inStock: true,
  },
  {
    id: "prod-6",
    name: "Fresh Farm Eggs",
    farmName: "Sunrise Dairy Farm",
    location: "Wisconsin, USA",
    price: 4.29,
    unit: "dozen",
    category: "dairy",
    image: "/placeholder.svg?height=200&width=200",
    rating: 4.9,
    reviews: 28,
    inStock: true,
  },
]

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("")
  const [category, setCategory] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [cartItems, setCartItems] = useState<any[]>([])

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (searchTerm === "") return true
      return (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.farmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.location.toLowerCase().includes(searchTerm.toLowerCase())
      )
    })
    .filter((product) => {
      if (category === "all") return true
      return product.category === category
    })
    .sort((a, b) => {
      if (sortBy === "featured") {
        return b.rating - a.rating
      } else if (sortBy === "price-low") {
        return a.price - b.price
      } else if (sortBy === "price-high") {
        return b.price - a.price
      }
      return 0
    })

  const addToCart = (product: any) => {
    setCartItems([...cartItems, product])
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Farm Marketplace</h1>

      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="w-full md:w-3/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Browse Farm Products</CardTitle>
              <CardDescription>Purchase fresh produce directly from verified farmers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="search">Search Products</Label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by name, farm, or location..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="w-full md:w-[180px] space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="vegetables">Vegetables</SelectItem>
                      <SelectItem value="fruits">Fruits</SelectItem>
                      <SelectItem value="dairy">Dairy</SelectItem>
                      <SelectItem value="meat">Meat</SelectItem>
                      <SelectItem value="grains">Grains</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full md:w-[180px] space-y-2">
                  <Label htmlFor="sort">Sort By</Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="w-full md:w-1/4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shopping Cart
              </CardTitle>
              <CardDescription>
                {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} items in your cart`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-6">Add products to your cart to see them here.</p>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.farmName}</p>
                      </div>
                      <p className="font-medium">${item.price}</p>
                    </div>
                  ))}
                  <div className="flex justify-between pt-2">
                    <p className="font-medium">Total</p>
                    <p className="font-bold">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</p>
                  </div>
                  <Button className="w-full">Checkout</Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Why Buy Direct?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span className="text-sm">Support local farmers directly</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span className="text-sm">Fresher produce with transparent sourcing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span className="text-sm">Reduce carbon footprint with local delivery</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-green-600">•</span>
                  <span className="text-sm">Blockchain-verified sustainable practices</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

