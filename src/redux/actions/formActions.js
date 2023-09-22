import * as actionTypes from '../actionTypes';

export const saveFormData = (formData) => ({
    type: actionTypes.SAVE_FORM_DATA,
    payload: formData,
});