'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

export default function ForecastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <div>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-700 bg-slate-900/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="">
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">WebSurf</h1>
              <p className="text-sm text-slate-400">Track the perfect surf</p>
            </div>
          </div>

          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full cursor-pointer p-0">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Surfer" />
                    <AvatarFallback className="bg-slate-700 text-white">SF</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 bg-slate-800 border-slate-700 text-slate-200 z-[60]"
                align="end"
                sideOffset={5}
              >
                <DropdownMenuItem className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="text-slate-200 hover:bg-slate-700 focus:bg-slate-700 cursor-pointer">
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
    <div>
  {children}
      </div>
    </div>

</QueryClientProvider>
  );
}
