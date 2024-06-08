import { Box, Container, Toolbar, Typography } from '@mui/material';

export function Methods() {
  return (
    <Box component="section" className="w-full px-6 mt-5">
      <Container
        maxWidth={false}
        sx={{ bgcolor: 'surface.main' }}
        className="w-full p-4 rounded-2xl"
      >
        <Toolbar className="min-h-[2.5rem] h-auto p-0 mb-4">
          <Typography variant="h6" component="h2" className="font-medium">
            Methods
          </Typography>
        </Toolbar>
        <Typography variant="body2" component="p" className="text-justify">
          Decision Support Systems (DSS) use a variety of methods to assist in decision-making, each
          suitable for different types of problems and contexts.
        </Typography>
        <Typography variant="body1" component="h3" className="my-3">
          Weighted Product
        </Typography>
        <Typography variant="body2" component="p" className="text-justify">
          The Weighted Product (WP) method is a multi-criteria decision-making technique that
          evaluates alternatives based on their weighted performance across multiple criteria. It
          calculates a preference value for each alternative by multiplying the performance of each
          criterion by its corresponding weight and summing the results. The alternative with the
          highest preference value is considered the best choice. This method is especially useful
          in contexts where decisions have to be made based on a variety of different factors, each
          with its own level of importance. Here are some of the main reasons why the WP method is
          often used:
          <ul className="my-1 text-left">
            <li>
              Simplicity in implementation because it uses basic mathematical operations that are
              easy to understand and apply.
            </li>
            <li>
              Flexibility makes the calculation method applicable in various fields and allows
              adjustments to criteria and weights as needed.
            </li>
            <li>
              Provides calculation results based on weights to help produce more accurate and
              optimal decisions.
            </li>
            <li>
              Effective in handling decisions involving multiple criteria with different importance.
            </li>
          </ul>
        </Typography>
      </Container>
    </Box>
  );
}
