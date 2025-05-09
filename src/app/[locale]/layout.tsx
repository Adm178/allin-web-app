// app/[locale]/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MainNavigation } from "@/components/Navigation/main-navigation";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { getDictionary } from "@/i18n/get-dictionary";
import { Providers } from "@/components/Providers";
import type { Locale } from "@/i18n/i18n-config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All In Poker Club",
  description: "Poker tournament management and tracking platform",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  const locale = params.locale;
  const direction = "ltr";

  const dictionary = await getDictionary(locale);

  return (
    <html lang={locale} dir={direction} suppressHydrationWarning>
      <head>
        <title>{metadata.title as string}</title>
        <meta name="description" content={metadata.description as string} />
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#18181b" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <script
          dangerouslySetInnerHTML={{
            __html: `if ('serviceWorker' in navigator) { window.addEventListener('load', () => { navigator.serviceWorker.register('/sw.js'); }); }`,
          }}
        />
      </head>
      <body
        className={cn(
          inter.className,
          "min-h-screen bg-background text-foreground"
        )}
      >
        <Providers dictionary={dictionary}>
          <MainNavigation locale={locale} />
          <main className="min-h-[80vh] pb-8 pt-2 px-2 sm:px-0">
            {children}
          </main>
          <Toaster />
          <footer className="container mx-auto py-6 text-center text-xs text-muted-foreground px-2">
            &copy; {new Date().getFullYear()} All In Poker Club
          </footer>
        </Providers>
      </body>
    </html>
  );
}
