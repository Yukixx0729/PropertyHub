import { useEffect, useState } from "react";
import { useUser } from "../components/AuthorizeView";

interface FilterInfo {
  rent: number;
  bedroom: number;
  carSpot: number;
  isVacant: boolean;
  heater: boolean;
  cooler: boolean;
  isPetAllowed: boolean;
  wardrobes: boolean;
}

const Home = () => {
  const filterDetails = {
    rent: 0,
    bedroom: 0,
    carSpot: 0,
    isVacant: true,
    heater: false,
    cooler: false,
    isPetAllowed: false,
    wardrobes: false,
  };
  const [filter, setFilter] = useState<boolean>(false);
  const [filterInfo, setFilterInfo] = useState<FilterInfo>(filterDetails);

  const user = useUser();

  useEffect(() => {
    user.fetchUser();
  }, []);

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container position-absolute top-50 d-flex justify-content-center">
      <form>
        <input placeholder="Key in the postcode.." className="me-2"></input>
        <button className="me-2 btn btn-secondary">Filters</button>
        <button className="btn btn-primary">Search</button>
      </form>
    </div>
  );
};

export default Home;
