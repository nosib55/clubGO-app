import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const EventPaymentForm = ({ clientSecret, eventId, amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (e) => {
    e.preventDefault();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) },
    });

    if (result.error) {
      alert(result.error.message);
      return;
    }

    const paymentIntent = result.paymentIntent;

    await axios.post(
      `${import.meta.env.VITE_API_URL}/events/join/confirm`,
      {
        eventId,
        paymentIntentId: paymentIntent.id,
        amount: amount / 100,
      },
      { withCredentials: true }
    );

    onSuccess();
  };

  return (
    <form onSubmit={handlePayment} className="mt-4 border p-4 rounded shadow">
      <CardElement className="border p-3" />

      <button className="btn btn-success w-full mt-3">
        Pay ${(amount / 100).toFixed(2)}
      </button>
    </form>
  );
};

export default EventPaymentForm;
