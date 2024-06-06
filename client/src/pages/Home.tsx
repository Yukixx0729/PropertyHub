import { useState } from "react";
import { useUser } from "../components/AuthorizeView";
import FilterPopup from "../components/FilterPopup";

export type FilterInfo = {
  minRent: number | null;
  maxRent: number | null;
  minBedroom: number | null;
  maxBedroom: number | null;
  isPetAllowed: boolean | null;
  carspot: number | null;
};

const Home = () => {
  const filterDetails = {
    minRent: null,
    maxRent: null,
    minBedroom: null,
    maxBedroom: null,
    isPetAllowed: null,
    carspot: null,
  };

  const [filterInfo, setFilterInfo] = useState<FilterInfo>(filterDetails);
  const [postcode, setPostcode] = useState("");
  const [query, setQuery] = useState("");

  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  const hanldeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterInfo((prevFilter) => ({
      ...prevFilter,
      [name]:
        name === "isPetAllowed"
          ? value === "true"
          : value === ""
          ? null
          : value,
    }));
  };

  const handleConfirm = () => {
    const activeFilters = Object.entries(filterInfo).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          (acc as any)[key] = value;
        }
        return acc;
      },
      {} as Partial<FilterInfo>
    );

    const queryString = new URLSearchParams(activeFilters as any).toString();
    setQuery(queryString);
  };

  return (
    <>
      <div className="home d-flex justify-content-center align-items-center">
        <div className="px-4 py-3 bg-white rounded">
          {" "}
          <form className="d-flex justify-content-around">
            <input
              placeholder="Key in the postcode.."
              className="form-control me-2"
              value={postcode}
              name="postcode"
              onChange={(e) => setPostcode(e.target.value)}
              required
            />
            <button
              className=" btn btn-secondary me-2"
              data-bs-toggle="modal"
              data-bs-target="#filterModal"
            >
              Filters
            </button>
            <button className="btn btn-danger">Search</button>
          </form>
        </div>
      </div>
      <FilterPopup
        filterInfo={filterInfo}
        handleChange={hanldeChange}
        handleConfirm={handleConfirm}
      />
    </>
  );
};

export default Home;
