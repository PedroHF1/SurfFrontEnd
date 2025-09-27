'use client'

import { Flex } from "@/components/Flex";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BarChart3, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { GiWaveSurfer } from "react-icons/gi";
import { TbLayoutSidebarLeftCollapseFilled, TbLayoutSidebarLeftExpand } from "react-icons/tb";

const navItems = [
  { icon: GiWaveSurfer, label: "Forecast", active: true },
  { icon: BarChart3, label: "Dashboard", active: false },
  { icon: Users, label: "People", active: false },
]

const LayoutDashboard = ({children}: { children: React.ReactNode }) => {
   const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
   const [isClient, setIsClient] = useState<boolean>(false);

  const toggleCollapse = () => {
    // localStorage.setItem(SIDE_MENU, String(!isCollapsed));
    setIsCollapsed(!isCollapsed);
  };

  useEffect(() => {
    // const initialIsCollapsed = localStorage.getItem(SIDE_MENU);
    // setIsCollapsed(initialIsCollapsed === 'true');
    setIsClient(true); // We are now on the client side

    if (window.innerWidth < 768) {
      setIsCollapsed(true);
    }
  }, []);

  return (

    <section className='bg-slate-100 h-screen overflow-hidden print:w-dvw relative'>

      <div className={`fixed left-0 top-0 right-0 border-b border-border shadow w-full max-sm:w-full h-[60px] bg-background flex items-center justify-center  z-50 print:hidden`}>
        <Flex className="justify-between container items-center w-full">
          <div className="flex items-center gap-4">
          <div className="text-xl font-bold text-primary ">
          <h1 className="tracking-wider line-clamp-1">WEB SURF</h1>
          </div>
        <Button
          onClick={toggleCollapse}
          className=" rounded-lg transition-all duration-500 !px-1.5"
          variant="ghost"
        >
          {isCollapsed ? <TbLayoutSidebarLeftExpand className="size-5"/>
 : <TbLayoutSidebarLeftCollapseFilled className="size-5" />}
        </Button>
        </div>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        </Flex>
      </div>

        <div className='flex'>
          {/* <div className="bg-white rounded-r-xl h-screen w-52 fixed left-0 p-6 top-0 bottom-0 space-y-4 py-4 transition-all duration-500 overflow-y-auto max-md:transform no-scrollbar"> */}

            <aside
      className={`bg-sidebar fixed top-15 text-sidebar-foreground shadow-lg border-r border-sidebar-border min-h-screen transition-all duration-500 no-scrollbar ${
        isCollapsed ? "w-18" : "w-52"
      }`}
    >
      <nav className="p-4 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              item.active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            }`}
            title={isCollapsed ? item.label : undefined}
          >
            <item.icon className="h-4 w-4 flex-shrink-0" />
            {!isCollapsed && <span>{item.label}</span>}
          </a>
        ))}
      </nav>
    </aside>

          {/* </div> */}
          <div
            className={`w-full h-[calc(100vh-80px)] ${isCollapsed ? 'ml-[90px] mr-4 max-md:ml-0' : 'ml-[210px]'} mt-16 space-y-4 p-4 overflow-auto transition-all duration-500 print:m-0`}
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
}

export default LayoutDashboard;
