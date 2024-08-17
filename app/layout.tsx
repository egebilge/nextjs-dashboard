import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/lib/theme-provider";
import { Provider } from "@/lib/session-provider";
import { ModeToggle } from "@/components/mode-toggle";
import QueryProvider from "@/lib/query-provider";
import { I18nInitializer } from "@/components/I18n-initializer";

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dashboard With NextJS",
  description: "Dashboard with NextJS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Provider>
        <QueryProvider>
          <body className={roboto.className}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <TooltipProvider>
                <I18nInitializer />
                {children}
                <footer className="fixed bottom-0 right-0 p-4">
                  <ModeToggle />
                </footer>
              </TooltipProvider>
            </ThemeProvider>
          </body>
        </QueryProvider>
      </Provider>
    </html>
  );
}
