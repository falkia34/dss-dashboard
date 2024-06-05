import { AlternativeUIDto, CriterionUIDto } from '@/presentation/dtos';
import { AddRounded } from '@mui/icons-material';
import { Button } from '@mui/material';
import { GridRowModesModel, GridRowModes } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  rows: AlternativeUIDto[];
  criteria: CriterionUIDto[];
  setRows: (newRows: AlternativeUIDto[]) => void;
  setRowModesModel: (newModel: (oldModel: GridRowModesModel) => GridRowModesModel) => void;
};

export function AlternativesListToolbar({ rows, criteria, setRows, setRowModesModel }: Props) {
  const handleClick = () => {
    const id = uuidv4();

    setRows([
      ...rows,
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
