import { useQuery } from "react-query";
import { getFriendsQueue } from "../api/getFriendsQueue";
import { Loading } from "./Loading";
import { FriendCard } from "./FriendCard";

const FriendsQueue = () => {
  const { data, isLoading, isSuccess } = useQuery("friendQueue", getFriendsQueue, {
    onSuccess(data) {
      const { friendRequests, friendInvitations } = data.data.queue;

      return (
        <div className="w-full max-h-96 overflow-y-scroll mt-5 ">
          {friendInvitations.map((friendData) => (
            <FriendCard key={friendData.id} avatar={""} data={friendData} />
          ))}
          {friendRequests.map((friendData) => (
            <FriendCard key={friendData.id} avatar={""} data={friendData} />
          ))}
        </div>
      );
    },
  });

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
            isInvitation
            data={friendData}
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
            data={friendData}
          />
        ))}
    </div>
  );
};

export default FriendsQueue;
