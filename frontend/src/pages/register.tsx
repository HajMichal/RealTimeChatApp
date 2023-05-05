import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { createUser } from "../api/loginApi";

import { newUser } from "../interfaces";

const register = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitForm = (data: newUser) => {
    const user = { ...data };
    mutate(user);
  };

  const { mutate, isError, error, isLoading } = useMutation(createUser, {
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return (
    <div className="w-full flex justify-center bg-dark laptop:pt-36 h-screen">
      <div className="bg-dark desktop:w-1/3 tablet:h-min tablet:mt-16 max-w-md ">
        <h1 className="w-full text-light text-center text-4xl font-semibold my-3">
          <div className="mx-6">
            <label className="text-brand">Real</label>time{" "}
            <label className="text-brand">chat</label>APP
          </div>
        </h1>
        <hr className="text-light my-5" />
        <form
          action="POST"
          onSubmit={handleSubmit(submitForm)}
          className="w-full p-3 flex flex-wrap justify-center"
        >
          <div className="form-control w-full max-w-xs">
            <label className="label">
              {
                isError && (error as any).response.data.message === "Short name" 
                ? <span className="label-text text-error">Name is too short</span>
                : <span className="label-text">What's your name?</span>
              }
            </label>
            <input
              {...register("name", {
                required: { value: true, message: "Field required" },
              })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs my-4">
          <label className="label">
              {
                isError && (error as any).response.data.message === "Already exists" 
                ? <span className="label-text text-error">E-mail already exists</span>
                : <span className="label-text">What's your e-mail?</span>
              }
            </label>
            <input
              {...register("email", {
                required: { value: true, message: "Field required" },
              })}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Set your password</span>
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Field required" },
              })}
              type="password"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
          <button
            className={
              isLoading
                ? "btn btn-wide glass my-6 bg-brand text-light btn-disabled"
                : "btn btn-wide glass my-6 bg-brand text-light"
            }
            disabled={isLoading}
          >
            Create Account
          </button>
          {isLoading ? (
            <div className="flex justify-center items-center absolute w-full -mt-6">
              <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
            </div>
          ) : null}
        </form>
        <div>
          <fieldset className="border-t-2 border-mid mx-10">
            <legend className="mx-auto px-5 text-mid text-2xl font-semibold italic">
              Or
            </legend>
            <div className="w-full pt-4 text-center text-mid font-medium text-lg mb-8">
              <Link to="/login" className="hover:text-light">
                Log in!
              </Link>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default register;
