import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Stack,
  Typography,
} from "src/components";

import { useAppSelector } from "src/data/store";
import { useLogoutMutation } from "src/data/api/graphql/mutations.generated";

export const AccountPopover = (props: { anchorEl: any; onClose: any; open: any }) => {
  const { anchorEl, onClose, open } = props;
  const gotTo = useNavigate();
  const user = useAppSelector((state) => state.global.session);
  const [logout, { isLoading, isSuccess }] = useLogoutMutation();

  const handleSignOut = () => {
    logout();
  };

  useEffect(() => {
    if (!isLoading && isSuccess) gotTo("/");
  }, [isLoading, isSuccess]);

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Button
          onClick={() => gotTo(`/dashboard/users/${user?.id}`)}
          fullWidth
          sx={{ textAlign: "left" }}
        >
          <Stack direction={"column"}>
            <Typography variant="overline">Account</Typography>
            <Typography color="text.secondary" variant="body2">
              {`${user?.firstName} ${user?.lastName}`}
            </Typography>
          </Stack>
        </Button>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
      </MenuList>
    </Popover>
  );
};
