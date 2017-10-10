import { actionTypes } from "../config/actions";
import { parseJsonFromApi } from "../helpers/apiHelper";

export const accountReducer = (state = null, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
    case actionTypes.USER_INFO:
      return parseJsonFromApi(action.payload);
    default:
      return state;
  }
};
