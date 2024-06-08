'use client';

import { Button, Grid, Paper, Typography } from '@mui/material';
import { logout } from '@/presentation/actions';
import { useRouter } from 'next/navigation';

export function LogoutForm() {
  const router = useRouter();

  return (
    <Paper
      elevation={0}
      sx={{ bgcolor: 'surface.main' }}
      className="mx-auto p-0 w-full max-w-sm rounded-xl sm:p-8"
    >
      <Typography component="h1" variant="h5" className="text-center font-medium">
        Logout
      </Typography>
      <Typography component="p" className="mt-2 text-center text-sm">
        Are you sure you want to logout?
      </Typography>

      <Grid container spacing={2} className="mt-2">
        <Grid item xs={12} sm={6}>
          <Button variant="filled" fullWidth onClick={() => logout()}>
            Logout
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button variant="outlined" fullWidth onClick={() => router.back()}>
            Back
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
