import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import Loading from "../../../../Components/Loading";

const Users = () => {
  const axiosSecure = UseAxiosSecure();
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    enabled:searchTerm.trim().length > 0,
    queryFn: async () => {
      const res = await axiosSecure("/users");
      return res.data;
    },
  });

  const handleView = (user) => {
    Swal.fire({
      title: user.name,
      html: `
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Role:</strong> ${user.role || "user"}</p>
        <p><strong>Registered:</strong> ${new Date(
          user.createdAt
        ).toLocaleDateString()}</p>
      `,
      confirmButtonColor: "#16a34a",
    });
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      const res = await axiosSecure.delete(`/users/${id}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire("Deleted!", "User has been deleted.", "success");
      }
    }
  };

  const handleRoleChange = async (email, role) => {
    try {
      const res = await axiosSecure.patch(`/users/admin/${email}`, { role });
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `Role updated to ${role}`,
          text: `${email} is now a ${role}.`,
        });
        refetch();
      } else {
        Swal.fire({
          icon: "info",
          title: "No Change",
          text: "User role remains unchanged.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update role",
      });
      console.log(error);
    }
  };

  // Filter users only when searchTerm is not empty
  const filteredUsers =
    searchTerm.trim() === ""
      ? []
      : users.filter(
          (user) =>
            user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );

  if (isLoading) return <Loading/>

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <h2 className="text-2xl font-bold mb-4">User Management</h2>

      {/* 🔍 Search Input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by name or email"
          className="input input-bordered w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <table className="table table-zebra w-full">
        <thead className="bg-green-600 text-white text-sm">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Registered At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center py-6 text-gray-500">
                {searchTerm.trim() === ""
                  ? "Search to find users."
                  : "No matching users found."}
              </td>
            </tr>
          ) : (
            filteredUsers.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.name || "N/A"}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role || "user"}</td>
                <td>
                  {user.createdAt
                    ? new Date(user.createdAt).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleView(user)}
                    className="btn btn-sm btn-info text-white"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Delete
                  </button>
                  {user.role !== "admin" ? (
                    <button
                      onClick={() => handleRoleChange(user.email, "admin")}
                      className="btn btn-sm btn-success text-white"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => handleRoleChange(user.email, "user")}
                      className="btn btn-sm btn-warning text-white"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
