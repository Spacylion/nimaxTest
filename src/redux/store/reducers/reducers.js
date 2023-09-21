import initialState from "./initialState";

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SAVE_STEP1_FORM_DATA":
            return {
                ...state,
                step1: {
                    ...state.step1,
                    formData: action.payload,
                },
            };
        case "SAVE_STEP2_FORM_DATA":
            return {
                ...state,
                step2: {
                    ...state.step2,
                    formData: action.payload,
                },
            };
        default:
            return state;
    }
};

export default rootReducer;
