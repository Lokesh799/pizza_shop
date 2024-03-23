import { combineReducers, createStore } from "redux";
import orderReducer from "../redux/reducers/pizzaReducer";

const rootReducer = combineReducers({
  order: orderReducer,
});

const store = createStore(rootReducer);

export default store;
