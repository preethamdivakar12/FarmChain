"use client"

import { useState } from "react"
import Image from "next/image"
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
import { useToast } from "@/hooks/use-toast"
import { MapPin, ShoppingCart, Star } from "lucide-react"

interface ProductCardProps {
  product: {
    id: string
    name: string
    farmName: string
    location: string
    price: number
    unit: string
    category: string
    image: string
    rating: number
    reviews: number
    inStock: boolean
  }
  onAddToCart: (product: any) => void
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddToCart = () => {
    onAddToCart(product)

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <>
      <Card className="overflow-hidden">
        <div className="relative h-48 w-full">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg">{product.name}</CardTitle>
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-500 mr-1" />
              <span className="text-sm font-medium">{product.rating}</span>
              <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
            </div>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {product.farmName}, {product.location}
          </div>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-lg font-bold">${product.price}</p>
              <p className="text-sm text-muted-foreground">per {product.unit}</p>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{product.name}</DialogTitle>
                  <DialogDescription>
                    From {product.farmName} in {product.location}
                  </DialogDescription>
                </DialogHeader>
                <div className="relative h-[200px] w-full my-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium">Description</h4>
                    <p className="text-sm text-muted-foreground">
                      Fresh, locally grown {product.name.toLowerCase()} from {product.farmName}. Our products are grown
                      using sustainable farming practices and harvested at peak ripeness.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium">Price</h4>
                      <p className="text-sm">
                        ${product.price} per {product.unit}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium">Category</h4>
                      <p className="text-sm capitalize">{product.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Farm</h4>
                      <p className="text-sm">{product.farmName}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Location</h4>
                      <p className="text-sm">{product.location}</p>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      handleAddToCart()
                      setIsDialogOpen(false)
                    }}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Add to Cart
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

