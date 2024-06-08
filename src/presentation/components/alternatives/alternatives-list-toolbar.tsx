import { AddRounded } from '@mui/icons-material';
import { AlternativeUIDto, CriterionUIDto } from '@/presentation/dtos';
import { Box, IconButton, Tooltip } from '@mui/material';
import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  rows: AlternativeUIDto[];
  criteria: CriterionUIDto[];
  setRows: (newRows: AlternativeUIDto[]) => void;
  setRowModesModel: (newModel: SetStateAction<GridRowModesModel>) => void;
};

export function AlternativesListToolbar({ rows, criteria, setRows, setRowModesModel }: Props) {
  const handleAddClick = () => {
    const id = uuidv4();

    setRows([
      ...rows,
      {
        id,
        name: '',
        marks: Object.fromEntries(criteria.map((criterion) => [criterion.id, 0])),
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <Box className="ml-auto">
      <Tooltip title="Add alternative">
        <IconButton className="ml-4" aria-label="Add alternative" onClick={handleAddClick}>
          <AddRounded />
        </IconButton>
      </Tooltip>
      Add record
    </Box>
  );
}
