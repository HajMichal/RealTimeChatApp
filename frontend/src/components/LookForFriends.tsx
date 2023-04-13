import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDebounce } from "../hooks/useDebounce";
import getAllUsers from "../api/getAllUsers";
import addFriend from "../api/addFriend";
import { useForm } from "react-hook-form";
import { searchedUser, userId } from "../interfaces";

import { BiSearchAlt } from "react-icons/bi";
import { FcPlus } from 'react-icons/fc'


const LookForFriends = (mainUserId: userId) => {

    const { register, watch, setValue } = useForm();
    const debounceSearchedTerm = useDebounce(watch("searchedValue"), 500);


    const {data, isSuccess, isLoading} = useQuery({
        queryKey: ["searchedValue", debounceSearchedTerm],
        queryFn: () => getAllUsers(watch("searchedValue")),
        enabled: debounceSearchedTerm !== undefined && debounceSearchedTerm.length >= 2,
    }) 

    const queryClient = useQueryClient()
    const { mutate, isError, error } = useMutation( addFriend,  {
      onSuccess: () => {
        queryClient.invalidateQueries("friendList")
      },
    } )

    const handleAddFriend = (clickedFriend: searchedUser,  mainUserId: userId) => {
      const newFriendData = {
        friendsName: clickedFriend.name,
        friendsId: clickedFriend.id,
        mainUserId: mainUserId.mainUserId
      }
      mutate(newFriendData)
    }
    
    // @ts-ignore
    if(error) console.log(error.response.data.message)

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
            className={
              isError 
              ? "input input-bordered input-error w-full mx-2 h-10 rounded-none pl-10" 
              : "input input-bordered w-full mx-2 h-10 rounded-none pl-10"
            }
            placeholder="Look for new Friends"
          />
        </div>
      </form>
      <div className="max-h-96 w-full overflow-y-scroll">

        {isLoading ? 
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
          </div>
        : null}

        {isSuccess ? data?.data.map((user: searchedUser, key:number) => 
          <div key={key} className="card w-11/12 bg-dark shadow-xl ml-2 my-1 border border-brand">
            <div className="card-body text-mid w-3/4 overflow-x-hidden ">
              <div className="flex items-center gap-3">
                <div className="avatar -my-4">
                  <div className="w-12 rounded-full">
                    <img src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
                  </div>
                </div>
                {user.name}
                </div>
              <button onClick={ () => handleAddFriend(user , mainUserId) } className="absolute right-5"><FcPlus className="w-7 h-7 rounded-full" /></button>
            </div>
          </div>
        ) : null}

      </div>
    </div>
  );
};

export default LookForFriends;
