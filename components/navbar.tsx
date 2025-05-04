"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { tokens } from "@/constants";
import { Logo } from "@/public";
import { ThemeToggle } from "./toggle-theme";
import { useBubbleContext } from "@/context/bubble-context";
import { fetchMapData } from "@/service/fetchData";

export function Navbar() {
  const [selectedToken, setSelectedToken] = useState<(typeof tokens)[0]>(
    tokens[0]
  );
  const {
    setSelectedToken: setGlobalToken,
    setSearchAddress,
    setMapData,
  } = useBubbleContext();
  const [searchValue, setSearchValue] = useState("");

  // Ensure the selected token is updated globally when changed
  const handleTokenSelect = (token: (typeof tokens)[0]) => {
    setSelectedToken(token);
    setGlobalToken(token.id || "");
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setSearchAddress(e.target.value);
  };

  return (
    <nav className="flex items-center justify-between px-4 py-3 bg-black">
      {/* Logo */}
      <div className="flex items-center">
        <Link href="/" className="mr-4">
          <Image src={Logo} alt="Logo" width={40} height={40} />
        </Link>

        {/* Token Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="flex items-center gap-2 bg-[#0a3b5c] text-white border-none hover:bg-[#0c4a73] rounded-full px-4"
            >
              <div className="flex items-center gap-2">
                <div className="p-1 rounded-md">
                  <Image
                    src={selectedToken.icon || "/placeholder.svg"}
                    alt={selectedToken.name}
                    width={20}
                    height={20}
                    className="min-w-[20px]"
                  />
                </div>
                <span className="font-medium">{selectedToken.name}</span>
              </div>
              <ChevronDown size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="bg-[#121212] border-[#333] text-white w-[200px]"
          >
            {tokens.map((token) => (
              <DropdownMenuItem
                key={token.id}
                onClick={() => handleTokenSelect(token)}
                className="flex items-center gap-3 py-2 hover:bg-[#222] cursor-pointer"
              >
                <Image
                  src={token.icon || "/placeholder.svg"}
                  alt={token.name}
                  width={24}
                  height={24}
                  className="min-w-[24px]"
                />
                <span>{token.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Search */}
        <div className="relative flex items-center ml-4 gap-2">
          <div className="relative">
            <Input
              type="text"
              value={searchValue}
              onChange={handleSearch}
              placeholder="Search Token Address..."
              className="bg-transparent border-[#333] text-white w-[200px] rounded-full pl-4 pr-10"
            />
            <Search
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />

        <Button
          onClick={() =>
            fetchMapData(selectedToken.id || "", searchValue, setMapData)
          }
          className="bg-gradient-to-r from-[#c81d77] to-[#7d1d8b] hover:from-[#d41e80] hover:to-[#8a1e9a] text-white rounded-lg cursor-pointer"
        >
          Fetch Data
        </Button>
      </div>
    </nav>
  );
}
