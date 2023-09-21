import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";
import { loadFormData } from "./localStorage";

const savedData = loadFormData();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: savedData,
});

export default store;