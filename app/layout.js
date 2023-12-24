import "./globals.css";
import Provider from "./context/Provider";
export default function RootLayout({ children }) {
  return (
    <html lang="en" className="min-h-full">
      <Provider>
        <body className="min-h-full">{children}</body>
      </Provider>
    </html>
  );
}
