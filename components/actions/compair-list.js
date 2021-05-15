import { actionTypes } from "./action-type";

export const addProductToCompairList = product => {
  return {
    type: actionTypes.ADD_PRODUCT_TO_COMPAIRLIST,
    product
  };
}; 


export const removeFromCompairList = id => {
  return {
    type: actionTypes.REMOVE_PRODUCT_FROM_COMPAIRLIST,
    id
  };
}; 
