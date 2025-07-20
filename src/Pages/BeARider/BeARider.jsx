import React from "react";
import { useForm } from "react-hook-form";
import UseAuth from "../../Hooks/UseAuth";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const BeARider = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({ mode: "onChange" });

  const { data: warehouseData = [] } = useQuery({
    queryKey: ["warhousedata"],
    queryFn: async () => {
      const res = await fetch("./warehouses.json");
      return res.json();
    },
  });

  const region = watch("region");
  const uniqueRegion = [...new Set(warehouseData.map((w) => w.region))];
  const getDistricts = (region) =>
    [...new Set(warehouseData.filter((w) => w.region === region).map((w) => w.district))];

  const onSubmit = async (data) => {
    const riderData = {
      ...data,
      name: user.displayName,
      email: user.email,
      status: "pending",
      created_At: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/riders", riderData);
      if (res.data?.insertedId) {
        Swal.fire({
          icon: "success",
          title: user.displayName,
          text: "Your application submitted successfully!",
          confirmButtonColor: "#16a34a",
        });
        reset(); // reset optional fields
      }
    } catch (error) {
      let errorMessage = "Something went wrong. Please try again.";
      if (error.response?.status === 409) {
        errorMessage = "❌ You have already submitted an application.";
      } else if (error.response?.data?.error) {
        errorMessage = `❌ ${error.response.data.error}`;
      }

      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: errorMessage,
        confirmButtonColor: "#dc2626",
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        Become a Rider
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-6">
        {/* Name */}
        <input
          type="text"
          defaultValue={user.displayName}
          className="input input-bordered w-full"
          disabled
        />

        {/* Email */}
        <input
          type="email"
          defaultValue={user.email}
          className="input input-bordered w-full"
          disabled
        />

        {/* Age */}
        <div>
          <input
            type="number"
            {...register("age", { required: true, min: 18 })}
            placeholder="Your Age"
            className="input input-bordered w-full"
          />
          {errors.age && <p className="text-red-500 text-sm">You must be 18 or older</p>}
        </div>

        {/* Phone */}
        <div>
          <input
            type="tel"
            {...register("phone", { required: true })}
            placeholder="Phone Number"
            className="input input-bordered w-full"
          />
          {errors.phone && <p className="text-red-500 text-sm">Phone number is required</p>}
        </div>

        {/* NID */}
        <div>
          <input
            type="text"
            {...register("nid", { required: true })}
            placeholder="National ID Card Number"
            className="input input-bordered w-full"
          />
          {errors.nid && <p className="text-red-500 text-sm">NID is required</p>}
        </div>

        {/* Region */}
        <div>
          <select
            {...register("region", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select Region</option>
            {uniqueRegion.map((r, idx) => (
              <option key={idx} value={r}>
                {r}
              </option>
            ))}
          </select>
          {errors.region && <p className="text-red-500 text-sm">Region is required</p>}
        </div>

        {/* District */}
        <div>
          <select
            {...register("district", { required: true })}
            className="select select-bordered w-full"
          >
            <option value="">Select District</option>
            {getDistricts(region).map((d, idx) => (
              <option key={idx} value={d}>
                {d}
              </option>
            ))}
          </select>
          {errors.district && <p className="text-red-500 text-sm">District is required</p>}
        </div>

        {/* Bike Brand */}
        <div>
          <input
            type="text"
            {...register("bike_brand", { required: true })}
            placeholder="Bike Brand (e.g. Yamaha FZ)"
            className="input input-bordered w-full"
          />
          {errors.bike_brand && (
            <p className="text-red-500 text-sm">Bike brand is required</p>
          )}
        </div>

        {/* Bike Registration */}
        <div>
          <input
            type="text"
            {...register("bike_registration", { required: true })}
            placeholder="Bike Registration Number"
            className="input input-bordered w-full"
          />
          {errors.bike_registration && (
            <p className="text-red-500 text-sm">Bike registration number is required</p>
          )}
        </div>

        {/* Additional Info */}
        <textarea
          {...register("additional_info")}
          className="textarea textarea-bordered w-full"
          placeholder="Additional Info (Optional)"
          rows={3}
        ></textarea>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isValid}
          className="btn btn-success w-full mt-4"
        >
          Submit Application
        </button>
      </form>
    </div>
  );
};

export default BeARider;
