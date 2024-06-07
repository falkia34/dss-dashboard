import { Box, IconButton, Tooltip } from '@mui/material';
import { CancelRounded, EditRounded, SaveRounded } from '@mui/icons-material';
import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { SetStateAction } from 'react';
import { WPCriterionWeightUIDto } from '@/presentation/dtos';

type Props = {
  rows: WPCriterionWeightUIDto[];
  rowModesModel: GridRowModesModel;
  setRowModesModel: (newModel: SetStateAction<GridRowModesModel>) => void;
};

export function CriteriaWeightListToolbar({ rows, rowModesModel, setRowModesModel }: Props) {
  const isInEditMode = Object.values(rowModesModel).some(
    (rowMode) => rowMode.mode === GridRowModes.Edit,
  );

  const handleEditClick = () => {
    setRowModesModel(Object.fromEntries(rows.map((row) => [row.id, { mode: GridRowModes.Edit }])));
  };

  const handleSaveClick = () => {
    setRowModesModel(
      Object.fromEntries(
        Object.keys(rowModesModel).map((rowId) => [rowId, { mode: GridRowModes.View }]),
      ),
    );
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
  };

  return (
    <Box className="ml-auto">
      {isInEditMode ? (
        <>
          <Tooltip title="Save all">
            <IconButton className="ml-4" aria-label="Save all" onClick={handleSaveClick}>
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
          <IconButton className="ml-4" aria-label="Edit all" onClick={handleEditClick}>
            <EditRounded />
          </IconButton>
        </Tooltip>
      )}
    </Box>
  );
}
