export const validateField = (fieldName, fieldValue) => {
    const fieldErrors = {};

    switch (fieldName) {
        case "adults":
            if (fieldValue < 1)
                fieldErrors.adults = "Количество взрослых должно быть больше 0";
            break;
        case "baby":
            if (fieldValue < 0)
                fieldErrors.baby =
                    "Количество детей до 5 лет не может быть отрицательным";
            break;
        case "child":
            if (fieldValue < 0)
                fieldErrors.child =
                    "Количество детей от 5 до 12 лет не может быть отрицательным";
            break;
        case "nights":
            if (fieldValue < 1)
                fieldErrors.nights = "Количество ночей (числовое, мин.знач.: 1)";
            if (fieldValue < 0)
                fieldErrors.nights = "Количество ночей не может быть отрицательным";
            break;
        default:
            break;
    }
    return fieldErrors;
};

export const errorMessages = {
    adults: "Количество взрослых должно быть больше 0",
    child: "Количество детей от 5 до 12 лет не может быть отрицательным",
    baby: "Количество детей до 5 лет не может быть отрицательным",
    nights: "Количество ночей (числовое, мин.знач.: 1)",
};
