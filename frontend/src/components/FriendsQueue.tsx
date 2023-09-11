import { useQuery } from "react-query";
import { getFriendsQueue } from "../api/getFriendsQueue";
import Queue from "./Queue";
import { QueueProps, queueData } from "../interfaces";
import { Loading } from "./Loading";
import { FriendCard } from "./FriendCard";

const FriendsQueue = () => {
  const { data, isLoading, isSuccess } = useQuery("friendQueue", getFriendsQueue, {
    onSuccess(data) {
      const { friendRequests, friendInvitations } = data.data.queue;

      return (
        <div className="w-full max-h-96 overflow-y-scroll mt-5 ">
          {friendInvitations.map((friendData) => (
            <FriendCard key={friendData.id} avatar={""} name={friendData.userName} />
          ))}
          {friendRequests.map((friendData) => (
            <FriendCard key={friendData.id} avatar={""} name={friendData.userName} />
          ))}
        </div>
      );
    },
  });
  console.log(data?.data.queue);
  if (isLoading) return <Loading />;

  return (
    <div className="w-full max-h-96 overflow-y-scroll mt-5 ">
      {isSuccess &&
        data.data.queue.friendInvitations.map((friendData) => (
          <FriendCard
            key={friendData.id}
            avatar={
              "https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
            }
            requestFriend
            name={friendData.friendName}
          />
        ))}
      {isSuccess &&
        data.data.queue.friendRequests.map((friendData) => (
          <FriendCard
            key={friendData.id}
            avatar={
              "https://w7.pngwing.com/pngs/122/295/png-transparent-open-user-profile-facebook-free-content-facebook-silhouette-avatar-standing.png"
            }
            requestFriend
            name={friendData.friendName}
          />
        ))}
    </div>
  );
};

export default FriendsQueue;
