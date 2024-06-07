import { CriterionUIDto } from '@/presentation/dtos';
import { AddRounded, CancelRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  rows: CriterionUIDto[];
  rowModesModel: GridRowModesModel;
  setRows: (newRows: CriterionUIDto[]) => void;
  setRowModesModel: (newModel: SetStateAction<GridRowModesModel>) => void;
};

export function CriteriaListToolbar({ rows, rowModesModel, setRows, setRowModesModel }: Props) {
  const isInEditMode = Object.values(rowModesModel).some(
    (rowMode) => rowMode.mode === GridRowModes.Edit,
  );

  const handleAddClick = () => {
    const id = uuidv4();

    setRows([...rows, { id, name: '', type: 'cost', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  const handleEditClick = () => {
    setRowModesModel(Object.fromEntries(rows.map((row) => [row.id, { mode: GridRowModes.Edit }])));
  };

  const handleSaveClick = () => {
    setRowModesModel(
      Object.fromEntries(
        Object.keys(rowModesModel).map((rowId) => [rowId, { mode: GridRowModes.View }]),
      ),
    );

    setRows(rows.map((row) => ({ ...row, isNew: false })));
  };

  const handleCancelClick = () => {
    setRowModesModel(
      Object.fromEntries(
        Object.keys(rowModesModel).map((rowId) => [
          rowId,
          { mode: GridRowModes.View, ignoreModifications: true },
        ]),
      ),
    );

    setRows(rows.filter((r) => !r.isNew));
  };

  return (
    <Box className="ml-auto">
      <Tooltip title="Add criteria">
        <IconButton className="ml-4" aria-label="Add criteria" onClick={handleAddClick}>
          <AddRounded />
        </IconButton>
      </Tooltip>
      {isInEditMode ? (
        <>
          <Tooltip title="Save all">
            <IconButton className="ml-2" aria-label="Save all" onClick={handleSaveClick}>
              <SaveRounded />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel all">
            <IconButton className="ml-2" aria-label="Cancel all" onClick={handleCancelClick}>
              <CancelRounded />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Edit all">
          <IconButton className="ml-2" aria-label="Edit all" onClick={handleEditClick}>
            <EditRounded />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
