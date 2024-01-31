import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridPaginationModel,
  GridEventListener,
} from "@mui/x-data-grid";

import { useAppSelector } from "src/data/store";
import { Pagination, User } from "src/data/types/generated";
import { useListUsersQuery } from "src/data/api/graphql/queries.generated";
import { useUpdateUserMutation } from "src/data/api/graphql/mutations.generated";
import { resetUsers } from "src/data/store/reducers/users";
import { Roles } from "src/config/constants";
import { FullFeaturedCrudGrid } from "src/components";

export interface IDashboardProps {}

export const UsersPage = (props: IDashboardProps) => {
  const { list: users } = useAppSelector((state) => state.users);
  const [pagination, setPagination] = useState<Pagination>({ page: 0, perPage: 10 });
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const { refetch } = useListUsersQuery({
    page: pagination.page,
    perPage: pagination.perPage,
  });

  useEffect(() => {
    return () => {
      dispatch(resetUsers());
    };
  }, []);

  //TODO: set field validation on cell edit

  const columns: GridColDef<User>[] = [
    {
      field: "firstName",
      headerName: "First Name",
      editable: true,
      type: "string",
      // preProcessEditCellProps: (params: GridPreProcessEditCellProps) => ({
      //   ...params.props,
      //   error: true,
      // }),
    },
    {
      field: "lastName",
      headerName: "Last Name",
      editable: true,
      type: "string",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
      type: "string",
    },
    {
      field: "role",
      headerName: "Role",
      type: "singleSelect",
      valueOptions: Roles,
      editable: true,
    },
    {
      field: "region",
      headerName: "Region",
      type: "singleSelect",
    },
    {
      field: "active",
      headerName: "Active",
      type: "boolean",
    },
    {
      field: "emailConfirmed",
      headerName: "Email Confirmed",
      type: "boolean",
    },
    {
      field: "currentPoints",
      headerName: "Current Points",
      type: "number",
    },
    {
      field: "targetPoint",
      headerName: "Target Points",
      type: "number",
    },
    {
      field: "createdAt",
      headerName: "Created In",
      type: "dateTime",
      valueGetter: ({ value }) => new Date(`${value}`),
      flex: 1,
    },
  ];

  const handlePaginate = ({ page, pageSize }: GridPaginationModel) => {
    setPagination({ page: page, perPage: pageSize });
  };

  const handleEdit: GridEventListener<"cellEditStop"> = (
    { id, field, value },
    { target }: any //TODO: fix type
  ) => {
    if (target && target.value != value)
      updateUser({ updateUserId: `${id}`, userInfo: { [field]: target.value } });
  };

  return (
    <Box mt={10} mx={1} overflow={"auto"}>
      {/* //TODO: to be changed with the fully featured data grid */}
      <DataGrid
        rows={users}
        columns={columns}
        getRowId={(row) => row.id}
        loading={isLoading}
        pageSizeOptions={[10, 20, 50]}
        onPaginationModelChange={handlePaginate}
        onCellEditStop={handleEdit}
        sx={{
          boxShadow: 2,
          border: 2,
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
        }}
      />
    </Box>
  );
};
