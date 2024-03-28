export default function OtherDailyNotifications({
  id,
  hour,
  minute,
  setIsOpen,
}) {
  const handleDelete = (event) => {
    event.preventDefault();

    fetch(`/api/notification/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Error:", error);
      });
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <div>
        <span className="mr-2">{hour} :</span>
        <span className="">{minute}</span>
      </div>
      <button
        onClick={(event) => handleDelete(event)}
        className="bg-red-500 text-white px-2 py-1 rounded"
      >
        Delete
      </button>
    </div>
  );
}
