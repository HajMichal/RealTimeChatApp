import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

import { postData } from "../api/loginApi";

import { user } from "../interfaces";

const login = () => {
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm = (data: user) => {
    const user = { ...data };
    mutate(user);
  };

  const { mutate, isLoading, isError, error } = useMutation(postData, {
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });
  return (
    <div className="w-full flex justify-center bg-dark laptop:pt-40 h-screen">
      <div className="bg-dark desktop:w-1/3 tablet:h-min tablet:mt-16 max-w-md rounded-sm">
        <h1 className="w-full text-light text-center text-4xl font-semibold my-3">
          <div className="mx-6">
            <label className="text-brand">Real</label>time{" "}
            <label className="text-brand">chat</label>APP
          </div>
        </h1>
        <hr className="text-light my-5" />
        <form
          onSubmit={handleSubmit(submitForm)}
          action="POST"
          className="w-full p-3 flex flex-wrap justify-center"
        >
          <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
              {
                isError && (error as any).response.data.message === "Invalid E-mail" 
                ? <span className="label-text text-error">Invalid e-mail</span>
                : <span className="label-text">E-mail</span>
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
              {
                isError && (error as any).response.data.message === "Invalid Password" 
                ? <span className="label-text text-error">Invalid password</span>
                : <span className="label-text">Password</span>
              }
            </label>
            <input
              {...register("password", {
                required: { value: true, message: "Field required" },
              })}
              type="password"
              placeholder="Type here"
              className={isError ? "input input-error input-bordered w-full max-w-xs" :"input input-bordered w-full max-w-xs"}
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
            Log in!
          </button>
          {
            isLoading 
            ? (
                <div className="flex justify-center items-center absolute w-full -mt-6">
                  <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
                </div>
              ) 
            : null
          }
        </form>
        <div>
          <fieldset className="border-t-2 border-mid mx-10">
            <legend className="mx-auto px-5 text-mid text-2xl font-semibold italic">
              Or
            </legend>
            <div className="w-full pt-4 text-center text-mid font-medium text-lg mb-8">
              <Link to="/register" className="hover:text-light">
                Create new Account !
              </Link>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default login;
