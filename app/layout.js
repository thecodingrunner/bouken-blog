// import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";
import Header from "@/components/Header";
import Provider from "@/components/Provider";
import DarkModeButton from "@/components/DarkModeButton";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BOUKEN | 冒険",
  description: "A site for exploration",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet" />
      </head>
      <body className="overflow-x-hidden dark:bg-dark-background bg-light-background dark:text-dark-text text-light-text overflow-y-auto">
        <Provider>
          <Header />
          {children}
          <Footer />
          <DarkModeButton />
        </Provider>
      </body>
    </html>
  );
}
