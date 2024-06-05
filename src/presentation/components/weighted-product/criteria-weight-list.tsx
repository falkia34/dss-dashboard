'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridEditInputCell,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
} from '@mui/x-data-grid';
import { CancelRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { EmptyRowOverlay } from '@/presentation/components/shared';
import { useEffect, useState } from 'react';
import { useStore, weightProductStore } from '@/presentation/hooks';
import { WPCriterionWeightUIDto } from '@/presentation/dtos';

type Props = {
  initialData?: WPCriterionWeightUIDto[];
};

export function CriteriaWeightList({ initialData }: Props) {
  const [rows, setRows, getRows] = useStore(weightProductStore, (s) => [
    s.wpCriterionWeights,
    s.setWPCriterionWeights,
    s.getWPCriterionWeights,
  ]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'weight' },
    });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const processRowUpdate = (newRow: GridRowModel<WPCriterionWeightUIDto>) => {
    const sumOfWeights = rows.reduce(
      (acc, row) => (row.id === newRow.id ? acc + newRow.weight : acc + row.weight),
      0,
    );

    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));

    return {
      ...newRow,
      normalizedWeight: (newRow.weight / sumOfWeights) * (newRow.type === 'cost' ? -1 : 1),
    };
  };

  useEffect(() => {
    initialData ? setRows(initialData) : getRows();
  }, [setRows, getRows, initialData]);

  return (
    <Box component="section" className="w-full px-6">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography id="table-title" variant="h6" component="h2" className="font-medium">
            Weight Configurations
          </Typography>
        </Toolbar>
        <DataGrid
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              minWidth: 200,
              flex: 4,
            },
            {
              field: 'type',
              type: 'singleSelect',
              headerName: 'Type',
              minWidth: 100,
              flex: 2,
              valueOptions: [
                { value: 'cost', label: 'Cost' },
                { value: 'benefit', label: 'Benefit' },
              ],
            },
            {
              field: 'weight',
              type: 'number',
              headerName: 'Weight',
              minWidth: 100,
              flex: 1,
              editable: true,
              renderEditCell: (params) => (
                <GridEditInputCell
                  {...params}
                  inputProps={{
                    max: 5,
                    min: 1,
                  }}
                />
              ),
            },
            {
              field: 'normalizedWeight',
              type: 'number',
              headerName: 'Normalized',
              minWidth: 100,
              flex: 1,
            },
            {
              field: 'actions',
              type: 'actions',
              headerName: 'Actions',
              width: 100,
              cellClassName: 'actions',
              getActions: ({ id }) => {
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                  return [
                    <GridActionsCellItem
                      key="save"
                      icon={<SaveRounded />}
                      label="Save"
                      onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                      key="cancel"
                      icon={<CancelRounded />}
                      label="Cancel"
                      onClick={handleCancelClick(id)}
                    />,
                  ];
                }

                return [
                  <GridActionsCellItem
                    key="edit"
                    icon={<EditRounded />}
                    label="Edit"
                    onClick={handleEditClick(id)}
                  />,
                ];
              },
            },
          ]}
          rows={rows}
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            noRowsOverlay: EmptyRowOverlay as GridSlots['noRowsOverlay'],
          }}
          slotProps={{
            noRowsOverlay: { text: 'No data found.' },
          }}
          editMode="row"
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
