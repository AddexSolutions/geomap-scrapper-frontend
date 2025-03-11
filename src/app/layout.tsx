import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { AuthProvider } from "@/context/AuthContext";
import ClientLoader from "./ClientLoader";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <AuthProvider>
          <ClientLoader>
            {children}
          </ClientLoader>
        </AuthProvider>
      </body>
    </html>
  );
}