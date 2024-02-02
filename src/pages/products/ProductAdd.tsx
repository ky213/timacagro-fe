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
} from "src/components";

import { createProduct, resetProducts } from "src/data/store/reducers/products";
import { IRootState, useAppDispatch, useAppSelector } from "src/data/store";
import { CreateProductInput, Product } from "src/data/types/generated";
import { useCreateProductMutation } from "src/data/api/graphql/mutations.generated";
import { ShoppingBagIcon } from "src/components/Icons";

export const ProductAdd = () => {
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors, touchedFields },
  } = useForm<CreateProductInput>();

  const onSubmit = async (newProduct: CreateProductInput) => {
    try {
      newProduct.active = true;
      createProduct({ productInfo: newProduct });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) gotTo(-1);

    return () => {
      dispatch(resetProducts());
    };
  }, [isLoading, isSuccess]);

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ p: 1, m: 1, bgcolor: "secondary.main" }}>
          <ShoppingBagIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create new product
        </Typography>
        <Box
          component="form"
          noValidate
          justifyContent={"center"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2} mt={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="product-type"
                required
                fullWidth
                id="type"
                label="Product type"
                autoFocus
                {...registerField("type", { required: true })}
                error={Boolean(fieldErrors.type)}
                helperText={Boolean(fieldErrors.type) && "This field is required"}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                type="number"
                id="quantity"
                label="Quantity (in Tonnes)"
                autoComplete="quantity"
                {...registerField("quantity", { required: true })}
                error={Boolean(fieldErrors.quantity)}
                helperText={Boolean(fieldErrors.quantity) && "Quantity required"}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="number"
                id="points"
                label="Points (per Tonne)"
                {...registerField("points", { required: true })}
                error={Boolean(fieldErrors.points)}
                helperText={Boolean(fieldErrors.points) && "Points are required"}
              />
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
