const DATA_KEY = 'formData';

export const loadFormData = () => {
    const savedData = localStorage.getItem(DATA_KEY);
    return savedData ? JSON.parse(savedData) : {};
};

export const saveFormData = (formData) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(formData));
};
