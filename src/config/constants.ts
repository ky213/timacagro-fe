import { Role } from "src/data/types/generated";

export const USERS_API_URL = process.env.REACT_APP_USERS_API_URL;

export const EMAIL_REG_EXR = /^\S+@\S+\.\S+$/g;
export const PHONE_REG_EXR = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g;

export const Roles = ["ADMIN", "ATC", "COMMERCE", "SALES"];
