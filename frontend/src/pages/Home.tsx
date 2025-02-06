import { useQuery } from "react-query";
import * as apiclient from "../api-client";
import LatestDestinationCard from "../components/LatestDestinationCard";

const Home = () => {
  const { data: hotels } = useQuery("fetchHotels", () =>
    apiclient.fetchHotel()
  );
  if (!hotels) {
    return undefined;
  }
  const topRowHotels = hotels.slice(0, 2) || [];
  const bottomRowHotels = hotels.slice(2) || [];

  return (
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destination</h2>
      <p>Most recent destination added by our hosts</p>

      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          {topRowHotels.map((hotel, id) => (
            <LatestDestinationCard hotel={hotel} key={id} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {bottomRowHotels.map((hotel, id) => (
            <LatestDestinationCard hotel={hotel} key={id} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Home;
