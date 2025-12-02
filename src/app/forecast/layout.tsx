'use client';

import { IconLogout, IconLogout2, IconSettings } from '@tabler/icons-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Image from 'next/image';
import { Flex } from '@/components/Flex';
import { LayoutDashboard, UserCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { useAuth } from '@/context/auth';
import { useRouter } from 'next/navigation';

export default function ForecastLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();
  const { logout, user } = useAuth();
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <header className='fixed top-4 left-5 right-5 rounded-full z-50 border-b shadow-md border-slate-500 bg-card backdrop-blur-sm'>
          <div className='container mx-auto px-4 py-2'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                {/* <div className="">
              <Image src="/favicon.ico" alt="Logo" width={32} height={32} />
            </div> */}

                <div>
                  <h1 className='text-xl font-bold text-foreground'>WebSurf</h1>
                  <p className='text-sm text-foreground'>Acompanhe o surf perfeito</p>
                </div>
              </div>

              <Flex className=''>
                <Link href='/dashboard' className='flex items-center gap-2 hover:underline'>
                  <LayoutDashboard size={16} />
                  Dashboard
                </Link>
              </Flex>

              <Flex className='items-center gap-4'>
                <ThemeToggle />

                <Popover>
                  <PopoverTrigger className='hover:cursor-pointer'>
                    <Avatar className='h-10 w-10'>
                      <AvatarImage src='/placeholder.svg?height=32&width=32' alt='Surfer' />
                      <AvatarFallback className='bg-muted-foreground text-white'>
                        {user?.name?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </PopoverTrigger>
                  <PopoverContent className='w-52 '>
                    <Flex
                      onClick={() => router.push('/dashboard/profile')}
                      className='text-primary gap-2 p-2 items-center rounded-md hover:bg-muted focus:bg-muted cursor-pointer'
                    >
                      <UserCircle2 size={22} /> Perfil
                    </Flex>
                    <Flex
                      onClick={logout}
                      className='text-primary gap-2 p-2 items-center rounded-md hover:bg-muted focus:bg-muted cursor-pointer'
                    >
                      <IconLogout2 stroke={2} size={22} /> Sair
                    </Flex>
                  </PopoverContent>
                </Popover>
              </Flex>
            </div>
          </div>
        </header>

        <div>{children}</div>
      </div>
    </QueryClientProvider>
  );
}
