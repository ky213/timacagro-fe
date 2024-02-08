import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { useAppSelector } from "src/data/store";
import { CreateProductInput } from "src/data/types/generated";
import { useListProductsQuery } from "src/data/api/enhanced";
import { resetProducts } from "src/data/store/reducers/products";
import { Button, Container, Stack, Typography, Box } from "src/components";
import {
  ArrowDownOnSquareIcon,
  ArrowUpOnSquareIcon,
  PlusIcon,
  ShoppingCartIcon,
  SvgIcon,
} from "src/components/Icons";
import { ProductsTable } from "./ProductsTable";
import { ProductsSearch } from "./ProductSearch";
import { readFile } from "src/shared/utils/files";
import { useImportProductsMutation } from "src/data/api/graphql/mutations.generated";

export interface IDashboardProps {}

export const ProductsMainPage = (props: IDashboardProps) => {
  const [page, setPage] = useState(0);
  const [perPage, setRowsPerPage] = useState(5);
  const dispatch = useDispatch();
  const goTo = useNavigate();
  const { list } = useAppSelector((state) => state.products);
  const [importProducts, { isLoading, isSuccess }] = useImportProductsMutation();
  const { refetch } = useListProductsQuery({
    page,
    perPage,
  });

  useEffect(() => {
    if (!isLoading && isSuccess) refetch();

    return () => {
      dispatch(resetProducts());
    };
  }, [isLoading, isSuccess, dispatch, refetch]);

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

  const handleImport = async ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    if (target.files?.length) {
      const products: CreateProductInput[] = readFile(
        await target.files[0].arrayBuffer()
      );

      importProducts({ productsList: { products } });
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
        pt: 0,
      }}
    >
      {" "}
      <Container maxWidth="xl" sx={{ mt: 0, pt: 0 }}>
        <Stack spacing={3}>
          <Stack direction="row" justifyContent="space-between" spacing={4}>
            <Stack spacing={1}>
              <Typography variant="h4">Products</Typography>
              <Stack alignItems="center" direction="row" spacing={1}>
                <br />
                <Button
                  component="label"
                  color="inherit"
                  startIcon={
                    <SvgIcon fontSize="small">
                      <ArrowUpOnSquareIcon />
                    </SvgIcon>
                  }
                >
                  Import
                  <input
                    type="file"
                    accept=".xlsx, .csv"
                    hidden
                    onChange={handleImport}
                  />
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
                    <ShoppingCartIcon />
                  </SvgIcon>
                }
                variant="contained"
                onClick={() => goTo("order")}
              >
                order
              </Button>{" "}
              <Button
                startIcon={
                  <SvgIcon fontSize="small">
                    <PlusIcon />
                  </SvgIcon>
                }
                variant="text"
                onClick={() => goTo("add")}
              >
                Add
              </Button>
            </div>
          </Stack>
          <ProductsSearch />
          <ProductsTable
            count={list.total}
            items={list.products}
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
