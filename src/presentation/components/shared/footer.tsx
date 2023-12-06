'use client';

import { Container, Typography } from '@mui/material';
import { mainStore, useStore } from '@/presentation/hooks';

export function Footer() {
  const sidebarExtended = useStore(mainStore, (s) => s.sidebarExtended);

  return (
    <Container
      component="footer"
      maxWidth={false}
      sx={{ bgcolor: 'surfaceContainer.main' }}
      className={`flex items-center h-16 w-auto px-6 py-2 md:px-12 lg:px-18 ${
        sidebarExtended ? 'lg:ml-[260px]' : 'lg:ml-14'
      }`}
    >
      <Typography
        component="p"
        sx={{ color: 'outline' }}
        className="max-w-2xl mx-auto my-0 text-sm text-center"
      >
        Made with &#128154; by Muhammad Naufal.
      </Typography>
    </Container>
  );
}
