export const simulatePayment = async (formData) => {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Payment failed');
        }

        await new Promise((resolve) => setTimeout(resolve, 2000));

        return {
            success: true,
            message: 'Payment successful',
        };
    } catch (error) {
        return {
            success: false,
            message: 'Payment failed',
            error: error.message,
        };
    }
};
