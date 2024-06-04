'use client';

import { AlternativesListToolbar } from './alternatives-list-toolbar';
import { Box, Container, Toolbar, Typography } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
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
import { Alternative } from '@/domain/entities';
import { EmptyRowOverlay } from '@/presentation/components/shared';
import { GetAlternatives, GetCriteria, SetAlternatives } from '@/application/client';
import { Symbols } from '@/config';
import { useEffect, useState } from 'react';

type Props = {
  initialData?: Alternative[];
};

export function AlternativesList({ initialData = [] }: Props) {
  const getCriteria = clientContainer.get<GetCriteria>(Symbols.GetCriteria);
  const getAlternatives = clientContainer.get<GetAlternatives>(Symbols.GetAlternatives);

  const criteria = getCriteria.execute();
  const [rows, setRows] = useState<GridRowsProp<Alternative & { isNew: boolean }>>(
    initialData.length > 0
      ? initialData.map((datum) => ({
          id: datum.id,
          name: datum.name,
          marks: datum.marks,
          isNew: false,
        }))
      : getAlternatives.execute().map((datum) => ({
          id: datum.id,
          name: datum.name,
          marks: datum.marks,
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

  const processRowUpdate = (newRow: GridRowModel<Alternative & { isNew: boolean }>) => {
    const updatedRow = { ...newRow, isNew: false };

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    return updatedRow;
  };

  useEffect(() => {
    const setAlternatives = clientContainer.get<SetAlternatives>(Symbols.SetAlternatives);

    setAlternatives.execute(rows.map((row) => new Alternative(row.id, row.name, row.marks)));
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
            Data
          </Typography>
          <AlternativesListToolbar
            setRows={setRows}
            setRowModesModel={setRowModesModel}
            criteria={criteria}
          />
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
            ...criteria.map<GridColDef>((criterion) => ({
              field: `marks.${criterion.name.toLowerCase()}`,
              headerName: criterion.name,
              width: 100,
              editable: true,
              valueGetter: (_, row) => row.marks[criterion.name.toLowerCase()],
              valueSetter: (value, row) => ({
                ...row,
                marks: { ...row.marks, [criterion.name.toLowerCase()]: value },
              }),
            })),
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
