import {
  ChartBarIcon,
  CogIcon,
  LockClosedIcon,
  MapIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
  SvgIcon,
} from "src/components/Icons";

export interface SideMenuItem {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon: any;
  key?: string;
  path: string;
  title: string;
}

export const items: SideMenuItem[] = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Users",
    path: "users",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Products",
    path: "products",
    icon: (
      <SvgIcon fontSize="small">
        <ShoppingBagIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Clients",
    path: "clients",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Regions",
    path: "regions",
    icon: (
      <SvgIcon fontSize="small">
        <MapIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
