import React from "react";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/lib/theme-providers";
// import { BubbleProvider } from "@/context/bubble-context";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      {/* <BubbleProvider> */}
      <Navbar />
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      {/* </BubbleProvider> */}
    </main>
  );
}
