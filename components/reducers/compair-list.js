import { actionTypes } from "../actions/action-type";

 

export default (state = [], action) => {
  debugger
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_COMPAIRLIST:      
      return {
        ...state,
        compairList : [...state.compairList , action.product]    
      }
    case actionTypes.REMOVE_PRODUCT_FROM_COMPAIRLIST:      
      return {
        ...state,
        compairList : state.compairList.filter(p=>p.id !== action.id)   
      }
    default:
      return state;
  }
};


