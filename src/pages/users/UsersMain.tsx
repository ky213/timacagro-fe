import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useListUsersQuery } from "src/data/api/graphql/queries.generated";
import { resetUsers } from "src/data/store/reducers/users";
import { Button, Container, Stack, Typography, Box } from "src/components";
import { PlusIcon, SvgIcon } from "src/components/Icons";
import { UsersTable } from "./UsersTable";
import { UsersSearch } from "./UsersSearch";

export interface IDashboardProps {}

export const UsersMainPage = (props: IDashboardProps) => {
  const [page, setPage] = useState(0);
  const [perPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const goTo = useNavigate();

  useListUsersQuery({
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
      }}
    >
      <Container maxWidth="xl">
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h5">Users</Typography>
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
