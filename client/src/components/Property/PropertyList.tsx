import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Properties, Property } from "../MyProperty/MyProperty";

const PropertyList = () => {
  const location = useLocation();
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

  const [results, setResults] = useState<Properties | null>(null);

  const filterOutNullParams = (obj: any) => {
    return Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });
  };

  useEffect(() => {
    const fetchResults = async () => {
      filterOutNullParams(searchParams);
      const queryString = new URLSearchParams(searchParams as any).toString();
      try {
        if (queryString) {
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
    fetchResults();
  }, []);

  return (
    <div className="container">
      {results && results.length === 0 && (
        <p className="text-danger mt-3">No result found.</p>
      )}
      {results &&
        results.length > 0 &&
        results.map((p: Property) => {
          return <div className="card mt-5" key={p.id}></div>;
        })}
    </div>
  );
};

export default PropertyList;
