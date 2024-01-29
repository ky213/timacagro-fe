import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridValueGetterParams,
  GridInitialState,
  GridRowParams,
  GridPaginationModel,
} from "@mui/x-data-grid";

import { IRootState } from "src/data/store";
import { Pagination, User } from "src/data/types/generated";
import { useListUsersQuery } from "src/data/api/graphql/queries.generated";

export interface IDashboardProps {}

export const UsersPage = (props: IDashboardProps) => {
  const [pagination, setPagination] = useState<Pagination>({ page: 0, perPage: 10 });
  const gotTo = useNavigate();
  const { isLoading } = useListUsersQuery({
    page: pagination.page,
    perPage: pagination.perPage,
  });
  const users = useSelector((state: IRootState) => state.users.list);

  const columns: GridColDef[] = [
    {
      field: "First Name",
      valueGetter: (param: GridValueGetterParams<User>) => param.row?.firstName,
    },
    {
      field: "Last Name",
      valueGetter: (param: GridValueGetterParams<User>) => param.row?.lastName,
    },
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 300,
    },
    {
      field: "gender",
      headerName: "Gender",
    },
    {
      field: "nat",
      headerName: "Nationality",
    },
  ];

  const initialState: GridInitialState = {
    pagination: {
      paginationModel: pagination,
    },
  };

  const handlePaginate = ({ page, pageSize }: GridPaginationModel) => {
    setPagination({ page: page + 1, perPage: pageSize });
  };

  const handleRowClick = ({ row }: GridRowParams<User>) => {
    gotTo(`/dashboard/user/${row.id}`);
  };

  return (
    <Box mt={10} mx={1} overflow={"auto"}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={initialState}
        getRowId={(row) => row.email}
        loading={isLoading}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={handlePaginate}
        onRowClick={handleRowClick}
      />
    </Box>
  );
};
