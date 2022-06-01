import { combineReducers } from "redux";

import { MyCombineFunds } from "./reducers/index";

export default combineReducers({ ...MyCombineFunds });
