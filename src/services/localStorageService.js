const LOCAL_STORAGE_KEY = "formData";

export const saveFormData = (formData) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
};

export const loadFormData = () => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : null;
};
