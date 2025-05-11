import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

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
                <SidebarProvider>
                    <div className="flex min-h-screen w-full">
                        <AppSidebar />
                        <main className="flex min-h-screen bg-gradient-to-b from-amber-100 to-white w-full">
                            <SidebarTrigger className="bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-300 m-4" />
                            <div className="flex-1 justify-center items-center p-4 md:p-20 w-full">
                                {children}
                            </div>
                        </main>
                    </div>
                </SidebarProvider>
            </body>
        </html>
    );
}
