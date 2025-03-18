import {USER_ROLE} from "./utils/constants";

export interface User {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}
