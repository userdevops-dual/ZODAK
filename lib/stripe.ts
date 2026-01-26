
// This is a wrapper around Stripe for easy switching between Mock/Real data

export const stripe = {
    paymentIntents: {
        create: async (amount: number, currency: string) => {
            console.log(`[MOCK_STRIPE] Creating Payment Intent: ${amount} ${currency}`);
            return {
                id: "pi_mock_" + Math.random().toString(36).substring(7),
                client_secret: "secret_mock_" + Math.random().toString(36).substring(7),
                status: "requires_payment_method"
            }
        }
    }
};

export async function processMockPayment(amount: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ success: true, transactionId: "tx_" + Math.random().toString(36).substring(7) });
        }, 1500);
    });
}
