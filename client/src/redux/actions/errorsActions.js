import { GET_ERRORS } from "./types";

export const returnErrors = (errors, status) => {
  return {
    type: GET_ERRORS,
    payload: { errors, status },
  };
};
