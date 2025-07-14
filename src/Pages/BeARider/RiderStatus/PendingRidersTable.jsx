import React, { useState } from "react";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";
import Loading from "../../../Components/Loading";
import { useQuery } from "@tanstack/react-query";


const PendingRidersTable = () => {
  const [selectedRider, setSelectedRider] = useState(null);
     const axiosSecure = UseAxiosSecure();
    const {data:riders=[], isLoading,refetch}=useQuery({
        queryKey:["riderData"],
        queryFn:async()=>{
            const res = await axiosSecure('/riders/pending');
            return res.data;
        }
    })

  const handleStatusChange = async (id, status,email) => {
    const res = await axiosSecure.patch(`/riders/${id}`, { status,email });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: `Rider ${status === "accepted" ? "accepted" : "rejected"}`,
        showConfirmButton: false,
        timer: 1500,
      });
      refetch();
    }
  };
 if(isLoading) return <Loading/>

  return (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Rider Applications</h2>
      <table className="table w-full border text-sm">
        <thead className="bg-green-600 text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Submitted At</th>
          
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {riders.map((rider, index) => (
       (
               <tr key={rider._id}>
              <td>{index + 1}</td>
              <td>{rider.name}</td>
              <td className="capitalize">{rider.status}</td>
              
              <td>{new Date(rider.created_At).toLocaleDateString()}</td>
         
              <td className="flex gap-2 justify-center">
                <button
                  className="btn btn-xs btn-info"
                  onClick={() => setSelectedRider(rider)}
                >
                  View
                </button>
                <button
                  className="btn btn-xs btn-success"
                  disabled={rider.status === "accepted"}
                  onClick={() => handleStatusChange(rider._id, "accepted",rider.email)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-xs btn-error"
                  disabled={rider.status === "rejected"}
                  onClick={() => handleStatusChange(rider._id, "rejected")}
                >
                  Reject
                </button>
              </td>
            </tr>
        )
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedRider && (
        <dialog open className="modal">
          <div className="modal-box max-w-2xl">
            <h3 className="font-bold text-lg mb-2 text-green-700">Rider Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <p><strong>Name:</strong> {selectedRider.name}</p>
              <p><strong>Email:</strong> {selectedRider.email}</p>
              <p><strong>Phone:</strong> {selectedRider.phone}</p>
              <p><strong>Age:</strong> {selectedRider.age}</p>
              <p><strong>NID:</strong> {selectedRider.nid}</p>
              <p><strong>Region:</strong> {selectedRider.region}</p>
              <p><strong>District:</strong> {selectedRider.district}</p>
              <p><strong>Bike:</strong> {selectedRider.bike_brand} - {selectedRider.bike_registration}</p>
              <p className="col-span-2"><strong>Additional Info:</strong> {selectedRider.additional_info || "N/A"}</p>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn btn-sm btn-neutral" onClick={() => setSelectedRider(null)}>
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingRidersTable;
