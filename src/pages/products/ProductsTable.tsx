import { format } from "date-fns";

import {
  Avatar,
  Box,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Scrollbar,
  LinearProgress,
} from "src/components";
import { Product } from "src/data/types/generated";
import { useNavigate } from "react-router-dom";

//TODO: set props type
export const ProductsTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onPageChange = () => {},
    onRowsPerPageChange,
    page = 0,
    rowsPerPage = 0,
  } = props;

  const goTo = useNavigate();

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Label</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Available (Tonne)</TableCell>
                <TableCell>Available (%)</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Added in</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((product: Product) => {
                const createdAt = format(product.createdAt, "dd/MM/yyyy");
                const available = 100 - (product.available / product.quantity) * 100;

                return (
                  <TableRow
                    hover
                    key={product.id}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => goTo(`${product.id}`)}
                  >
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={`/product-${product.type}.jpg`} />
                        <Typography variant="subtitle2">{product.label}</Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{product.type}</TableCell>
                    <TableCell>{product.available.toLocaleString()}</TableCell>
                    <TableCell>
                      {available.toFixed(1)} %
                      <LinearProgress variant="determinate" value={available} />
                    </TableCell>
                    <TableCell>{product.points.toLocaleString()}</TableCell>
                    <TableCell>{createdAt}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={count}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
