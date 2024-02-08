import {
  ChartBarIcon,
  CogIcon,
  ShoppingBagIcon,
  UserIcon,
  UsersIcon,
  SvgIcon,
  CurrencyDollarIcon,
} from "src/components/Icons";
import { Role } from "src/data/types/generated";

export interface SideMenuItem {
  active?: boolean;
  disabled?: boolean;
  external?: boolean;
  icon: any;
  key?: string;
  path: string;
  title: string;
  role?: string[];
}

export const items: SideMenuItem[] = [
  {
    title: "Overview",
    path: "overview",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Users",
    path: "users",
    role: [Role.Admin, Role.Dr],
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
    title: "Invoices",
    path: "invoices",
    role: [Role.Admin, Role.Sales, Role.Commerce],
    icon: (
      <SvgIcon fontSize="small">
        <CurrencyDollarIcon />
      </SvgIcon>
    ),
  },
  // {
  //   title: "Regions",
  //   path: "regions",
  //   role: [Role.Admin, Role.Sales, Role.Commerce, Role.Dr],
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <MapIcon />
  //     </SvgIcon>
  //   ),
  // },
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
