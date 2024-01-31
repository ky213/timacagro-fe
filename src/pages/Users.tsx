import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridInitialState,
  GridPaginationModel,
  GridCellParams,
  GridEventListener,
} from "@mui/x-data-grid";

import { useAppSelector } from "src/data/store";
import { Pagination, User } from "src/data/types/generated";
import { useListUsersQuery } from "src/data/api/graphql/queries.generated";
import { useUpdateUserMutation } from "src/data/api/graphql/mutations.generated";

export interface IDashboardProps {}

export const UsersPage = (props: IDashboardProps) => {
  const { list: users } = useAppSelector((state) => state.users);
  const [pagination, setPagination] = useState<Pagination>({ page: 0, perPage: 10 });
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const data = useListUsersQuery({
    page: pagination.page,
    perPage: pagination.perPage,
  });

  const columns: GridColDef<User>[] = [
    {
      field: "firstName",
      headerName: "First Name",
      editable: true,
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "role",
      headerName: "Role",
    },
    {
      field: "region",
      headerName: "Region",
    },
    {
      field: "active",
      headerName: "Active",
    },
    {
      field: "emailConfirmed",
      headerName: "Email Confirmed",
      editable: true,
    },
    {
      field: "currentPoints",
      headerName: "Current Points",
    },
    {
      field: "targetPoint",
      headerName: "Target Points",
    },
    {
      field: "createdAt",
      headerName: "Created In",
      flex: 1,
    },
  ];

  const initialState: GridInitialState = {
    pagination: {
      paginationModel: pagination,
    },
  };

  const handlePaginate = ({ page, pageSize }: GridPaginationModel) => {
    setPagination({ page: page, perPage: pageSize });
  };

  const handleEdit: GridEventListener<"cellEditStop"> = (
    { id, value, field, ...rest }: GridCellParams<User>,
    event: any
  ) => {
    if (value !== event.target.value)
      updateUser({ updateUserId: `${id}`, userInfo: { [field]: event.target.value } });
  };

  return (
    <Box mt={10} mx={1} overflow={"auto"}>
      <DataGrid
        rows={users}
        columns={columns}
        initialState={initialState}
        getRowId={(row) => row.id}
        loading={isLoading}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={handlePaginate}
        onCellEditStop={handleEdit}
      />
    </Box>
  );
};
