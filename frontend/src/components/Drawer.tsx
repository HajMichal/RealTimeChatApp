import { BiMenu } from "react-icons/bi";
import { useQuery } from "react-query";
import FriendsList from "./FriendsList";
import FriendsQueue from "./FriendsQueue";
import LookForFriends from "./SearchBar";
import { getCurrentUserData } from "../api/getUserApi";
import "flowbite";

const Drawer = () => {
  const { data } = useQuery("user", getCurrentUserData, {
    retry: 2,
    retryDelay: 700,
  });

  return (
    <>
      <div className="text-center">
        <button
          className="text-white text-center bg-brand glass focus:ring-4 w-11 h-11 focus:ring-mid font-medium rounded-lg text-sm  my-2    focus:outline-none"
          type="button"
          aria-label="options"
          data-drawer-target="drawer-left-example"
          data-drawer-show="drawer-left-example"
          data-drawer-placement="left"
          aria-controls="drawer-left-example"
        >
          <BiMenu className="h-8 w-11 text-light" />
        </button>
      </div>

      {/* <!-- drawer component --> */}

      <div
        id="drawer-left-example"
        className="fixed top-5 left-0 z-50 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-dark w-64 border-brand border-2 rounded-md"
        tabIndex={-1}
        aria-labelledby="drawer-left-label"
      >
        <div>
          <h1 className="w-full text-center mt-2 font-semibold text-4xl italic">
            <span className="text-brand">Chat</span>App
          </h1>
          <h2 className="w-full mt-5 text-center text-2xl">Hey {data?.data.name}</h2>
        </div>
        <div className="w-full mt-5">
          <LookForFriends mainUserId={data?.data.id} />
          <FriendsQueue />
          <FriendsList />
        </div>
      </div>
    </>
  );
};

export default Drawer;
