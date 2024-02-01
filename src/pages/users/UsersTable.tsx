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
} from "src/components";
import { User } from "src/data/types/generated";
import { CheckIcon } from "src/components/Icons";

export const UsersTable = (props: any) => {
  const {
    count = 0,
    items = [],
    onDeselectAll,
    onDeselectOne,
    onPageChange = () => {},
    onRowsPerPageChange,
    onSelectAll,
    onSelectOne,
    page = 0,
    rowsPerPage = 0,
    selected = [],
  } = props;

  const selectedSome = selected.length > 0 && selected.length < items.length;
  const selectedAll = items.length > 0 && selected.length === items.length;

  return (
    <Card>
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <CheckBox
                    checked={selectedAll}
                    indeterminate={selectedSome}
                    onChange={(event) => {
                      if (event.target.checked) {
                        onSelectAll?.();
                      } else {
                        onDeselectAll?.();
                      }
                    }}
                  />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user: User) => {
                const isSelected = selected.includes(user.id);
                const createdAt = format(user.createdAt, "dd/MM/yyyy");

                return (
                  <TableRow hover key={user.id} selected={isSelected}>
                    <TableCell padding="checkbox">
                      <CheckBox
                        checked={isSelected}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onSelectOne?.(user.id);
                          } else {
                            onDeselectOne?.(user.id);
                          }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack alignItems="center" direction="row" spacing={2}>
                        <Avatar src={"/default-man-avatar.png"}>
                          {getInitials(user.firstName + " " + user.lastName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {user.firstName + " " + user.lastName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <RenderIf
                        isTrue={user.active}
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
