export const LOCAL_STORAGE_KEY = "formData";


// STEP 1 FORM
export const saveStep1FormData = (formData) => {
    const savedData = loadFormData();
    const updatedData = {
        ...savedData,
        step1: formData,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
};

// STEP 2 FORM
export const saveStep2FormData = (formData) => {
    const savedData = loadFormData();
    const updatedData = {
        ...savedData,
        step2: formData,
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedData));
};

// FETCH ALL DATA
export const loadFormData = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : undefined; // Return undefined if no data is found
};