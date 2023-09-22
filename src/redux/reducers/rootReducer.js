import { combineReducers } from 'redux';
import combinedInitialState from '../initialState/intinalState';

const formDataReducer = (state = combinedInitialState.formData, action) => {
    switch (action.type) {
        case 'SAVE_FORM_DATA':
            return action.payload;
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    formData: formDataReducer,
});

export default rootReducer;
