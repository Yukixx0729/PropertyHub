import { useEffect, useState } from "react";
import ListRenderTemplate from "./ListRenderTemplate";
import { Properties } from "../MyProperty/MyProperty";
import FilterPopup from "./FilterPopup";
import { FilterInfo, filterDetails } from "../../pages/Home";
import { filterOutNullParams } from "./PropertyList";
import { useNavigate } from "react-router-dom";

const RecentPropertiesList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Properties | null>(null);
  const [postcode, setPostcode] = useState<string>("");
  const [filterInfo, setFilterInfo] = useState<FilterInfo>(filterDetails);
  //paginate
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPropertiesData =
    results && results.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageClick = (selectedPage: number) => {
    setCurrentPage(selectedPage);
    window.scrollTo(0, 0);
  };

  const fetchRecentProperties = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5031/api/Properties", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setResults(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const hanldeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilterInfo((prevFilter) => ({
      ...prevFilter,
      [name]:
        name === "isPetAllowed"
          ? value === ""
            ? null
            : value === "true"
          : value === ""
          ? null
          : value,
    }));
  };

  const handleConfirm = () => {
    try {
      if (postcode) {
        filterOutNullParams(filterInfo);
        const queryString = new URLSearchParams(filterInfo as any).toString();
        navigate(`/search-results?postcode=${postcode}&${queryString}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRecentProperties();
  }, []);
  return (
    <div className="container d-flex flex-col result-render">
      <ListRenderTemplate
        loading={loading}
        results={results}
        currentPropertiesData={currentPropertiesData}
        handlePageClick={handlePageClick}
        itemsPerPage={itemsPerPage}
      />
      <div className="card mx-5 my-4 align-self-start d-flex flex-fill p-2 search-range shadow">
        <div className="card-body">
          <h4 className="card-title fw-bold">Search range:</h4>
          <label className="form-label">Postcode: </label>
          <input
            type="text"
            className=" mx-1 my-2 form-control form-control-sm"
            value={postcode || ""}
            onChange={(e) => setPostcode(e.target.value)}
            name="postcode"
            required
          />
          <button
            className="btn btn-primary my-2"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            Set Filter
          </button>
          <FilterPopup
            filterInfo={filterInfo}
            handleChange={hanldeChange}
            handleConfirm={handleConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default RecentPropertiesList;
