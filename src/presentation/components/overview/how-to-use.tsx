import { Box, Container, Toolbar, Typography } from '@mui/material';

export function HowToUse() {
  return (
    <Box component="section" className="w-full px-6 mt-5">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography variant="h6" component="h2" className="font-medium">
            How to Use
          </Typography>
        </Toolbar>
        <Typography variant="body2" component="p" className="text-justify">
          To use this tool, follow these steps:
          <ol className="my-1 text-left">
            <li>
              Select the <i>Criteria</i> menu.
            </li>
            <li>Add new criteria.</li>
            <li>
              Enter the name of the criteria, and determine the type (benefit or cost), then press
              save.
            </li>
            <li>
              Select the <i>Alternatives</i> menu.
            </li>
            <li>Add new alternatives that you want to compare.</li>
            <li>Fill in each criterion value for each alternative, then press save</li>
            <li>
              Select the <i>Analysis</i> menu, then select <i>Weighted Product</i>.
            </li>
            <li>
              Press the pencil icon and fill in the weight for each criterion, then press save.
            </li>
            <li>
              Scroll down until you find the <i>S-Vector and V-Vector Calculation</i> section.
            </li>
            <li>Select the calculate icon on the right to do the calculation.</li>
            <li>The ranking results are sorted from highest to lowest V-Vector value.</li>
            <li>
              There are conclusions from the calculation result, based on the highest V-Vector.
            </li>
          </ol>
        </Typography>
      </Container>
    </Box>
  );
}
