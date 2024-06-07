import { Box, IconButton, Tooltip } from '@mui/material';
import { SyncRounded } from '@mui/icons-material';

type Props = {
  calculateRows: () => void;
};

export function SVCalculationListToolbar({ calculateRows }: Props) {
  const handleClick = () => calculateRows();

  return (
    <Box className="ml-auto">
      <Tooltip title="Calculate">
        <IconButton className="ml-2" aria-label="Calculate" onClick={handleClick}>
          <SyncRounded />
        </IconButton>
      </Tooltip>
    </Box>
  );
}
