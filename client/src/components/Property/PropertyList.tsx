import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Properties } from "../MyProperty/MyProperty";
import FilterPopup from "./FilterPopup";
import { filterDetails } from "../../pages/Home";

import ListRenderTemplate from "./ListRenderTemplate";

export const filterOutNullParams = (obj: any) => {
  return Object.keys(obj).forEach((key) => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });
};

const PropertyList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const searchParams = {
    postcode: queryParams.get("postcode"),
    minRent: queryParams.get("minRent"),
    maxRent: queryParams.get("maxRent"),
    minBedroom: queryParams.get("minBedroom"),
    maxBedroom: queryParams.get("maxBedroom"),
    isPetAllowed: queryParams.get("isPetAllowed"),
    carspot: queryParams.get("carspot"),
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [results, setResults] = useState<Properties | null>(null);
  const [updatedFilter, setUpdatedFilter] = useState(filterDetails);
  const [updatedPostcode, setUpdatedPostcode] = useState<string | null>(
    searchParams.postcode
  );

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedFilter((prevFilter) => ({
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
      if (updatedPostcode) {
        filterOutNullParams(updatedFilter);
        const queryString = new URLSearchParams(
          updatedFilter as any
        ).toString();
        navigate(`/search-results?postcode=${updatedPostcode}&${queryString}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchResults = async () => {
    filterOutNullParams(searchParams);
    const queryString = new URLSearchParams(searchParams as any).toString();
    try {
      if (queryString) {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5031/api/Properties/filter?${queryString}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setResults(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchResults();
    setLoading(false);
  }, [results]);

  return (
    <div className="container d-flex flex-column justify-content-between">
      <ListRenderTemplate
        loading={loading}
        results={results}
        currentPropertiesData={currentPropertiesData}
        handlePageClick={handlePageClick}
        itemsPerPage={itemsPerPage}
      />
      <div className="card mx-5 my-4 align-self-start d-flex flex-fill p-2 search-range shadow">
        <div className="card-body">
          <h3 className="card-title fw-bold">Search range:</h3>
          <label className="form-label">Postcode: </label>
          <input
            type="text"
            className=" mx-1 my-2 form-control form-control-sm"
            value={updatedPostcode || ""}
            onChange={(e) => setUpdatedPostcode(e.target.value)}
            name="postcode"
            required
          />
          {searchParams.minRent ? (
            <p className="card-text mx-1 my-2">
              Min Rent: {searchParams.minRent}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Min Rent: -- </p>
          )}
          {searchParams.maxRent ? (
            <p className="card-text mx-1 my-2">
              Max Rent: {searchParams.maxRent}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Max Rent: -- </p>
          )}
          {searchParams.minBedroom ? (
            <p className="card-text mx-1 my-2">
              Min Bedroom(s): {searchParams.minBedroom}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Min Bedroom(s): -- </p>
          )}
          {searchParams.maxBedroom ? (
            <p className="card-text mx-1 my-2 ">
              Max Bedroom(s): {searchParams.maxBedroom}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Max Bedroom(s): -- </p>
          )}
          {searchParams.isPetAllowed ? (
            <p className="card-text mx-1 my-2">
              Is Pet Allowed: {searchParams.isPetAllowed}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Is Pet Allowed: -- </p>
          )}

          {searchParams.carspot ? (
            <p className="card-text mx-1 my-2">
              Carspot: {searchParams.carspot}
            </p>
          ) : (
            <p className="card-text mx-1 my-2">Carspot: -- </p>
          )}
          <button
            className="btn btn-primary my-2"
            data-bs-toggle="modal"
            data-bs-target="#filterModal"
          >
            Reset Filter
          </button>
        </div>
      </div>

      <FilterPopup
        filterInfo={updatedFilter}
        handleChange={handleChange}
        handleConfirm={handleConfirm}
      />
    </div>
  );
};

export default PropertyList;
