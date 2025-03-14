import {Schema, model} from "mongoose";

import {USER_ROLE} from "../utils/constants.ts";

interface IUser {
  name: string;
  email: string;
  password: string;
  lastName: string;
  location: string;
  role: (typeof USER_ROLE)[keyof typeof USER_ROLE];
}

const userSchema = new Schema<IUser>({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  lastName: {
    type: String,
    default: "lastName",
  },
  location: {
    type: String,
    default: "my city",
  },
  role: {
    type: String,
    enum: Object.values(USER_ROLE),
    default: USER_ROLE.USER,
  },
});

const User = model<IUser>("User", userSchema);

export default User;
