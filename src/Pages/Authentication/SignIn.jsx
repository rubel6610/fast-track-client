import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import UseAuth from "../../Hooks/UseAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const { signInUser, googleSignIn } = UseAuth();
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const onSubmit = (signInData) => {
    const { email, password } = signInData;
    setError(""); // Clear previous error

    signInUser(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          title: user.displayName || "Success!",
          text: "Sign In Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        let errorMessage = "❌ Sign In Failed";

        if (error.code === "auth/user-not-found") {
          errorMessage = "❌ No account found with this email.";
        } else if (error.code === "auth/wrong-password") {
          errorMessage = "❌ Incorrect password.";
        } else if (error.code === "auth/invalid-email") {
          errorMessage = "❌ Invalid email format.";
        } else if (error.code === "auth/invalid-credential") {
          errorMessage =
            "❌ Invalid credentials. Please double-check your email and password.";
        } else {
          errorMessage = `❌ ${error.message}`;
        }

        setError(errorMessage);
      });
  };

  const handleGoogleSignIn = () => {
    setError(""); // Clear previous error
    googleSignIn()
      .then(() => {
        Swal.fire({
          title: "Success!",
          text: "Sign In Completed with Google!",
          icon: "success",
          confirmButtonText: "OK",
          confirmButtonColor: "#16a34a",
        }).then(() => {
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        setError(`❌ ${error.message}`);
      });
  };

  return (
    <div className="card bg-base-100 max-w-10/12 shrink-0 shadow-2xl">
      <div className="card-body">
        <h1 className="text-2xl text-center font-extrabold">Sign In Now</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="input input-success w-full"
              placeholder="Email"
            />
            {errors.email?.type === "required" && (
              <p className="text-red-500">Email is required</p>
            )}

            <label className="label mt-4">Password</label>
            <input
              {...register("password", { required: true, minLength: 6 })}
              type="password"
              className="w-full input input-success"
              placeholder="Password"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-500">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-500">
                Password must be at least 6 characters
              </p>
            )}

            <div className="mt-2">
              <a className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button type="submit" className="btn btn-success mt-4 w-full">
              Login
            </button>
          </fieldset>
        </form>

        {/* Show error message */}
        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}

        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-success">
            Register
          </Link>
        </p>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center gap-2 btn btn-outline w-full"
        >
          <FcGoogle size={24} /> Sign In with Google
        </button>
      </div>
    </div>
  );
};

export default SignIn;
