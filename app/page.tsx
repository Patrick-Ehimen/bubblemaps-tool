import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/public";
import { FloatingTokens } from "@/components/floating-tokens";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-purple-950 via-purple-900 to-blue-950">
      {/* Floating tokens background */}
      <FloatingTokens />

      {/* Content container */}
      <div className="relative z-10">
        {/* Navigation */}
        <header className="container mx-auto px-4 py-6">
          <nav className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image
                src={Logo}
                alt="Bubblemaps Logo"
                width={40}
                height={40}
                className="mr-2"
              />
              <div className="flex flex-col">
                <span className="text-white text-2xl font-medium">
                  bubblemaps
                </span>
                <span className="text-purple-300 text-md">
                  traders-visualization-tool
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/app"
                className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                LAUNCH APP
              </Link>
            </div>

            {/* Mobile menu button - would need to be expanded in a real implementation */}
            <button className="md:hidden text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
          </nav>
        </header>

        {/* Hero section */}
        <main className="container mx-auto px-4 py-20 md:py-32 text-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            Take Up the Habit,
            <br />
            Just Bubble it.
          </h1>
          <p className="text-xl md:text-2xl text-purple-200 mb-12">
            Innovative Visuals for Blockchain Data
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            <Link
              href="/app"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition"
            >
              LAUNCH APP
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
}
