import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import UseAuth from "../../../Hooks/UseAuth";

const PaymentForm = () => {
  const { user } = UseAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { id } = useParams();
  const navigate = useNavigate()
  const axiosSecure = UseAxiosSecure();
  const { data: parcel = {}, isPending } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcels/${id}`);
      return res.data;
    },
  });
  const amount = parcel.Cost;
  const amountInCents = amount * 100;
  if (isPending) {
    return (
      <div className="flex items-center justify-center">
        <span className="loading loading-spinner text-error"></span>
      </div>
    );
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        setError(error.message);
        setSuccess("");
      } else {
        setError("");
        setSuccess(`✅ Payment method created: ${paymentMethod.id}`);
      }
      const res = await axiosSecure.post("/create-payment-intent", {
        amount: amountInCents,
      });
      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });
   
      if(result.error){
         setError(result.error.message);
      setSuccess("");
    } else if (result.paymentIntent.status === "succeeded") {
      setSuccess("✅ Payment successful!");
      setError("");

      const paymentData = {
        parcelId:id,
        amount,
        email:user.email,
        transactionId:result.paymentIntent.id,
        payment_method:result.paymentIntent.payment_method_types
      }
       await axiosSecure.post('/payments',paymentData);
  
      navigate(-1)
    }
    
    } catch (err) {
      setError("Payment failed");
      console.error(err);
    }
  };

  return (
    <div className=" flex  justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6 text-green-600">
          Parcel Payment
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border rounded-md"
          />

          <button
            className="w-full btn btn-success"
            type="submit"
            disabled={!stripe}
          >
            Pay {amount}
          </button>

          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
