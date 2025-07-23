"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ConnectWallet } from "@/components/connect-wallet"
import { ModeToggle } from "@/components/mode-toggle"
import { Menu, X } from "lucide-react"
import { Leaf } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-green-600" />
            <span className="text-xl font-bold">FarmChain</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </Link>
          <Link href="/marketplace" className="text-sm font-medium hover:underline underline-offset-4">
            Marketplace
          </Link>
          <Link href="/funding" className="text-sm font-medium hover:underline underline-offset-4">
            Funding
          </Link>
          <Link href="/sustainability" className="text-sm font-medium hover:underline underline-offset-4">
            Sustainability
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <ConnectWallet />
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4">
          <nav className="flex flex-col space-y-4">
            <Link href="/" className="text-sm font-medium hover:underline underline-offset-4" onClick={toggleMenu}>
              Home
            </Link>
            <Link
              href="/marketplace"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={toggleMenu}
            >
              Marketplace
            </Link>
            <Link
              href="/funding"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={toggleMenu}
            >
              Funding
            </Link>
            <Link
              href="/sustainability"
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={toggleMenu}
            >
              Sustainability
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

