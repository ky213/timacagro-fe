import { Link } from "react-router-dom";
import { Box, ButtonBase } from "@mui/material";

import { SideMenuItem } from "./Config";

export const SideNavItem = (props: SideMenuItem) => {
  const { active = false, disabled, external, icon, path, title } = props;

  const linkProps = path
    ? external
      ? {
          component: "a",
          to: path,
          target: "_blank",
        }
      : {
          component: Link,
          to: path,
        }
    : {};

  return (
    <li>
      <ButtonBase
        sx={{
          alignItems: "center",
          borderRadius: 1,
          display: "flex",
          justifyContent: "flex-start",
          pl: "16px",
          pr: "16px",
          py: "6px",
          textAlign: "left",
          width: "100%",
          backgroundColor: active ? "rgba(255, 255, 255, 0.04)" : "",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.04)",
          },
        }}
        {...linkProps}
      >
        {icon && (
          <Box
            component="span"
            sx={{
              alignItems: "center",
              display: "inline-flex",
              justifyContent: "center",
              mr: 2,
              color: active ? "primary.main" : "neutral.400",
            }}
          >
            {icon}
          </Box>
        )}
        <Box
          component="span"
          sx={{
            color: active ? "common.white" : "neutral.400",
            flexGrow: 1,
            fontFamily: (theme) => theme.typography.fontFamily,
            fontSize: 14,
            fontWeight: 600,
            lineHeight: "24px",
            whiteSpace: "nowrap",
            ...(disabled && {
              color: "neutral.500",
            }),
          }}
        >
          {title}
        </Box>
      </ButtonBase>
    </li>
  );
};
