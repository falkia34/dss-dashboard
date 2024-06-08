import { Box, Container, Toolbar, Typography } from '@mui/material';

export function About() {
  return (
    <Box component="section" className="w-full px-6">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography variant="h6" component="h2" className="font-medium">
            About
          </Typography>
        </Toolbar>
        <Typography variant="body2" component="p" className="text-justify	">
          A Decision Support System (DSS) is a computer-based tool that aids decision-making
          processes by collecting, processing, and analyzing data to generate useful information. It
          integrates various sources of data, including databases, spreadsheets, and other
          informational resources, and applies analytical models and methods to facilitate
          decision-making. DSS are designed to support a wide range of business and organizational
          decision-making activities, from operational decisions to strategic planning. It help
          users evaluate different scenarios, predict outcomes, and make more informed, data-driven
          choices, thereby enhancing efficiency and effectiveness in problem-solving and planning.
        </Typography>
      </Container>
    </Box>
  );
}
