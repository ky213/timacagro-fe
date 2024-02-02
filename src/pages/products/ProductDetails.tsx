import { useCallback } from "react";
import { Unstable_Grid2 as Grid } from "@mui/material";
import { useAppSelector } from "src/data/store";
import { useParams } from "react-router-dom";
import { useGetProductQuery } from "src/data/api/graphql/queries.generated";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Divider,
  FormLabel,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "src/components";

export const ProductDetails = () => {
  const params = useParams<string>();
  const { currentProduct } = useAppSelector((state) => state.products);
  const { isLoading, isSuccess } = useGetProductQuery({ getProductId: `${params.id}` });
  const available =
    ((currentProduct?.available || 0) / (currentProduct?.quantity || 1)) * 100;
  const handleChange = useCallback((evenst: any) => {}, []);

  const handleSubmit = useCallback((event: { preventDefault: () => void }) => {
    event.preventDefault();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack spacing={3}>
        <div>
          <Typography variant="h4">Product</Typography>
        </div>
        <div>
          <Grid container spacing={3}>
            <Grid xs={12} md={6} lg={4}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <Avatar
                      src={`/product-${currentProduct?.type}.jpg`}
                      sx={{
                        height: 80,
                        mb: 2,
                        width: 80,
                      }}
                    />
                    <Typography gutterBottom variant="h5">
                      {currentProduct?.type}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {"Algiers"} {"Algeria"}
                    </Typography>
                    <Typography color="text.secondary" variant="body2">
                      {"GMT+1"}
                    </Typography>
                  </Box>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button fullWidth variant="text">
                    Upload picture
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid xs={12} md={6} lg={8}>
              <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Card>
                  <CardHeader subheader="The information can be edited" title="Profile" />
                  <CardContent sx={{ pt: 0 }}>
                    <Box sx={{ m: -1.5 }}>
                      <Grid container spacing={3}>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            helperText="Please specify the first name"
                            label="First name"
                            name="firstName"
                            onChange={handleChange}
                            required
                            value={currentProduct?.type}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Amount in stock"
                            name="quantity"
                            type="number"
                            onChange={handleChange}
                            required
                            value={currentProduct?.quantity}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <TextField
                            fullWidth
                            label="Points per Tonne "
                            name="points"
                            type="number"
                            onChange={handleChange}
                            required
                            value={currentProduct?.points}
                          />
                        </Grid>
                        <Grid xs={12} md={6}>
                          <FormLabel>Available</FormLabel>
                          <br />
                          {available.toFixed(1)} %
                          <LinearProgress variant="determinate" value={available} />
                        </Grid>
                      </Grid>
                    </Box>
                  </CardContent>
                  <Divider />
                  <CardActions sx={{ justifyContent: "flex-end" }}>
                    <Button variant="contained">Save details</Button>
                    <Button variant="outlined" color="error">
                      Delete product
                    </Button>
                  </CardActions>
                </Card>
              </form>
            </Grid>
          </Grid>
        </div>
      </Stack>
    </Container>
  );
};
