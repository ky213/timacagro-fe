import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAppSelector } from "src/data/store";
import { User } from "src/data/types/generated";
import { useListUsersQuery } from "src/data/api/graphql/queries.generated";
import { resetUsers } from "src/data/store/reducers/users";
import { Button, Container, Stack, Typography, Box } from "src/components";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  PlusIcon,
  SvgIcon,
} from "src/components/Icons";
import { UsersTable } from "./UsersTable";
import { UsersSearch } from "./UsersSearch";
import { useSelection } from "src/shared/hooks/use-selection";

export interface IDashboardProps {}

export const UsersMainPage = (props: IDashboardProps) => {
  const [page, setPage] = useState(0);
  const [perPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const { list } = useAppSelector((state) => state.users);
  const data = useListUsersQuery({
    page,
    perPage,
  });

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
                onClick={() => goTo("add")}
              >
                Add
              </Button>
            </div>
          </Stack>
          <UsersSearch />
          <UsersTable
            count={list.total}
            items={list.users}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
            page={page}
            rowsPerPage={perPage}
          />
        </Stack>
      </Container>
    </Box>
  );
};
