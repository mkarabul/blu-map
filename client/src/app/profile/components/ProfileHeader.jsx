export default function ProfileHeader({ userName, postCount }) {
  return (
    <div className="profile-header bg-primary w-full text-center p-10 relative flex flex-col items-center justify-center">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img src="/default-pfp.png" />
        </div>
      </div>
      <p className="text-white text-base mt-4">{userName}</p>
      <div className="flex space-x-4 text-white text-base mt-4">
        <p>Followers: 0</p>
        <p>Posts: {postCount}</p>
      </div>
      <div className="absolute top-2 right-2 text-white text-base cursor-pointer">
        Edit
      </div>
    </div>
  );
}
