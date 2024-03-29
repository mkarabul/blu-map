import ListFriends from "./component/ListFriends";
import SearchButton from "./component/SearchButton";

export default function FriendsPage() {
  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold mb-4 text-center">Friends Page</h1>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Your Friends</h1>
        <ListFriends />
        <h1 className="text-2xl font-bold mb-4 text-center">Search Friends</h1>
        <SearchButton />
      </div>
    </div>
  );
}
