import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TRPCReactProvider } from '@/trpc/react';
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
    title: 'How Was Your Day',
    description: 'Track and reflect on your daily experiences',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <TRPCReactProvider>
                    <SidebarProvider>
                        <div className="flex min-h-screen w-full">
                            <AppSidebar />
                            <main className="flex min-h-screen w-full flex-col bg-gradient-to-b from-amber-100 to-white">
                                <SidebarTrigger className="m-4 border border-amber-300 bg-amber-200 text-amber-900 hover:bg-amber-300" />
                                <div className="w-full flex-1 items-center justify-center">
                                    {children}
                                </div>
                            </main>
                        </div>
                    </SidebarProvider>
                </TRPCReactProvider>
                <Toaster />
            </body>
        </html>
    );
}
