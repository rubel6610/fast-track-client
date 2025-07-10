import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "./../../Hooks/UseAuth";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import UseAxiosSecure from "../../Hooks/UseAxiosSecure";
const Register = () => {
  const axiosSecure = UseAxiosSecure();
  const [photoUrl, setPhotoUrl] = useState("");
  const { createUser, updateuserDetails, googleSignIn } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const from = useLocation().state?.from?.pathname || "/";
  const onSubmit = (userData) => {
    const { name, email, password } = userData;
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        //update user details
        updateuserDetails({
          displayName: name,
          photoURL: photoUrl,
        }).then(async () => {
          //sending user details to db
          const userDetails = {
            name,
            email,
            photoUrl,
          };
          const res = await axiosSecure.post("/users", userDetails);
          if (res.data.insertedId) {
            Swal.fire({
              title: user.email,
              text: "Registration Completed Successfully!",
              icon: "success",
              confirmButtonText: "OK",
              confirmButtonColor: "#16a34a",
            });

            navigate(from);
          }
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Sign In Failed",
          text: error.message,
        });
      });
  };
  const handleGoogleSignup = () => {
    googleSignIn().then(async(result) => {
      const user = result.user;
      const userDetails ={
        name:user.displayName,
        email:user.email,
        photoUrl:user.photoURL,
      }
     const res = await axiosSecure.post("/users", userDetails);
     if(res.data.insertedId){
       Swal.fire({
        title: "Success!",
        text: "Registration Completed by Google!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#16a34a",
      });
     }
      navigate(from);
    });
  };
  const handleimageUpload = async (e) => {
    const image = e.target;
    const files = image.files[0]
    const formData = new FormData();
    formData.append("image", files);

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?expiration=600&key=${
        import.meta.env.VITE_image_upload_key
      }`,
      formData
    );
    if (res.data.data.url) {
      setPhotoUrl(res.data.data.url);
    }
  };
  return (
    <div className="card shadow-2xl bg-base-100">
      <div className="card-body">
        <h1 className="text-2xl font-extrabold text-center">Register Now</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label htmlFor="name">Name</label>
            <input
              {...register("name", { required: true })}
              className="input input-success w-full"
              type="text"
              id="name"
              placeholder="Name"
            />
            {errors.name?.type === "required" && (
              <p className="text-red-500">name can't be empty</p>
            )}
            <label className="label" htmlFor="email">
              Email
            </label>
            <input
              {...register("email", { required: true })}
              className="input input-success w-full"
              type="email"
              id="email"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">email can't be empty</p>
            )}
            <label className="label" htmlFor="photo">
              Photo
            </label>
            <input
              onChange={handleimageUpload}
              className="input input-success w-full"
              type="file"
              id="photo"
              required
              placeholder="Photo"
            />
      

            <label className="label" htmlFor="password">
              Password
            </label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              className="input input-success w-full"
              type="text"
              id="password"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">password can't be empty</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">Password Must be 6 Character</p>
            )}
            <input
              type="submit"
              className="btn btn-success mt-4"
              value="Register"
            />
          </fieldset>
        </form>
        <p>
          Already have an account{" "}
          <Link to="/signin" className="text-success">
            Sign In
          </Link>
        </p>
        <div className="divider">OR</div>
        <button
          onClick={handleGoogleSignup}
          className="flex items-center justify-center gap-2  btn btn-soft"
        >
          <FcGoogle /> Sign Up With GOOGLE
        </button>
      </div>
    </div>
  );
};

export default Register;
