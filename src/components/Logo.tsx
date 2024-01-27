import { useTheme } from "@mui/material/styles";

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.main;

  return (
    <img
      src={"./timacagro_logo.svg"}
      alt="logo"
      style={{ height: "50px", filter: "brightness(0) invert(1)" }}
    />
  );
};
