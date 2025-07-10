import { useQuery } from "@tanstack/react-query";
import React from "react";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const PaymentHistory = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const { data: payments = [], isPending } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="loading loading-spinner text-success"></span>
      </div>
    );
  }

  if (payments.length === 0) {
    return (
      <div className="text-center text-gray-500 font-medium py-10">
        No payment history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center text-green-600 my-6">
        Payment History
      </h2>
      <table className="table w-full border text-sm">
        <thead className="bg-green-600 text-white text-base">
          <tr>
            <th>#</th>
            <th>Parcel ID</th>
            <th>Amount (৳)</th>
            <th>Payment Method</th>
            <th>Transaction ID</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((item, index) => (
            <tr key={item.transactionId || index}>
              <td>{index + 1}</td>
              <td>{item.parcelId}</td>
              <td>{item.amount}</td>
              <td className="capitalize">{item.payment_method}</td>
              <td className="text-blue-600 font-mono">{item.transactionId}</td>
              <td>{item.email}</td>
              <td>
                <span className="badge badge-success text-white">Paid</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
