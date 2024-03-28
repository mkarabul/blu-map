import Trips from "./components/Trips";
import NewItineraryButton from "./components/NewItineraryButton";

const Page = () => {
  return (
    <div className={`container mx-auto px-8 my-8`}>
      <h1 className="text-center text-4xl font-bold mb-4">Trips</h1>
      <Trips />
      <NewItineraryButton />
    </div>
  );
};

export default Page;
