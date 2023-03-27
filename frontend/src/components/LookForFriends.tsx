import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiSearchAlt } from "react-icons/bi";
import { useQuery } from "react-query";
import getAllUsers from "../api/getAllUsers";

import { useDebounce } from "../hooks/useDebounce";

import { arrayOfUsers } from "../interfaces";

const LookForFriends = () => {
    const [searchedValue, setSearchedValue] = useState("")

    const { register, watch } = useForm();
    const debounceSearchedTerm = useDebounce(watch("searchedValue"), 500);


    const {data} = useQuery({
        queryKey: ["searchedValue", debounceSearchedTerm],
        queryFn: () => getAllUsers(watch("searchedValue")),
        enabled: debounceSearchedTerm !== undefined && debounceSearchedTerm !== '', 
        onSuccess: (data) => {
            data.data.map((user: arrayOfUsers) =>{
                console.log(user)
            })
        }
    }) 
  return (
    <div className="flex flex-wrap justify-center">
      <form>
        <div className="relative flex items-center">
          <BiSearchAlt className="absolute w-5 h-5 ml-3 " />
          <input type="search"
            {...register("searchedValue")}
            // onChange={(e) => setSearchedValue(e.target.value)}
            autoComplete="off"
            className="input input-bordered w-full mx-2 h-10 rounded-none pl-10"
            placeholder="Look for new Friends"
          />
        </div>
      </form>
    </div>
  );
};

export default LookForFriends;
