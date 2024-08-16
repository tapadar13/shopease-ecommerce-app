import { Nunito } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers/Providers";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutContent from "./LayoutContent";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata = {
  title: "ShopEase",
  description: "Your one-stop shop for all your needs",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "ShopEase",
    description: "Your one-stop shop for all your needs",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/favicon.ico`,
        width: 800,
        height: 600,
        alt: "ShopEase Logo",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={nunito.className}>
          <Providers>
            <LayoutContent>{children}</LayoutContent>
            <Toaster />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
