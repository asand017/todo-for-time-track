import React from "react";
import { AuthContext } from "../Contexts";

export const useAuth = () => {
  return React.useContext(AuthContext);
};
