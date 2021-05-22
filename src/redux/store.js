import { combineReducers, createStore, applyMiddleware } from "redux";
import { handleRequests } from "@redux-requests/core";
import { createDriver } from "@redux-requests/axios";
import axios from "../libs/axios";

const { requestsReducer, requestsMiddleware } = handleRequests({
  driver: createDriver(axios),
  cache: true,
});

const root = combineReducers({
  requests: requestsReducer,
});

export default createStore(root, applyMiddleware(...requestsMiddleware));
