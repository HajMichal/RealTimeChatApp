import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useMutation } from "react-query"

import { postData } from '../api/loginApi' 

interface user {
  email: string,
  password: string
}

const login = () => {

  const navigate = useNavigate();

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const submitForm = (data: user) => {
    const user = {...data}
    mutate(user)
  }

  const { mutate } = useMutation( postData, {
    onSuccess: (data) => {
      console.log(data)
      navigate("/", { replace: true})
    }
  })

  return (
    <div className="w-full flex justify-center bg-dark tablet:bg-light h-screen">
    <div className="bg-dark desktop:w-1/3 tablet:h-min tablet:mt-16 max-w-md rounded-sm">
      <h1 className="w-full text-light text-center text-4xl font-semibold my-3">
        <div className="mx-6">
          <label className="text-brand">Real</label>time{" "}
          <label className="text-brand">chat</label>APP
        </div>
      </h1>
      <hr className="text-light my-5" />
      <form onSubmit={handleSubmit(submitForm)} action="POST" className="w-full p-3 flex flex-wrap justify-center">
        <div className="form-control w-full max-w-xs mb-4">
          <label className="label">
            <span className="label-text">Type in your e-mail</span>
          </label>
          <input
            {...register("email", { required: { value: true, message: "Field required"}})}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />

        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Type in your password</span>
          </label>
          <input
          {...register("password", { required: { value: true, message: "Field required"}})}
            type="password"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
        </div>
        <button className="btn btn-wide glass my-6 bg-brand text-light">Wide</button>
      </form>
      <div>
        <fieldset className="border-t-2 border-mid mx-10">
          <legend className="mx-auto px-5 text-mid text-2xl font-semibold italic">Or</legend>
          <div className="w-full pt-4 text-center text-mid font-medium text-lg mb-8">
            <Link to="/register" className="hover:text-light">Create new Account !</Link>
          </div>
        </fieldset>
      </div>
    </div>
  </div>
  )
}

export default login