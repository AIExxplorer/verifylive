import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Geist, Geist_Mono } from "next/font/google"; // Use built-in next/font
import { ThemeProvider } from "@/components/theme-provider";
import { AppFooter } from "@/components/AppFooter";
import { DotScreenShader } from "@/components/ui/dot-shader-background";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artificialuniverse.tech"),
  title: "Artificial Universe",
  description: "Coding the Future",
  openGraph: {
    title: "Artificial Universe",
    description: "Coding the Future",
    url: "https://www.artificialuniverse.tech",
    siteName: "Artificial Universe",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed inset-0 -z-10 pointer-events-none">
               <DotScreenShader />
            </div>
            {children}
            <LanguageSwitcher />
            <AppFooter />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
