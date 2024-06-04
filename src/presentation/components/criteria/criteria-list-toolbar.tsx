import { Criterion } from '@/domain/entities';
import { AddRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRowsProp, GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  setRows: (
    newRows: (
      oldRows: GridRowsProp<Criterion & { isNew: boolean }>,
    ) => GridRowsProp<Criterion & { isNew: boolean }>,
  ) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
};

export function CriteriaListToolbar({ setRows, setRowModesModel }: Props) {
  const handleClick = () => {
    const id = uuidv4();

    setRows((oldRows) => [...oldRows, { id, name: '', type: 'cost', isNew: true }]);
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
