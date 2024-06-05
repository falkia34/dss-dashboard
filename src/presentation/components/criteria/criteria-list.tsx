'use client';

import { Box, Container, Toolbar, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
} from '@mui/x-data-grid';
import { CancelRounded, DeleteRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { clientContainer } from '@/client-injection';
import { Criterion } from '@/domain/entities';
import { CriteriaListToolbar } from './criteria-list-toolbar';
import { EmptyRowOverlay } from '@/presentation/components/shared';
import { GetCriteria, SetCriteria } from '@/application/client';
import { Symbols } from '@/config';
import { useEffect, useState } from 'react';

type Props = {
  initialData?: Criterion[];
};

export function CriteriaList({ initialData }: Props) {
  const getCriteria = clientContainer.get<GetCriteria>(Symbols.GetCriteria);

  const [rows, setRows] = useState<GridRowsProp<Criterion & { isNew: boolean }>>(
    initialData
      ? initialData.map((datum) => ({
          id: datum.id,
          name: datum.name,
          type: datum.type,
          isNew: false,
        }))
      : getCriteria.execute().map((datum) => ({
          id: datum.id,
          name: datum.name,
          type: datum.type,
          isNew: false,
        })),
  );
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

  const processRowUpdate = (newRow: GridRowModel<Criterion & { isNew: boolean }>) => {
    const updatedRow = { ...newRow, isNew: false };

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  useEffect(() => {
    const setCriteria = clientContainer.get<SetCriteria>(Symbols.SetCriteria);

    setCriteria.execute(rows.map((row) => new Criterion(row.id, row.name, row.type)));
  }, [rows]);

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
          <CriteriaListToolbar setRows={setRows} setRowModesModel={setRowModesModel} />
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
