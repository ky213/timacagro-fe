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
} from "src/components";

import { createProduct, resetProducts } from "src/data/store/reducers/products";
import { IRootState, useAppDispatch, useAppSelector } from "src/data/store";
import { CreateProductInput, Product, ProductType } from "src/data/types/generated";
import { useCreateProductMutation } from "src/data/api/graphql/mutations.generated";
import { ShoppingBagIcon, ShoppingCartIcon } from "src/components/Icons";
import { useListProductsQuery } from "src/data/api/graphql/queries.generated";

export const clients = [
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
  const {
    list: { products },
  } = useAppSelector((state) => state.products);
  const { isLoading, isSuccess } = useListProductsQuery({ page: 0, perPage: 1000 });
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm();

  const onSubmit = async (order: any) => {
    try {
    } catch (error) {
      console.log(error);
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
              <FormControl error={Boolean(fieldErrors.type)} fullWidth>
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
                {Boolean(fieldErrors.type) && (
                  <FormHelperText color={"danger"}>Must select a tye</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} mt={2}>
              <FormControl error={Boolean(fieldErrors.type)} fullWidth>
                <InputLabel id="role-label">Product</InputLabel>
                <Select
                  id="product"
                  labelId="product-label"
                  fullWidth
                  {...registerField("product", { required: true })}
                >
                  {products.map(({ label, available }) => (
                    <MenuItem key={label} value={label}>
                      {label} - instock: {available.toLocaleString()} tonne
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(fieldErrors.type) && (
                  <FormHelperText color={"danger"}>Must select a product</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={Boolean(isLoading)}
            >
              Submit
            </Button>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
