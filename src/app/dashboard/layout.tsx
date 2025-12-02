'use client';

import { Flex } from '@/components/Flex';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAuth } from '@/context/auth';
import { IconLogout2 } from '@tabler/icons-react';
import { BarChart3, User, UserCircle2, Users } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { GiWaveSurfer } from 'react-icons/gi';
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from 'react-icons/tb';

const navItems = [
  { icon: GiWaveSurfer, label: 'Previsão', active: true, href: '/forecast' },
  { icon: BarChart3, label: 'Painel', active: false, href: '/dashboard' },
  { icon: User, label: 'Perfil', active: false, href: '/dashboard/profile' },
];

const LayoutDashboard = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
  const [isClient, setIsClient] = useState<boolean>(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    setIsClient(true);

    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, []);

  return (
    <section className='bg-slate-100 dark:bg-[#030712] h-screen overflow-hidden print:w-dvw relative'>
      <div
        className={`fixed left-0 top-0 right-0 border-b border-border shadow w-full max-sm:w-full h-[60px] bg-background flex items-center justify-center  z-50 print:hidden`}
      >
        <Flex className='justify-between container items-center w-full'>
          <div className='flex items-center gap-4'>
            <div className='text-xl font-bold text-primary '>
              <h1 className='tracking-wider line-clamp-1'>WEB SURF</h1>
            </div>
            <Button
              onClick={toggleCollapse}
              className=' rounded-lg transition-all duration-200 !px-1.5'
              variant='ghost'
            >
              {isCollapsed ? (
                <TbLayoutSidebarLeftExpand className='size-5' />
              ) : (
                <TbLayoutSidebarLeftCollapseFilled className='size-5' />
              )}
            </Button>
          </div>
          <div className='flex items-center gap-4'>
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
          </div>
        </Flex>
      </div>

      <div className='flex'>
        {/* <div className="bg-white rounded-r-xl h-screen w-52 fixed left-0 p-6 top-0 bottom-0 space-y-4 py-4 transition-all duration-500 overflow-y-auto max-md:transform no-scrollbar"> */}

        <aside
          className={`bg-sidebar fixed top-15 text-sidebar-foreground shadow-lg border-r border-sidebar-border min-h-screen transition-all duration-500 no-scrollbar ${
            isCollapsed ? 'w-18' : 'w-52'
          }`}
        >
          <nav className='p-4 space-y-1'>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent/50'
                }`}
                title={isCollapsed ? item.label : undefined}
              >
                <item.icon className='h-4 w-4 flex-shrink-0' />
                {!isCollapsed && <span>{item.label}</span>}
              </a>
            ))}
          </nav>
        </aside>

        {/* </div> */}
        <div
          className={`w-full h-[calc(100vh-80px)] ${
            isCollapsed ? 'ml-[90px] mr-4 max-md:ml-0' : 'ml-[210px]'
          } mt-16 space-y-4 p-4 overflow-auto transition-all duration-500 print:m-0`}
        >
          <div className='flex flex-col h-[calc(100%-theme(space.12))]'>
            <main className='rounded-md p-4 print:w-full '>
              <div className='flex-1'>{children}</div>
            </main>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LayoutDashboard;
