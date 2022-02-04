import productsReducer from "./productsReducer";
import userReducer from "./userReducer";
import tokenReducer from "./tokenReducer";
import {combineReducers} from "redux";

const allReducers = combineReducers({
    products: productsReducer,
    user: userReducer,
    token: tokenReducer
});

export default allReducers;