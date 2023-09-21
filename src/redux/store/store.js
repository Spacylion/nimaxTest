import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducers";
import { loadFormData } from "./localStorage";

const savedData = loadFormData();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: savedData, // Ensure savedData is correctly loaded from local storage
});

export default store;
