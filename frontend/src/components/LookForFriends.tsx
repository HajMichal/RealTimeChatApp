import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import getAllUsers from "../api/getAllUsers";

import { FcPlus } from 'react-icons/fc'

import { useDebounce } from "../hooks/useDebounce";

import { arrayOfUsers } from "../interfaces";

const LookForFriends = () => {

    const { register, watch, setValue } = useForm();
    const debounceSearchedTerm = useDebounce(watch("searchedValue"), 500);


    const {data, isSuccess, isLoading} = useQuery({
        queryKey: ["searchedValue", debounceSearchedTerm],
        queryFn: () => getAllUsers(watch("searchedValue")),
        enabled: debounceSearchedTerm !== undefined && debounceSearchedTerm.length >= 2, 
        onSuccess: (data) => {
            data.data.map((user: arrayOfUsers) =>{
                console.log(user)
            })
        }
    }) 

    isSuccess ? console.log(data?.data) : null
  return (
    <div className="flex flex-wrap justify-center">
      <form className="w-full mx-4 mb-3">
        <div className="relative flex items-center">
          <BiSearchAlt className="absolute w-5 h-5 ml-3 " />
          <input type="search"
            {...register("searchedValue")}
            onBlur={(e) => {
              e.target.value = ''; 
              setValue('searchedValue', '')}}
            autoComplete="off"
            className="input input-bordered w-full mx-2 h-10 rounded-none pl-10"
            placeholder="Look for new Friends"
          />
        </div>
      </form>
      <div className="max-h-96 w-full overflow-scroll">

        {isLoading ? 
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
          </div>
        : null}

        {isSuccess ? data?.data.map((user: arrayOfUsers) => 
          <div className="card w-11/12 bg-dark shadow-xl ml-2 my-1 border border-brand">
          <div className="card-body text-mid w-3/4 overflow-x-hidden">
            <p className="">{user.name}</p>
            <button className="absolute right-5"><FcPlus className="w-7 h-7 rounded-full" /></button>
          </div>
        </div>
        ) : null}
        
      </div>
    </div>
  );
};

export default LookForFriends;
