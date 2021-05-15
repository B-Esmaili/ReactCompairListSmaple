import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/compair-list";
export default initialState => {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
};