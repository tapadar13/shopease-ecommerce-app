import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutContent from "./LayoutContent";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ShopEase",
  description: "Your one-stop shop for all your needs",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers>
            <LayoutContent>{children}</LayoutContent>
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
