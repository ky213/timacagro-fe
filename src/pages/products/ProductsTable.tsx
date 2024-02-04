import { format } from "date-fns";

import { getInitials } from "src/shared/utils";
import {
  Avatar,
  Box,
  Card,
  CheckBox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Scrollbar,
  RenderIf,
  LinearProgress,
} from "src/components";
import { Product } from "src/data/types/generated";
import { CheckIcon } from "src/components/Icons";
import { useNavigate } from "react-router-dom";
import { type } from "os";
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
                <TableCell>Quantity (Tonne)</TableCell>
                <TableCell>Available (%)</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Active</TableCell>
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
                    <TableCell>{product.quantity.toLocaleString()}</TableCell>
                    <TableCell>
                      {available.toFixed(1)} %
                      <LinearProgress variant="determinate" value={available} />
                    </TableCell>
                    <TableCell>{product.points.toLocaleString()}</TableCell>
                    <TableCell>
                      <RenderIf
                        isTrue={product.active}
                        component={<CheckIcon height={20} />}
                      />
                    </TableCell>
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
