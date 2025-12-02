import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { PostHogProvider } from '@/context/logs/posthog';
import { AuthProvider } from '@/context/auth';
import { Toaster } from '@/components/ui/sonner';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'WebSurf',
  description: 'Get real-time surf conditions and forecasts for beaches worldwide.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <head />
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <PostHogProvider>
            {/* <SessionProvider> */}
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
            <Toaster />
            {/* </SessionProvider> */}
          </PostHogProvider>
        </AuthProvider>

        <div data-tf-live='01KBFGH7271X07ZS38FR4835X5'></div>

        <script
          async
          src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3105347540753745'
          crossOrigin='anonymous'
        ></script>
        <script src='//embed.typeform.com/next/embed.js'></script>
      </body>
    </html>
  );
}
