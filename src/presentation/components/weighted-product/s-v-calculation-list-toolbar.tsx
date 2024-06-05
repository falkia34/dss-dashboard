import { SyncRounded } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  calculateRows: () => void;
};

export function SVCalculationListToolbar({ calculateRows }: Props) {
  const handleClick = () => calculateRows();

  return (
    <>
      <Button
        variant="outlined"
        className="ml-auto"
        startIcon={<SyncRounded />}
        onClick={handleClick}
      >
        Calculate
      </Button>
    </>
  );
}
