'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridSlots } from '@mui/x-data-grid';
import { EmptyRowOverlay } from '@/presentation/components/shared';
import { mainStore, useStore, weightProductStore } from '@/presentation/hooks';
import { SVCalculationListToolbar } from './s-v-calculation-list-toolbar';
import { useEffect } from 'react';
import { WPAlternativeVectorUIDto } from '@/presentation/dtos';

type Props = {
  initialData?: WPAlternativeVectorUIDto[];
};

export function SVCalculationList({ initialData }: Props) {
  const [criteria, getCriteria] = useStore(mainStore, (s) => [s.criteria, s.getCriteria]);
  const [rows, setRows, getRows, calculateRows] = useStore(weightProductStore, (s) => [
    s.wpAlternativeVectors,
    s.setWPAlternativeVectors,
    s.getWPAlternativeVectors,
    s.calculateWPAlternativeVectors,
  ]);

  useEffect(() => {
    getCriteria();
    initialData ? setRows(initialData) : getRows();
  }, [initialData, setRows, getRows, getCriteria]);

  return (
    <Box component="section" className="w-full px-6 mt-5">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography id="table-title" variant="h6" component="h2" className="font-medium">
            S-Vector and V-Vector Calculation
          </Typography>
          <SVCalculationListToolbar calculateRows={calculateRows} />
        </Toolbar>
        <DataGrid
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              minWidth: 200,
              flex: 4,
            },
            ...criteria.map<GridColDef>((criterion) => ({
              field: `marks.${criterion.name.toLowerCase()}`,
              type: 'number',
              headerName: criterion.name,
              width: 120,
              valueGetter: (_, row) => row.marks[criterion.id],
              valueSetter: (value, row) => ({
                ...row,
                marks: { ...row.marks, [criterion.id]: value },
              }),
            })),
            {
              field: 'sVector',
              type: 'number',
              headerName: 'S-Vector',
              minWidth: 120,
              flex: 1,
              valueFormatter: (value) => (value as number).toFixed(5),
            },
            {
              field: 'vVector',
              type: 'number',
              headerName: 'V-Vector',
              minWidth: 120,
              flex: 1,
              valueFormatter: (value) => (value as number).toFixed(5),
            },
          ]}
          rows={rows}
          slots={{
            noRowsOverlay: EmptyRowOverlay as GridSlots['noRowsOverlay'],
          }}
          slotProps={{
            noRowsOverlay: { text: 'No data found.' },
          }}
          autoHeight={true}
          disableColumnFilter={true}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          hideFooter={true}
        />
      </Container>
    </Box>
  );
}
