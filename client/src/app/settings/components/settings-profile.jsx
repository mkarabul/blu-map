export default function Profile() {
  return (
    <div className="flex flex-col w-36 content-center mb-4">
      <img
        src="/default-pfp.png"
        alt="User Avatar"
        className="self-center w-24 h-24 rounded-full object-cover mb-4"
      />
      <label
        htmlFor="avatar-upload"
        className="self-center cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-150 ease-in-out"
      >
        Change Avatar
        <input id="avatar-upload" type="file" className="hidden" />
      </label>
    </div>
  );
}
