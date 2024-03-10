import Trips from "./components/Trips";
import UseItineraryButton from "./components/NewItineraryButton";

const Page = () => {
  return (
    <div className={`container mx-auto px-8 my-8`}>
      <h1 className="text-center text-4xl font-bold mb-4">Trips</h1>
      <Trips />
      <UseItineraryButton />
    </div>
  );
};

export default Page;
