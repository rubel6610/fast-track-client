import React from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const AssignRiderModal = ({
  isModalOpen,
  handleCloseModal,
  parcel,
  riders,
}) => {
  const axiosSecure = UseAxiosSecure();
  if (!isModalOpen || !parcel) return null;

  // ✅ ঠিক মত Filter করা হচ্ছে
  const matched = riders.filter(
    (rider) =>
      rider.district === parcel?.Parcel_Info?.receiverDistrict
  );

  const AssignRider = async (name, id,email) => {
    try {
      const res = await axiosSecure.patch(`/parcels/${parcel._id}/assign`, {
        riderName: name,
        riderEmail:email,
        riderId: id,
      });

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: "Assigned!",
          text: "Rider has been assigned successfully.",
        });
        handleCloseModal(); // Modal বন্ধ
      } else {
        Swal.fire({
          icon: "info",
          title: "No Change",
          text: "This parcel might already be assigned.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed!",
        text: "Could not assign rider.",
      });
      console.error("Assignment error:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gray-200 bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg relative">
        {/* ❌ Close Button */}
        <button
          className="absolute top-2 right-2 btn btn-sm btn-error"
          onClick={handleCloseModal}
        >
          ✕
        </button>

        {/* 📦 Modal Title */}
        <h2 className="text-xl font-bold mb-4 text-center">
          Assign Rider to {parcel?.Parcel_Info?.receiverName}
        </h2>

        {/* 📋 Rider Table */}
        {matched.length === 0 ? (
          <p className="text-center text-gray-500">
            No riders found in this district:{" "}
            <span className="font-semibold">
              {parcel?.Parcel_Info?.receiverDistrict}
            </span>
          </p>
        ) : (
          <table className="table table-zebra text-sm">
            <thead className="bg-green-500 text-white">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>District</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {matched.map((rider, index) => (
                <tr key={rider._id}>
                  <td>{index + 1}</td>
                  <td>{rider.name}</td>
                  <td>{rider.email}</td>
                  <td>{rider.district}</td>
                  <td>
                    <button
                      className="btn btn-xs btn-primary"
                      onClick={() => AssignRider(rider.name, rider._id,rider.email)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignRiderModal;
