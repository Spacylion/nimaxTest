const initialState = {
    step1: {
        formData: {
            adults: 0, // Number of adults
            child: 0, // Number of children (5-12 years old)
            baby: 0, // Number of babies (under 5 years old)
            roomType: "Эконом", // Type of room (initially set to "Эконом")
            nights: 1, // Number of nights (initially set to 1)
            insurance: false, // Whether insurance is selected (initially set to false)
            total: "0.00 ₽", // Total cost (initially set to "0.00 ₽")
        },
    },
    step2: {
        formData: {
            lastName: "", // Last name of the customer
            firstName: "", // First name of the customer
            middleName: "", // Middle name of the customer
            phoneNumber: "", // Phone number of the customer
            birthDate: "", // Date of birth of the customer
        },
    },
};

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
