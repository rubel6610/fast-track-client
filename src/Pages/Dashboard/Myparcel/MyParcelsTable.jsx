import React from "react";
import { Link } from "react-router";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const MyParcelsTable = ({ parcels, refetch }) => {
  const axiosSecure = UseAxiosSecure();
  // const [upadateParcels,setUpdateParecels]=useState([])
  const handleDelete = async (id) => {
  const confirm = await Swal.fire({
    title: "Are you sure?",
    text: "You are about to delete this parcel.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });

  if (confirm.isConfirmed) {
    try {
      const res = await axiosSecure.delete(`/my-parcels/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire("Deleted!", "Parcel deleted successfully.", "success");
        if (refetch) refetch();
      } else {
        Swal.fire("Error", "Parcel could not be deleted.", "error");
      }
    } catch (err) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(err);
    }
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-sm">
        {/* Table Head */}
        <thead className="bg-success text-white text-[15px]">
          <tr>
            <th>#</th>
            <th>Type</th>
            <th>Date</th> 
            <th>Cost (৳)</th>
            <th>Payment Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {parcels.map((parcel, index) => {
            const {
              Cost,
              parcelType,
              Sending_date,
              payment_status,
              _id,
            } = parcel;

            return (
              <tr key={parcel._id}>
                <td>{index + 1}</td>
                <td>{parcelType}</td>
                <td>{Sending_date.split("T")[0]}</td>
                <td>{Cost}</td>
                <td>
                  <span
                    className={`badge ${
                      payment_status === "paid"
                        ? "badge-success"
                        : "badge-warning text-white"
                    }`}
                  >
                    {payment_status}
                  </span>
                </td>
               
               <td className="flex gap-2">
                <Link to={`/dashboard/my-parcels/view/${_id}`} className="btn btn-outline btn-success">View</Link>
                <Link  to={`/dashboard/my-parcels/pay/${_id}`} className={`btn btn-outline btn-warning ${payment_status === "paid" && "hidden"}`}>Pay</Link>
                <button  onClick={()=>handleDelete(_id)} className="btn btn-outline btn-error">Delete</button>
               </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyParcelsTable;
