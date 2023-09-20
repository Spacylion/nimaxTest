import { configureStore } from "@reduxjs/toolkit";
import step1Reducer from "./reducers/step1Slice"; // Correct import path

const store = configureStore({
    reducer: {
        step1: step1Reducer,
    },
});

export default store;
