export const DATA = "formData";


// STEP 1 FORM
export const saveStep1FormData = (formData) => {
    const savedData = loadFormData();
    const updatedData = {
        ...savedData,
        step1: formData,
    };
    localStorage.setItem(DATA, JSON.stringify(updatedData));
};

// STEP 2 FORM
export const saveStep2FormData = (formData) => {
    const savedData = loadFormData();
    const updatedData = {
        ...savedData,
        step2: formData,
    };
    localStorage.setItem(DATA, JSON.stringify(updatedData));
};

// FETCH ALL DATA
export const loadFormData = () => {
    const savedData = localStorage.getItem(DATA);
    return savedData ? JSON.parse(savedData) : undefined; // Return undefined if no data is found
};