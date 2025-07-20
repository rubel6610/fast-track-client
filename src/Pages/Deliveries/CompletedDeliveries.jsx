import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import UseAxiosSecure from '../../Hooks/UseAxiosSecure';
import UseAuth from '../../Hooks/UseAuth';
import Swal from 'sweetalert2';

const CompletedDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ['completedDeliveries', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/riders/completedParcels?email=${user?.email}`);
      return res.data;
    },
  });

  const calculateIncome = (parcel) => {
    const cost = parseFloat(parcel?.Cost || 0);
    return parcel?.senderServiceCenter === parcel?.receiverServiceCenter
      ? cost * 0.8
      : cost * 0.3;
  };

  const mutation = useMutation({
    mutationFn: async (parcelId) => {
      const res = await axiosSecure.patch(`/riders/cashout/${parcelId}`);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire("Success", "Parcel cashed out!", "success");
      queryClient.invalidateQueries(['completedDeliveries', user?.email]);
    },
    onError: () => {
      Swal.fire("Error", "Cashout failed!", "error");
    },
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>

      {isLoading ? (
        <p>Loading...</p>
      ) : parcels.length === 0 ? (
        <p>No completed deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Cost</th>
                <th>Earned</th>
                <th>Cashout</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => {
                const income = calculateIncome(parcel);
                return (
                  <tr key={parcel._id}>
                    <td>{index + 1}</td>
                    <td>{parcel.Tracking_Id}</td>
                    <td>{parcel.Parcel_Info?.senderName}</td>
                    <td>{parcel.Parcel_Info?.receiverName}</td>
                    <td>{parcel.senderServiceCenter}</td>
                    <td>{parcel.receiverServiceCenter}</td>
                    <td>{parcel.Cost} ৳</td>
                    <td>{income.toFixed(2)} ৳</td>
                    <td>
                      {parcel.isCashedOut ? (
                        <span className="text-green-600 font-medium">Cashed Out</span>
                      ) : (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => mutation.mutate(parcel._id)}
                          disabled={mutation.isLoading}
                        >
                          {mutation.isLoading ? "Processing..." : "Cash Out"}
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CompletedDeliveries;
