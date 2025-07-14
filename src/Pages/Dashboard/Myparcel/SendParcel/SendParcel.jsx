import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { generateTrackingId } from "../../../Shared/generateTrackingId";
import UseAuth from "../../../../Hooks/UseAuth";
import UseAxiosSecure from "../../../../Hooks/UseAxiosSecure";
import axios from "axios";
import { useNavigate } from "react-router";

const SendParcel = () => {
  const { user } = UseAuth();
  const axiosSecure = UseAxiosSecure();
  const [loading,setLoading]=useState(true)
  const [warehousesData,setWarehousesData]=useState([])
  const navigate = useNavigate()
  useEffect(()=>{
  
    axios("./warehouses.json")
    .then(res=>{
      setLoading(false)
      setWarehousesData(res.data)})
  },[])
  const {
    register,
    handleSubmit,
    watch,
    // reset,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const senderRegion = watch("senderRegion");
  const senderDistrict = watch("senderDistrict");
  const receiverRegion = watch("receiverRegion");
  const receiverDistrict = watch("receiverDistrict");
  const senderServiceCenter = watch("senderServiceCenter");
  const receiverServiceCenter = watch("receiverServiceCenter");
  const parcelType = watch("parcelType");

  const uniqueRegions = [
    ...new Set(warehousesData.map((warehouse) => warehouse.region)),
  ];

  const getDistrict = (region) => {
    return [
      ...new Set(
        warehousesData
          .filter((item) => item.region === region)
          .map((i) => i.district)
      ),
    ];
  };

  const getServiceCenter = (district) => {
    return [
      ...new Set(
        warehousesData
          .filter((item) => item.district === district)
          ?.map((item) => item.city)
      ),
    ];
  };

  const onSubmit = async (data) => {
    const { parcelType, parcelWeight } = data;
    let deliveryCost = 0;
    let costDetails = "";
    const isSameCity = senderServiceCenter === receiverServiceCenter;

    if (parcelType === "Document") {
      deliveryCost = isSameCity ? 60 : 80;
      costDetails = isSameCity
        ? "within the city (document): 60 Tk"
        : "Outside city (document): 80 Tk";
    } else if (parcelType === "Non-Document") {
      if (parcelWeight <= 3) {
        deliveryCost = isSameCity ? 110 : 150;
        costDetails = isSameCity
          ? "within City (Non Doucment up to 3kg) : 110 TK"
          : "Outside city (Non Document  up to 3Kg): 150Tk";
      } else {
        const extraWeight = parcelWeight - 3;
        if (isSameCity) {
          deliveryCost = 110 + extraWeight * 40;
          costDetails = `within the city (Non document over 3kg): 110TK + ${extraWeight} kg * 40TK = ${deliveryCost} TK`;
        } else {
          deliveryCost = 110 + extraWeight * 40 + 40;
          costDetails = `OutSide the city (Non document over 3kg): 110TK + ${extraWeight} kg * 40 TK + 40 TK = ${deliveryCost} TK`;
        }
      }
    }
    const parcelData = {
      Parcel_Info:data,
      Cost: deliveryCost,
      Tracking_Id: generateTrackingId(),
      userDetails: {
        userName: user.displayName,
        userEmail: user.email,
      },
      senderServiceCenter,
      receiverServiceCenter,
      payment_status: "un-paid",
      delivery_status: "not-collected",
      Sending_date: new Date(),
    };
    Swal.fire({
      title: "Delivery Cost ",
      html: `
        <p><strong>Parcel Type:</strong> ${parcelType}</p>
        ${
          parcelType === "Non-Document"
            ? `<p><strong>Weight:</strong> ${parcelWeight} kg</p>`
            : ""
        }
        <p><strong>From:</strong> ${senderServiceCenter}</p>
        <p><strong>To:</strong> ${receiverServiceCenter}</p>
        <p><strong>Cost Details:</strong> ${costDetails}</p>
        <h3 class="text-lg mt-4"><strong>Total Cost:</strong> ${deliveryCost} TK</h3>
      `,
      icon: "info",
      confirmButtonText: "Proceed to Payment",
      showCancelButton: true,
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await axiosSecure.post("/parcels", parcelData);
     
        if(response.data.insertedId){
          navigate(`/dashboard/my-parcels/pay/${response.data.insertedId}`);
        }
      } else {
        Swal.fire("Cancelled", "You cancelled the process", "error");
      }
    });
    // reset();
  };

   if(loading){
        return <div className='flex items-center justify-center'>
            <span className="loading loading-spinner text-error"></span>
        </div>
    }

  return (
    <div className="max-w-5xl mx-auto my-10 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-4xl font-bold text-center text-green-600 mb-8">
        Send Parcel
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-6"
      >
        {/* Parcel Name */}
        <div>
          <input
            {...register("ParcelTitle", {
              required: "Parcel Title is required",
            })}
            type="text"
            placeholder="Parcel Title"
            className="input input-bordered w-full"
          />
          {errors.ParcelTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ParcelTitle.message}
            </p>
          )}
        </div>

        {/* Parcel Type */}
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              value="Document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
              type="radio"
              name="parcelType"
              className="radio"
            />
            Document
          </label>
          <label className="flex items-center gap-2">
            <input
              value="Non-Document"
              {...register("parcelType", {
                required: "Please select parcel type",
              })}
              type="radio"
              name="parcelType"
              className="radio"
            />
            Non-Document
          </label>
        </div>
        {errors.parcelType && (
          <p className="text-red-500 text-sm">{errors.parcelType.message}</p>
        )}

        {/* Parcel Weight (Conditional) */}
        {parcelType === "Non-Document" && (
          <div>
            <input
              {...register("parcelWeight", {
                required: "Weight is required for Non-Document",
                valueAsNumber: true,
                min: { value: 0.1, message: "Weight must be positive" },
              })}
              type="number"
              placeholder="Weight (kg)"
              className="input input-bordered w-full"
            />
            {errors.parcelWeight && (
              <p className="text-red-500 text-sm mt-1">
                {errors.parcelWeight.message}
              </p>
            )}
          </div>
        )}

        {/* Sender and Receiver Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sender Section */}
          <div className="p-4 border rounded-xl bg-gray-50">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">
              Sender Information
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <input
                  {...register("senderName", {
                    required: "Sender Name is required",
                  })}
                  type="text"
                  placeholder="Sender Name"
                  className="input input-bordered w-full"
                />
                {errors.senderName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("senderContact", {
                    required: "Sender Contact is required",
                  })}
                  type="text"
                  placeholder="Sender Contact"
                  className="input input-bordered w-full"
                />
                {errors.senderContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderContact.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("senderRegion", {
                    required: "Sender Region is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, idx) => (
                    <option key={idx}>{region}</option>
                  ))}
                </select>
                {errors.senderRegion && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderRegion.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("senderDistrict", {
                    required: "Sender District is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {getDistrict(senderRegion).map((district, idx) => (
                    <option key={idx}>{district}</option>
                  ))}
                </select>
                {errors.senderDistrict && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderDistrict.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("senderServiceCenter", {
                    required: "Sender Service Center is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getServiceCenter(senderDistrict).map((center, idx) => (
                    <option key={idx}>{center}</option>
                  ))}
                </select>
                {errors.senderServiceCenter && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("senderAddress", {
                    required: "Sender Address is required",
                  })}
                  type="text"
                  placeholder="Sender Address"
                  className="input input-bordered w-full"
                />
                {errors.senderAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.senderAddress.message}
                  </p>
                )}
              </div>

              <textarea
                {...register("pickupInstruction")}
                placeholder="Pickup Instruction (Optional)"
                className="textarea textarea-bordered w-full"
                rows={3}
              ></textarea>
            </div>
          </div>

          {/* Receiver Section */}
          <div className="p-4 border rounded-xl bg-gray-50">
            <h2 className="text-2xl font-semibold text-teal-700 mb-4">
              Receiver Information
            </h2>

            <div className="flex flex-col gap-4">
              <div>
                <input
                  {...register("receiverName", {
                    required: "Receiver Name is required",
                  })}
                  type="text"
                  placeholder="Receiver Name"
                  className="input input-bordered w-full"
                />
                {errors.receiverName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverName.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("receiverContact", {
                    required: "Receiver Contact is required",
                  })}
                  type="text"
                  placeholder="Receiver Contact"
                  className="input input-bordered w-full"
                />
                {errors.receiverContact && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverContact.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("receiverRegion", {
                    required: "Receiver Region is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Region</option>
                  {uniqueRegions.map((region, idx) => (
                    <option key={idx}>{region}</option>
                  ))}
                </select>
                {errors.receiverRegion && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverRegion.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("receiverDistrict", {
                    required: "Receiver District is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select District</option>
                  {getDistrict(receiverRegion).map((district, idx) => (
                    <option key={idx}>{district}</option>
                  ))}
                </select>
                {errors.receiverDistrict && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverDistrict.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("receiverServiceCenter", {
                    required: "Receiver Service Center is required",
                  })}
                  className="select select-bordered w-full"
                >
                  <option value="">Select Service Center</option>
                  {getServiceCenter(receiverDistrict).map((center, idx) => (
                    <option key={idx}>{center}</option>
                  ))}
                </select>
                {errors.receiverServiceCenter && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverServiceCenter.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("receiverAddress", {
                    required: "Receiver Address is required",
                  })}
                  type="text"
                  placeholder="Receiver Address"
                  className="input input-bordered w-full"
                />
                {errors.receiverAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.receiverAddress.message}
                  </p>
                )}
              </div>

              <textarea
                {...register("dropoffInstruction")}
                placeholder="Drop-off Instruction (Optional)"
                className="textarea textarea-bordered w-full"
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="btn btn-success px-10"
            disabled={!isValid}
          >
            Send Parcel
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
