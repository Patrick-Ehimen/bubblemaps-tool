"use client";

import Image from "next/image";
import Moralis from "moralis";
import React, { useEffect, useState } from "react";
import { useBubbleContext } from "@/context/bubble-context";
import type { TokenMetadata } from "@/types";
import { tokensHex } from "@/constants";
import { Etherscan } from "@/public";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HelpCircle, Settings, Globe } from "lucide-react";
import Link from "next/link";

export default function TokenMetadata() {
  const { mapData, searchAddress, selectedToken } = useBubbleContext();
  const [tokenMetadata, setTokenMetadata] = useState<TokenMetadata[]>([]);

  const [showTokenModal, setShowTokenModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (mapData) {
        try {
          await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_API_KEY as string,
          });

          const selectedTokenHex = tokensHex[selectedToken];
          if (!selectedTokenHex) {
            console.error("Invalid selected token ID");
            return;
          }

          const response = await Moralis.EvmApi.token.getTokenMetadata({
            chain: selectedTokenHex,
            addresses: [searchAddress],
          });

          console.log("selected token hex::", selectedToken);
          console.log("response data::", response.raw);
          const data = response.toJSON();

          const formattedData = data.map((token: any) => ({
            address: token.address,
            address_label: token.address_label || "",
            name: token.name,
            symbol: token.symbol,
            decimals: token.decimals,
            logo: token.logo || null,
            logo_hash: token.logo_hash || null,
            thumbnail: token.thumbnail || null,
            total_supply: token.total_supply || "",
            total_supply_formatted: token.total_supply_formatted || "",
            fully_diluted_valuation: token.fully_diluted_valuation || "",
            block_number: token.block_number || "",
            validated: token.validated || false,
            created_at: token.created_at || "",
            possible_spam: token.possible_spam || false,
            verified_contract: token.verified_contract || false,
            categories: token.categories || [""],
            links: token.links || {},
          }));

          setTokenMetadata(formattedData);
        } catch (e) {
          console.error(e);
        }
      }
    };

    fetchData();
  }, [mapData, searchAddress, selectedToken]);

  return (
    <div className="absolute z-20 top-0 left-0 ml-4">
      {tokenMetadata.map((token) => (
        <div key={token.address} className="flex gap-4">
          <Button
            onClick={() => setShowTokenModal(true)}
            className="flex items-center gap-3 bg-[#232026] backdrop-blur-sm border-gray-800 rounded-lg py-2 px-4 text-white h-auto"
          >
            {/* <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden"> */}
            <div className="w-8 h-8 rounded-full flex items-center justify-center">
              <Image
                src={token.logo}
                alt={`${token.name} logo`}
                width={30}
                height={30}
                className="w-7 h-7 rounded-full bg-white/90"
              />
            </div>
            {/* </div> */}
            <span className="text-lg font-bold">{token.name} </span>
            <span className="text-lg">•••</span>
          </Button>

          <div className="flex gap-2">
            <Button
              size="icon"
              className="w-12 h-12 rounded-lg bg-[#232026] backdrop-blur-sm border-gray-800"
            >
              <Image
                src={Etherscan}
                alt={`${token.name} logo`}
                width={30}
                height={30}
                className="w-6 h-6 rounded-full bg-white/90"
              />
            </Button>
            <Button
              size="icon"
              className="w-12 h-12 rounded-lg bg-[#232026] backdrop-blur-sm border-gray-800"
              onClick={() => setShowHelpModal(true)}
            >
              <HelpCircle className="w-6 h-6" />
            </Button>
            <Button
              size="icon"
              className="w-12 h-12 rounded-lg bg-[#232026] backdrop-blur-sm border-gray-800"
            >
              <Settings className="w-10 h-10" />
            </Button>
          </div>

          {/* Token Modal */}
          <Dialog open={showTokenModal} onOpenChange={setShowTokenModal}>
            <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-md">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-purple-800/30"
                    style={{
                      width: `${Math.random() * 80 + 20}px`,
                      height: `${Math.random() * 80 + 20}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-4xl font-bold text-gray-200 mb-2">
                  {token.name}
                </h2>
                <p className="text-2xl text-gray-300 mb-6">{token.symbol}</p>
                <div className="flex flex-row gap-4">
                  <div className="flex gap-4 mb-8">
                    <div className="w-10 h-10 cursor-pointer bg-gray-300 rounded-full flex items-center justify-center">
                      <Image
                        src={Etherscan}
                        alt={`${token.name} logo`}
                        width={30}
                        height={30}
                        className="w-6 h-6 rounded-full bg-white/90"
                      />
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
                  >
                    <Globe className="w-6 h-6 text-gray-800" />
                  </Link>
                </div>

                <h3 className="text-2xl text-purple-400 mb-2">
                  Date of current snapshot
                </h3>
                <p className="text-xl text-gray-300 mb-6">
                  {new Date().toUTCString()}
                </p>
                <Button
                  variant="ghost"
                  className="text-xl text-purple-300 uppercase tracking-wider"
                  onClick={() => setShowTokenModal(false)}
                >
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          {/* Help Modal */}
          <Dialog open={showHelpModal} onOpenChange={setShowHelpModal}>
            <DialogContent className="bg-[#1a1a1a] border-gray-800 text-white max-w-xl">
              <div className="absolute inset-0 -z-10 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border border-purple-800/30"
                    style={{
                      width: `${Math.random() * 80 + 20}px`,
                      height: `${Math.random() * 80 + 20}px`,
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex flex-col">
                <DialogTitle className="text-2xl font-bold text-gray-200 mb-4">
                  Welcome to Bubblemaps Visual Tool!
                </DialogTitle>

                <p className="text-lg text-gray-300 mb-8">
                  The first supply auditing tool for DeFi tokens & NFTs.
                  Identify wash trading, DAO, scam tokens, and more.
                </p>

                <h3 className="text-xl font-bold text-gray-200 mb-4">
                  How it works
                </h3>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start gap-2 text-md text-gray-300">
                    <span className="text-2xl">•</span>
                    <span>
                      Each bubble represents a wallet from the top 150.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-md text-gray-300">
                    <span className="text-2xl">•</span>
                    <span>
                      The bigger the bubble, the larger its share of the total
                      supply.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-md text-gray-300">
                    <span className="text-2xl">•</span>
                    <span>
                      Links between bubbles represent blockchain transfers.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 text-md text-gray-300">
                    <span className="text-2xl">•</span>
                    <span>Click on a bubble, and start exploring!</span>
                  </li>
                </ul>

                <div className="flex justify-center mb-6">
                  <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-2 rounded-lg text-md font-medium h-auto">
                    LEARN MORE
                  </Button>
                </div>

                <div className="flex justify-end">
                  <Button
                    className="text-md text-purple-300 cursor-pointer tracking-wider"
                    onClick={() => setShowHelpModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
