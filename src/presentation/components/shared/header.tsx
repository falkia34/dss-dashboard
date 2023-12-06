'use client';

import { AppBar, IconButton, Typography } from '@mui/material';
import { Config } from '@/config';
import { mainStore, useStore } from '@/presentation/hooks';
import { MenuRounded } from '@mui/icons-material';
import { Navbar } from './navbar';

export function Header() {
  const [sidebarOpened, setSidebarOpenedState] = useStore(mainStore, (s) => [
    s.sidebarOpened,
    s.setSidebarOpenedState,
  ]);

  return (
    <AppBar
      component="header"
      sx={{
        bgcolor: 'surfaceContainer.main',
      }}
      className="flex flex-row items-center w-full h-[74px] p-4 shadow-none lg:pl-0"
    >
      <IconButton className="lg:hidden" onClick={() => setSidebarOpenedState(!sidebarOpened)}>
        <MenuRounded />
      </IconButton>
      <div className="w-full md:w-[204px] lg:w-[260px]">
        <Typography
          component="h1"
          variant="h6"
          className="mx-auto text-center font-medium text-infinite-green"
        >
          DSS
        </Typography>
        {/* <InfiniteLogo width={46} height={46} className="ml-8 fill-infinite-green lg:mx-auto" /> */}
      </div>
      <Navbar menus={Config.nav.menus} />
    </AppBar>
  );
}
