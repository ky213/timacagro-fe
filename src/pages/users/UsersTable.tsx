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
import { User } from "src/data/types/generated";
import { CheckIcon } from "src/components/Icons";
import { useNavigate } from "react-router-dom";
import { type } from "os";
//TODO: set props type
export const UsersTable = (props: any) => {
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
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Progress</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>Joined</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((user: User) => {
                const createdAt = format(user.createdAt, "dd/MM/yyyy");
                const progress =
                  ((user.currentPoints || 0) / (user.targetPoints || 1)) * 100;

                return (
                  <TableRow
                    hover
                    key={user.id}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => goTo(`${user.id}`)}
                  >
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
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <LinearProgress variant="determinate" value={progress} />
                      {progress.toFixed(1)} %
                    </TableCell>
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
