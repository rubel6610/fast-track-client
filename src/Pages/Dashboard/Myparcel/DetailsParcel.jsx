import React from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import UseAxiosSecure from '../../../Hooks/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const ParcelDetails = () => {
  const { id } = useParams();
  const axiosSecure = UseAxiosSecure();
  const navigate = useNavigate();

  const { data: parcel, isLoading, } = useQuery({
    queryKey: ['parcel', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-parcels/${id}`);
      return res.data;
    },
  });

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/my-parcels/${id}`);
      if (res.data.deletedCount > 0) {
        Swal.fire('Deleted!', 'Parcel has been deleted.', 'success');
        navigate('/dashboard/my-parcels');
      }
    }
  };

 

  if (isLoading) return <p className="text-center">Loading...</p>;

  const { Parcel_Info, _id, Tracking_Id, Cost, payment_status } = parcel || {};

  return (
    <div className="max-w-7xl mx-auto bg-white shadow-md rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4 text-success">Parcel Details</h2>
      <p><strong>Tracking ID:</strong> {Tracking_Id}</p>
      <p><strong>Parcel Name:</strong> {Parcel_Info?.ParcelTitle}</p>
      <p><strong>Type:</strong> {Parcel_Info?.parcelType}</p>
      <p><strong>Sender:</strong> {Parcel_Info?.senderName}</p>
      <p><strong>Receiver:</strong> {Parcel_Info?.receiverName}</p>
      <p><strong>Weight:</strong> {Parcel_Info.parcelWeight} TK</p>
      <p><strong>Cost:</strong> {Cost} TK</p>
      <p><strong>Payment Status:</strong> {payment_status}</p>

      <div className="flex gap-4 mt-6">
        <button onClick={handleDelete} className="btn w-full btn-error">Delete Parcel</button>
      </div>
    </div>
  );
};

export default ParcelDetails;
