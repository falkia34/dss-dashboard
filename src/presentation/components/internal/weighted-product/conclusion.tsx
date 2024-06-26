'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import { useStore, weightProductStore } from '@/presentation/hooks';
import { useEffect } from 'react';
import { WPAlternativeVectorUIDto } from '@/presentation/dtos';

type Props = {
  initialData?: WPAlternativeVectorUIDto[];
};

export function Conclusion({ initialData }: Props) {
  const [rows, setRows, getRows] = useStore(weightProductStore, (s) => [
    s.wpAlternativeVectors,
    s.setWPAlternativeVectors,
    s.getWPAlternativeVectors,
  ]);
  const sortedRows = [...rows].sort((a, b) => b.vVector - a.vVector);

  useEffect(() => {
    initialData ? setRows(initialData) : getRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="section" className="w-full px-6 mt-5">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography variant="h6" component="h2" className="font-medium">
            Conclusion
          </Typography>
        </Toolbar>

        <Typography variant="body2" component="p">
          {sortedRows.length
            ? `So, the best alternatives is ${sortedRows[0].name} with preference value of ${sortedRows[0].vVector.toFixed(5)}.`
            : 'No alternatives to compare.'}
        </Typography>
      </Container>
    </Box>
  );
}
