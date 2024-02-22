import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { resetProducts } from "src/data/store/reducers/products";
import { useAppDispatch } from "src/data/store";
import { CreateProductInput, ProductType } from "src/data/types/generated";
import { useCreateProductMutation } from "src/data/api/graphql/mutations.generated";
import { ShoppingBagIcon } from "src/components/Icons";
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

export const ProductAdd = () => {
  const [createProduct, { isLoading, isSuccess }] = useCreateProductMutation();
  const dispatch = useAppDispatch();
  const gotTo = useNavigate();
  const {
    handleSubmit,
    register: registerField,
    formState: { errors: fieldErrors },
  } = useForm<CreateProductInput>();

  const onSubmit = async (newProduct: CreateProductInput) => {
    try {
      newProduct.quantity = Number(newProduct.quantity);
      newProduct.available = Number(newProduct.quantity);
      newProduct.points = Number(newProduct.points);
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
  }, [isLoading, isSuccess, dispatch, gotTo]);

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
                autoComplete="product-label"
                required
                fullWidth
                id="label"
                label=" Label"
                autoFocus
                {...registerField("label", { required: true })}
                error={Boolean(fieldErrors.label)}
                helperText={Boolean(fieldErrors.label) && "This field is required"}
              />
            </Grid>
            <Grid item xs={12} mt={2}>
              <FormControl error={Boolean(fieldErrors.type)} fullWidth>
                <InputLabel id="role-label">Type</InputLabel>
                <Select
                  id="type"
                  labelId="type-label"
                  fullWidth
                  {...registerField("type", { required: true })}
                >
                  {Object.values(ProductType).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
                {Boolean(fieldErrors.type) && (
                  <FormHelperText color={"danger"}>Must select a tye</FormHelperText>
                )}
              </FormControl>
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
