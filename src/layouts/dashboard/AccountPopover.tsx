import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from "@mui/material";

export const AccountPopover = (props: { anchorEl: any; onClose: any; open: any }) => {
  const { anchorEl, onClose, open } = props;
  const gotTo = useNavigate();

  const handleSignOut = useCallback(() => {
    onClose?.();
    gotTo("/auth/login");
  }, [onClose, gotTo]);

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
        <Typography variant="overline">Account</Typography>
        <Typography color="text.secondary" variant="body2">
          Anika Visser
        </Typography>
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
