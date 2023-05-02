import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDebounce } from "../hooks/useDebounce";
import { getAllUsers } from "../api/getAllUsers";
import { addToQueue } from "../api/addToQueue";
import { useForm } from "react-hook-form";
import { searchedUser, userId } from "../interfaces"; 

import { BiSearchAlt } from "react-icons/bi";
import { FcPlus } from "react-icons/fc";

const LookForFriends = (mainUserId: userId) => {
  const [err, setIsError] = useState(false)
  const { register, watch, setValue } = useForm();
  const debounceSearchedTerm = useDebounce(watch("searchedValue"), 500);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["searchedValue", debounceSearchedTerm],
    queryFn: () => getAllUsers(watch("searchedValue")),
    enabled:
      debounceSearchedTerm !== undefined && debounceSearchedTerm.length >= 2,
  });

  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation(addToQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendQueue");
    },
  });

  useEffect(() => {
    setIsError(isError)
  }, [error])

  const handleAddFriendToQueue = (clickedFriendId: number, mainUserId: number, clickedFriendName: string) => {
    const newFriendData = {
      userId: mainUserId,
      friendId: clickedFriendId,
      friendName: clickedFriendName
    };
    mutate(newFriendData);
  };

  return (
    <div className="flex flex-wrap justify-center">
        {err 
        ? <div className="alert alert-error shadow-lg absolute z-50 top-5 left-0">
            <div className="flex justify-center w-full">
              {/* @ts-ignore */}
              <span>{error?.response.data.message}</span>
              <svg onClick={() => setIsError(false)} xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-10 w-10 cursor-pointer -my-5 ml-5 " fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        :null}
      <form className="w-full mx-4 mb-3">
        <div className="relative flex items-center">
          <BiSearchAlt className="absolute w-5 h-5 ml-3 " />
          <input
            type="search"
            {...register("searchedValue")}
            onBlur={(e) => {
              e.target.value = "";
              setValue("searchedValue", "");
            }}
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
      <div className="max-h-96 w-full overflow-y-scroll items-center">
        {isLoading ? (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 border-2 border-t-dark rounded-full border-brand border-b-transparent animate-spin"></div>
          </div>
        ) : null}

        {isSuccess
          ? data?.data.map((user: searchedUser, key: number) => (
              <div
                key={key}
                className="card w-auto bg-dark shadow-xl ml-2 mb-2 border border-brand"
              >
                <div className="card-body text-mid w-3/4 overflow-x-hidden ">
                  <div className="flex items-center gap-3">
                    <div className="avatar -my-4">
                      <div className="w-12 rounded-full">
                        <img alt="avatar" src="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png" />
                      </div>
                    </div>
                    {user.name}
                  </div>
                  <button
                    className="absolute right-5"
                    onClick={() => handleAddFriendToQueue(user.id, mainUserId.mainUserId, user.name)}
                    aria-label="add_user"
                  >
                    <FcPlus className="w-7 h-7 rounded-full" />
                  </button>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default LookForFriends;
