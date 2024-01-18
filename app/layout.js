import "./globals.css";
import Provider from "./context/Provider";
import { Lato } from "next/font/google";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lato.className}>
      <Provider>
        <body className="min-h-full">{children}</body>
      </Provider>
    </html>
  );
}
