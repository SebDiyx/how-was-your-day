import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.css';
import { AppSidebar } from '@/components/app-sidebar';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { TRPCReactProvider } from '@/trpc/react';
import { Toaster } from '@/components/ui/sonner';
import { PostHogProvider } from '@/components/PostHogProvider';
import {
    ClerkProvider,
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/nextjs';

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
        <ClerkProvider>
            <html lang="en">
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                    <PostHogProvider>
                        <TRPCReactProvider>
                            <SidebarProvider>
                                <div className="flex min-h-screen w-full">
                                    <AppSidebar />
                                    <main className="flex min-h-screen w-full flex-col bg-gradient-to-b from-amber-100 to-white">
                                        <div className="flex items-center justify-between p-4">
                                            <SidebarTrigger className="border border-amber-300 bg-amber-200 text-amber-900 hover:bg-amber-300" />
                                            <div className="flex items-center gap-4">
                                                <SignedOut>
                                                    <SignInButton>
                                                        <button className="rounded-md bg-amber-500 px-4 py-2 text-white hover:bg-amber-600">
                                                            Sign In
                                                        </button>
                                                    </SignInButton>
                                                    <SignUpButton>
                                                        <button className="rounded-md border border-amber-500 px-4 py-2 text-amber-700 hover:bg-amber-50">
                                                            Sign Up
                                                        </button>
                                                    </SignUpButton>
                                                </SignedOut>
                                                <SignedIn>
                                                    <UserButton />
                                                </SignedIn>
                                            </div>
                                        </div>
                                        <div className="w-full flex-1 items-center justify-center">
                                            {children}
                                        </div>
                                    </main>
                                </div>
                            </SidebarProvider>
                        </TRPCReactProvider>
                        <Toaster />
                    </PostHogProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
