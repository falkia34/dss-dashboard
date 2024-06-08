'use client';

import { Box, Button, Paper, Typography } from '@mui/material';
import { login } from '@/presentation/actions';

export function LoginForm() {
  return (
    <Paper
      elevation={0}
      sx={{ bgcolor: 'surface.main' }}
      className="mx-auto p-0 max-w-sm rounded-xl sm:p-8"
    >
      <Typography component="h1" variant="h5" className="text-center font-medium">
        Login
      </Typography>
      <Typography component="p" className="my-2 text-center text-sm">
        to continue to the app
      </Typography>

      <Box component="form" noValidate className="mt-4">
        <Button variant="outlined" fullWidth className="mt-4" onClick={() => login()}>
          Login with UNY SSO
        </Button>
      </Box>
    </Paper>
  );
}
