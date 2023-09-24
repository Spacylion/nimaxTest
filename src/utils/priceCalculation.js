export const calculateTotalPrice = (formData) => {
    const roomTypePrices = { Эконом: 1800, Стандарт: 2800, Люкс: 4000 };
    const basePrice = roomTypePrices[formData.roomType] || 0;

    const totalPrice =
        (basePrice * formData.nights +
            (formData.child || 0) * (basePrice * 0.5) +
            (formData.baby || 0) * basePrice) *
        (1 + formData.insurance * 0.1) *
        formData.adults;

    return totalPrice.toFixed(0);
};
