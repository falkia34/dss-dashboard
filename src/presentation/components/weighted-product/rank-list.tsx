'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import {
  DataGrid,
  GridSlots,
  gridPaginatedVisibleSortedGridRowEntriesSelector,
  gridPaginationRowRangeSelector,
} from '@mui/x-data-grid';
import { EmptyRowOverlay } from '@/presentation/components/shared';
import { useStore, weightProductStore } from '@/presentation/hooks';
import { useEffect } from 'react';
import { WPAlternativeVectorUIDto } from '@/presentation/dtos';

type Props = {
  initialData?: WPAlternativeVectorUIDto[];
};

export function RankList({ initialData }: Props) {
  const [rows, setRows, getRows] = useStore(weightProductStore, (s) => [
    s.wpAlternativeVectors,
    s.setWPAlternativeVectors,
    s.getWPAlternativeVectors,
  ]);

  useEffect(() => {
    initialData ? setRows(initialData) : getRows();
  }, [setRows, getRows, initialData]);

  return (
    <Box component="section" className="w-full px-6 mt-5">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography id="table-title" variant="h6" component="h2" className="font-medium">
            Rank
          </Typography>
        </Toolbar>
        <DataGrid
          columns={[
            {
              field: 'id',
              headerName: '#',
              filterable: false,
              width: 60,
              renderCell: (param) => {
                const { id, api } = param;
                const apiRef = { current: api };
                const range = gridPaginationRowRangeSelector(apiRef);
                const rows = gridPaginatedVisibleSortedGridRowEntriesSelector(apiRef);
                const index = rows.findIndex((r) => r.id === id);

                return index === -1 ? '-' : range!.firstRowIndex + index + 1;
              },
            },
            {
              field: 'name',
              headerName: 'Name',
              minWidth: 200,
              flex: 4,
            },
            {
              field: 'sVector',
              type: 'number',
              headerName: 'S-Vector',
              minWidth: 120,
              flex: 1,
            },
            {
              field: 'vVector',
              type: 'number',
              headerName: 'V-Vector',
              minWidth: 120,
              flex: 1,
            },
          ]}
          rows={rows}
          slots={{
            noRowsOverlay: EmptyRowOverlay as GridSlots['noRowsOverlay'],
          }}
          slotProps={{
            noRowsOverlay: { text: 'No data found.' },
          }}
          initialState={{
            sorting: {
              sortModel: [{ field: 'vVector', sort: 'desc' }],
            },
          }}
          autoHeight={true}
          disableColumnFilter={true}
          disableColumnMenu={true}
          disableRowSelectionOnClick={true}
          disableColumnSorting={true}
          hideFooter={true}
        />
      </Container>
    </Box>
  );
}