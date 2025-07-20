import React from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import UseAuth from "../../Hooks/UseAuth";

const PendingDeliveries = () => {
  const axiosSecure = UseAxiosSecure();
  const { user } = UseAuth();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["riderparcel", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure(`/riders/parcels?email=${user?.email}`);
      return res.data.filter((p) => p.delivery_status !== "delivered");
    },
  });

  const handleStatusUpdate = async (parcelId, newStatus) => {
    try {
      const res = await axiosSecure.patch(`/status-update/${parcelId}`, {
        status: newStatus,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire("Success!", `Parcel marked as ${newStatus}.`, "success");
        refetch();
      } else {
        Swal.fire("Oops!", "No change was made.", "info");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Something went wrong!", "error");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">📦 Pending Deliveries</h2>

      {isLoading ? (
        <p className="text-lg font-medium">Loading...</p>
      ) : parcels.length === 0 ? (
        <p className="text-green-600 font-medium">✅ No pending deliveries.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Tracking ID</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => (
                <tr key={parcel._id}>
                  <td>{index + 1}</td>
                  <td>{parcel.Tracking_Id}</td>
                  <td>{parcel.Parcel_Info?.senderName}</td>
                  <td>{parcel.Parcel_Info?.receiverName}</td>
                  <td>{parcel.senderServiceCenter}</td>
                  <td>{parcel.receiverServiceCenter}</td>
                  <td className="capitalize">{parcel.delivery_status}</td>
                  <td className="space-x-2">
                    {parcel.delivery_status === "rider-assigned" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "in-transit")
                        }
                        className="btn btn-sm btn-success"
                      >
                        Mark as Picked
                      </button>
                    )}
                    {parcel.delivery_status === "in-transit" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(parcel._id, "delivered")
                        }
                        className="btn btn-sm btn-primary"
                      >
                        Mark as Delivered
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingDeliveries;
