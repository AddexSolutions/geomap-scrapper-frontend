import "../styles/index.css";
import "../styles/prism-vsc-dark-plus.css";
import { AuthProvider } from "@/context/AuthContext";
import ClientLoader from "./ClientLoader";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ClientLoader>
            {children}
          </ClientLoader>
        </AuthProvider>
      </body>
    </html>
  );
}
