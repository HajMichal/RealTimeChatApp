import { useQuery, useMutation, useQueryClient } from "react-query";
import { useDebounce } from "../hooks/useDebounce";
import { getAllUsers } from "../api/getAllUsers";
import { addToQueue } from "../api/addToQueue";
import { useForm } from "react-hook-form";
import { searchedUser, userId } from "../interfaces";

import { BsPlusLg } from "react-icons/bs";
import { Input } from "@mantine/core";
import { BsSearch } from "react-icons/bs";
import { Loading } from "./Loading";
import { FriendCard } from "./FriendCard";
import toast, { Toaster } from "react-hot-toast";
import { useContext, useEffect } from "react";
import { MyContext } from "../App";

export const SearchBar = () => {
  const { _id } = useContext(MyContext);
  const { register, watch, setValue } = useForm();
  const debounceSearchedTerm = useDebounce(watch("searchedValue"), 500);

  const { data, isSuccess, isLoading } = useQuery({
    queryKey: ["searchedValue", debounceSearchedTerm],
    queryFn: () => getAllUsers(watch("searchedValue")),
    enabled: debounceSearchedTerm !== undefined && debounceSearchedTerm.length >= 2,
  });

  const queryClient = useQueryClient();
  const { mutate, isError } = useMutation(addToQueue, {
    onSuccess: () => {
      queryClient.invalidateQueries("friendQueue");
    },
  });

  const handleAddFriendToQueue = (
    clickedFriendId: number,
    mainUserId: number,
    clickedFriendName: string
  ) => {
    const newFriendData = {
      userId: mainUserId,
      friendId: clickedFriendId,
      friendName: clickedFriendName,
    };
    mutate(newFriendData);
  };

  useEffect(() => {
    if (isError) toast.error("This user is already in your queue or friend list.");
  }, [isError]);

  return (
    <div className="flex flex-wrap justify-center w-full absolute max-w-[280px] z-50 bg-white">
      <div>
        <Toaster />
      </div>
      <form className="w-full">
        <div id="searchBar" className="w-full my-5">
          <Input
            icon={<BsSearch />}
            radius="md"
            size="md"
            placeholder="Search..."
            {...register("searchedValue")}
            onBlur={(e) => {
              e.target.value = "";
              setValue("searchedValue", "");
            }}
            autoComplete="off"
          />
        </div>
      </form>
      <div className="max-h-96 w-full overflow-y-scroll items-center shadow-xl">
        {isLoading && <Loading />}

        {isSuccess &&
          data?.data.map((user: searchedUser, key: number) => (
            <div key={key} className="card w-auto ml-2 mb-2 flex justify-between hover:bg-slate-50">
              <FriendCard
                name={user.name}
                avatar="https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
              />
              <button
                className="absolute right-2 top-4 hover:scale-125 duration-100"
                onClick={() => handleAddFriendToQueue(user.id, _id!, user.name)}
                aria-label="add_user"
              >
                <div className="bg-green-100 rounded-full w-8 h-8 flex justify-center items-center">
                  <BsPlusLg className="w-5 h-5 text-brand " />
                </div>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};
