import React, { useState } from "react";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import UseAuth from "../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure";

const UserProfile = () => {
  const AxiosSecure = UseAxiosSecure();
  const { user } = UseAuth();
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateProfile(user, {
        displayName: name,
        photoURL: photo,
      });

      const userDetails = {
        name,
        photo,
      };
      const res = await AxiosSecure.patch(
        `/users/updateProfile?email=${user.email}`,
        userDetails
      );
      if (res.data.modifiedCount) {
        Swal.fire({
          icon: "success",
          title: "Profile Updated",
          text: "Your profile has been successfully updated!",
          confirmButtonColor: "#16a34a",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.message,
      });
    }
  };

  return (
    <div className="w-full min-h-screen px-4 py-8 bg-base-200">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-success mb-6">
          User Profile
        </h2>

        <div className="flex justify-center mb-6">
          <div className="avatar">
            <div className="w-28 rounded-full ring ring-success ring-offset-base-100 ring-offset-2">
              <img src={photo} alt="Profile" />
            </div>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          <div>
            <label className="label">Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="label">Email (Read-only)</label>
            <input
              type="email"
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              value={user?.email}
              readOnly
            />
          </div>
          <div>
            <label className="label">Photo URL</label>
            <input
              type="text"
              className="input input-bordered w-full"
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-success">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
