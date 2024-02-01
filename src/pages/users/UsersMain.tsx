import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useAppSelector } from "src/data/store";
import { Pagination, User } from "src/data/types/generated";
import { useListUsersQuery } from "src/data/api/graphql/queries.generated";
import { useUpdateUserMutation } from "src/data/api/graphql/mutations.generated";
import { resetUsers } from "src/data/store/reducers/users";
import { Button, Container, Stack, Typography, Box } from "src/components";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  SvgIcon,
} from "src/components/Icons";
import { UsersTable } from "./UsersTable";
import { UsersSearch } from "./UsersSearch";
import { useSelection } from "src/shared/hooks/use-selection";

export interface IDashboardProps {}

const useUserIds = (users: User[]) => {
  return useMemo(() => {
    return users.map((user) => user.id);
  }, [users]);
};

export const UsersMainPage = (props: IDashboardProps) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { list } = useAppSelector((state) => state.users);
  const [pagination, setPagination] = useState<Pagination>({ page: 0, perPage: 10 });
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { refetch } = useListUsersQuery({
    page: pagination.page,
    perPage: pagination.perPage,
  });

  const usersIds = useUserIds(list.users);
  const customersSelection = useSelection(usersIds);

  useEffect(() => {
    return () => {
      dispatch(resetUsers());
    };
  }, []);

  const handlePageChange = useCallback(
    (_event: any, value: React.SetStateAction<number>) => {
      setPage(value);
    },
    []
  );

  const handleRowsPerPageChange = useCallback(
    (event: { target: { value: React.SetStateAction<number> } }) => {
      setRowsPerPage(event.target.value);
    },
    []
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Users</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                </Button>
                <Button
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowDownOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Export
                </Button>
              </Stack>
            </Stack>
            <div>
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="contained"
              >
                Add
              </Button>
            </div>
          </Stack>
          <UsersSearch />
          <UsersTable
            count={list.total}
            items={list.users}
            onDeselectAll={customersSelection.handleDeselectAll}
            onDeselectOne={customersSelection.handleDeselectOne}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            onSelectAll={customersSelection.handleSelectAll}
            onSelectOne={customersSelection.handleSelectOne}
            page={page}
            rowsPerPage={rowsPerPage}
            selected={customersSelection.selected}
          />
        </Stack>
      </Container>
    </Box>
  );
};
