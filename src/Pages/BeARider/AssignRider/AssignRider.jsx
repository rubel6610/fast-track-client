import React from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();

  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["assignableParcels"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/assignRider");
      return res.data;
    },
  });

  const filteredParcels = parcels.filter(
    (parcel) =>
      parcel.payment_status === "paid" &&
      parcel.delivery_status?.toLowerCase() !== "collected"
  );

  if (isLoading) return <Loading />;

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Assign Rider to Parcels
      </h2>
      <table className="table table-zebra w-full text-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th>#</th>
            <th>Receiver Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Weight</th>
            <th>Delivery Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredParcels.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No paid parcels pending for delivery
              </td>
            </tr>
          ) : (
            filteredParcels.map((parcel, index) => (
           
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.Parcel_Info.receiverName}</td>
                <td>{parcel.Parcel_Info.receiverContact}</td>
                <td>{parcel.Parcel_Info.receiverAddress}</td>
                <td>{parcel.Parcel_Info.parcelWeight}</td>
                <td>{parcel.delivery_status || "N/A"}</td>
                <td>{parcel.payment_status}</td>
                <td>
                  <button className="btn btn-xs btn-primary">
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AssignRider;
