import { Alternative, Criterion } from '@/domain/entities';
import { AddRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRowsProp, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<Alternative & { isNew: boolean }>,
    ) => GridRowsProp<Alternative & { isNew: boolean }>,
  ) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
  criteria: Criterion[];
};

export function AlternativesListToolbar({ setRows, setRowModesModel, criteria }: Props) {
  const handleClick = () => {
    const id = uuidv4();

    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        name: '',
        marks: Object.fromEntries(criteria.map((criterion) => [criterion.name.toLowerCase(), 0])),
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
    }));
  };

  return (
    <>
      <Button
        variant="outlined"
        className="ml-auto"
        startIcon={<AddRounded />}
        onClick={handleClick}
      >
        Add record
      </Button>
    </>
  );
}
