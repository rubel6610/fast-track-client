import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";
import AssignRiderModal from "./AssignRiderModal";

const AssignRider = () => {
  const axiosSecure = UseAxiosSecure();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parcel, setParcel] = useState(null);
  const [riders,setRiders]=useState([])
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
  useEffect(()=>{
    axiosSecure("/riders/active").then(res=>{
        setRiders(res.data)
    });
  },[axiosSecure])

  const handleOpenModal = async (parcel) => {
    setParcel(parcel);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setParcel(null);
    refetch();
  };

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
            <th>District</th>
            <th>Weight</th>
            <th>Delivery Status</th>
            <th>Payment Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {parcels.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-6 text-gray-500">
                No paid parcels pending for delivery
              </td>
            </tr>
          ) : (
            parcels.map((parcel, index) => (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcel.Parcel_Info.receiverName}</td>
                <td>{parcel.Parcel_Info.receiverContact}</td>
                <td>{parcel.Parcel_Info.receiverDistrict}</td>
                <td>{parcel.Parcel_Info.parcelWeight}</td>
                <td>{parcel.delivery_status || "N/A"}</td>
                <td>{parcel.payment_status}</td>
                <td>
                  <button
                    onClick={() => handleOpenModal(parcel)}
                    className="btn btn-xs btn-primary"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isModalOpen && (
        <AssignRiderModal
          handleCloseModal={handleCloseModal}
          parcel={parcel}
          isModalOpen={isModalOpen} riders={riders}
        />
      )}
    </div>
  );
};

export default AssignRider;
