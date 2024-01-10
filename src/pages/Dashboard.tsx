import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams, GridInitialState, GridRowParams } from "@mui/x-data-grid";

import { IRootState } from "src/data/store";
import { useGetUsersQuery } from "src/data/api";
import { IPagination, IUser } from "src/data/types";

export interface IDashboardProps {}

const Dashboard = (props: IDashboardProps) => {
  const [pagination, setPagination] = useState<IPagination>({ page: 0, pageSize: 10 });
  const gotTo = useNavigate();
  const { isLoading } = useGetUsersQuery(pagination);
  const users = useSelector((state: IRootState) => state.users.list);

  const columns: GridColDef[] = [
    {
      field: "First Name",
      valueGetter: (param: GridValueGetterParams<IUser>) => param.row?.name.first,
    },
    {
      field: "Last Name",
      valueGetter: (param: GridValueGetterParams<IUser>) => param.row?.name.last,
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

  const handlePaginate = ({ page, pageSize }: IPagination) => {
    setPagination({ page: page + 1, pageSize });
  };

  const handleRowClick = ({ row }: GridRowParams<IUser>) => {
    gotTo(`/dashboard/user/${row.id.value}`);
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

export default Dashboard;
