'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import { CancelRounded, DeleteRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { CriteriaListToolbar } from './criteria-list-toolbar';
import { CriterionUIDto } from '@/presentation/dtos';
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridSlots,
} from '@mui/x-data-grid';
import { EmptyRowOverlay } from '@/presentation/components/internal/shared';
import { useEffect, useState } from 'react';
import { mainStore, useStore } from '@/presentation/hooks';

type Props = {
  initialData?: CriterionUIDto[];
};

export function CriteriaList({ initialData }: Props) {
  const [rows, setRows, getRows] = useStore(mainStore, (s) => [
    s.criteria,
    s.setCriteria,
    s.getCriteria,
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
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);

    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel<CriterionUIDto>) => {
    const updatedRow = { ...newRow, isNew: false };

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  useEffect(() => {
    initialData ? setRows(initialData) : getRows();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box component="section" className="w-full px-6">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography id="table-title" variant="h6" component="h2" className="font-medium">
            Configurations
          </Typography>
          <CriteriaListToolbar rows={rows} setRows={setRows} setRowModesModel={setRowModesModel} />
        </Toolbar>
        <DataGrid
          columns={[
            {
              field: 'name',
              headerName: 'Name',
              minWidth: 200,
              flex: 2,
              editable: true,
            },
            {
              field: 'type',
              headerName: 'Type',
              minWidth: 100,
              flex: 1,
              type: 'singleSelect',
              editable: true,
              valueOptions: [
                { value: 'cost', label: 'Cost' },
                { value: 'benefit', label: 'Benefit' },
              ],
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
                  <GridActionsCellItem
                    key="delete"
                    icon={<DeleteRounded />}
                    label="Delete"
                    onClick={handleDeleteClick(id)}
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
