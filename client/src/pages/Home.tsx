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

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="home d-flex justify-content-center align-items-center">
      <div className="px-4 py-3 bg-white rounded">
        {" "}
        <form className="d-flex justify-content-around">
          <input
            placeholder="Key in the postcode.."
            className="form-control me-2"
          ></input>
          <button className=" btn btn-secondary me-2">Filters</button>
          <button className="btn btn-danger">Search</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
