import React, { useEffect, useState } from "react";
import { LockOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Grid,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  RenderIf,
  Stack,
} from "src/components";

import { createProduct, resetProducts } from "src/data/store/reducers/products";
import { IRootState, useAppDispatch, useAppSelector } from "src/data/store";
import { CreateProductInput, Product, ProductType } from "src/data/types/generated";
import {
  useCreateProductMutation,
  useImportProductsMutation,
} from "src/data/api/graphql/mutations.generated";
import { ShoppingBagIcon, ShoppingCartIcon } from "src/components/Icons";
import { useListProductsQuery } from "src/data/api/graphql/queries.generated";
import { SelectChangeEvent } from "@mui/material/Select/SelectInput";
import { resetGlobalState } from "src/data/store/reducers/global";

export const clients = [
  {
    name: "",
  },
  {
    name: "Client One",
  },
  {
    name: "Client Two",
  },
  {
    name: "Client Three",
  },
];

export const ProductsOrderPage = () => {
  const data = useListProductsQuery({ page: 0, perPage: 1000 });
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const [selectedProducts, setSelectedProduct] = useState<number[]>([]);
  const [importProducts, { isLoading, isSuccess }] = useImportProductsMutation();

  const {
    list: { products },
  } = useAppSelector((state) => state.products);
  const { loading, success } = useAppSelector((state) => state.global);
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors },
    setError,
    clearErrors,
  } = useForm();

  useEffect(() => {
    if (!isLoading && isSuccess) gotTo(-1);

    return () => {
      dispatch(resetProducts());
      dispatch(resetGlobalState({}));
    };
  }, [isLoading, isSuccess]);

  const onSubmit = async (order: any) => {
    try {
      if (selectedProducts.length === 0) {
        setError("product", { message: "Must select a product" });
        return;
      }
      let userPoints = 0;
      const orderedProducts = products
        .filter(({ id }) => order[id])
        .map((product) => {
          const newProduct = {
            ...product,
            available: product.available - order[product.id],
          };

          const { id, createdAt, updatedAt, ...rest } = newProduct;

          userPoints += product.points * order[product.id];

          return rest;
        });

      importProducts({ productsList: { products: orderedProducts }, userPoints });
    } catch (error) {
      console.log(error);
    }
  };

  //TODO:to be refactored
  const handleProductSelect = (event: SelectChangeEvent<typeof selectedProducts>) => {
    const {
      target: { value },
    } = event;
    if (typeof value !== "string") {
      setSelectedProduct(value);
      clearErrors(["product"]);
    }
  };

  return (
    <Container component="main">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ p: 1, m: 1, bgcolor: "secondary.main" }}>
          <ShoppingCartIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Order products for a client
        </Typography>
        <Box
          component="form"
          noValidate
          justifyContent={"center"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <Grid container m={"auto"} xs={6} spacing={2} mt={1}>
            <Grid item xs={12} mt={2}>
              <FormControl error={Boolean(fieldErrors.client)} fullWidth>
                <InputLabel id="role-label">Client</InputLabel>
                <Select
                  id="client"
                  labelId="client-label"
                  fullWidth
                  {...registerField("client", { required: true })}
                >
                  {clients.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(fieldErrors.client) && (
                  <FormHelperText color={"danger"}>Must select a client</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
              <FormControl error={Boolean(fieldErrors.product)} fullWidth>
                <InputLabel id="product-label">Product</InputLabel>
                <Select
                  id="product"
                  labelId="product-label"
                  value={selectedProducts}
                  onChange={handleProductSelect}
                  fullWidth
                  multiple
                >
                  {products.map(({ id, label, available }) => (
                    <MenuItem key={id} value={id} disabled={available <= 0}>
                      {label} - <strong> {available.toLocaleString()} tonne</strong>
                    </MenuItem>
                  ))}
                </Select>
                <RenderIf
                  isTrue={Boolean(fieldErrors["product"])}
                  component={
                    <FormHelperText color={"danger"}>Select a product</FormHelperText>
                  }
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              {products.map(({ id, label, available }) => {
                if (selectedProducts.includes(id))
                  return (
                    <Grid container xs={12} alignItems={"center"} spacing={1} mb={1}>
                      <Grid item xs={6} mt={1}>
                        <Typography variant="h6">{label}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          id="quantity"
                          label="Quantity (Tonne)"
                          error={Boolean(fieldErrors[`${id}`])}
                          {...registerField(`${id}`, {
                            valueAsNumber: true,
                            required: true,
                            max: available,
                            min: 1,
                          })}
                        />
                        <RenderIf
                          isTrue={Boolean(fieldErrors[id])}
                          component={
                            <FormHelperText color="danger">
                              exceeded available quantity
                            </FormHelperText>
                          }
                        />
                      </Grid>
                    </Grid>
                  );
              })}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Boolean(loading)}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
