import { AddRounded } from '@mui/icons-material';
import { CriterionUIDto } from '@/presentation/dtos';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  rows: CriterionUIDto[];
  setRows: (newRows: CriterionUIDto[]) => void;
  setRowModesModel: (newModel: SetStateAction<GridRowModesModel>) => void;
};

export function CriteriaListToolbar({ rows, setRows, setRowModesModel }: Props) {
  const handleAddClick = () => {
    const id = uuidv4();

    setRows([...rows, { id, name: '', type: 'cost', isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <Box className="ml-auto">
      <Tooltip title="Add criteria">
        <IconButton className="ml-4" aria-label="Add criteria" onClick={handleAddClick}>
          <AddRounded />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
