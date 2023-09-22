import { configureStore } from "@reduxjs/toolkit";
import { loadFormData } from "@/services/localStorageService";
import rootReducer from "./reducers/rootReducer";
import combinedInitialState from "./initialState/intinalState";

const savedData = loadFormData() || combinedInitialState;

const store = configureStore({
    reducer: rootReducer,
    preloadedState: savedData,
});

export default store;
