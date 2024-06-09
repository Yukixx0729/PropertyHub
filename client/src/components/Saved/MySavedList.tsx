import { useEffect, useState } from "react";
import { Property } from "../MyProperty/MyProperty";
import { useUser } from "../AuthorizeView";
import { Link } from "react-router-dom";

type MySaved = {
  id: string;
  renterId: string;
  propertyId: string;
  property: Property;
};

type MySaveds = MySaved[];

const MySavedList = () => {
  const user = useUser();
  const { id } = user.details ?? {};
  const [loading, setLoading] = useState<boolean>(false);
  const [mySavedList, setMySavedList] = useState<MySaveds | null>(null);

  const fetchMySavedData = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await fetch(
          `http://localhost:5031/api/MySaveds/renter/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
        setMySavedList(data);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`http://localhost:5031/api/MySaveds/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      fetchMySavedData();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMySavedData();
  }, [id]);

  if (loading) return <p className="mt-3 text-danger mx-3 my-3">...Loading</p>;

  return (
    <div className="container mt-3">
      <h3 className="text-center mt-3">My Saved List</h3>
      {!mySavedList?.length && (
        <p className="text-danger mx-3 my-3">No result found.</p>
      )}
      {mySavedList &&
        mySavedList.length > 0 &&
        mySavedList.map((m: MySaved) => {
          if (m.property.isVacant) {
            return (
              <div className="card d-flex flex-row mx-5 my-4 shadow" key={m.id}>
                <Link to={`/property/${m.propertyId}`}>
                  {" "}
                  <img
                    src="/property.jpg"
                    alt="property pic"
                    className="img-fluid property-img px-1 py-1 "
                  />
                </Link>
                <div className="card-body  d-flex align-items-center flex-column justify-content-center">
                  <Link
                    to={`/property/${m.propertyId}`}
                    className="card-title  mx-2"
                  >
                    {m.property.address}, {m.property.postcode}
                  </Link>
                  <div className="card-text mb-2">
                    Type:{" "}
                    <span className="text-capitalize">{m.property.type}</span>
                  </div>
                  <div className="card-text mb-2">
                    Rent:{" "}
                    <span className="text-danger fw-bold">
                      ${m.property.rent}
                    </span>{" "}
                    per week
                  </div>
                  <div className="card-text mb-2 ">
                    Available Date: {m.property.availability.slice(0, 10)}
                  </div>
                  <div className="card-text mb-2">
                    {" "}
                    {m.property.bedroom} bedroom(s), {m.property.bathroom}{" "}
                    bathroom(s), {m.property.carSpot} carspot(s)
                  </div>
                  <div className="card-text mb-2">
                    Is vacant ?{" "}
                    {m.property.isVacant ? (
                      <span className="fw-bold">Yes</span>
                    ) : (
                      <span className="fw-bold text-danger">No</span>
                    )}
                  </div>
                  <div className="card-text mb-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete(m.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return (
              <div
                className="card d-flex flex-row mx-5 my-4 shadow inactive"
                key={m.id}
              >
                {" "}
                <img
                  src="/property.jpg"
                  alt="property pic"
                  className="img-fluid property-img px-1 py-1 "
                />
                <div className="card-body  d-flex align-items-center flex-column justify-content-center">
                  <div className="card-title  mx-2">
                    {m.property.address}, {m.property.postcode}
                  </div>
                  <div className="card-text mb-2">
                    Type:{" "}
                    <span className="text-capitalize">{m.property.type}</span>
                  </div>
                  <div className="card-text mb-2">
                    Rent:{" "}
                    <span className="text-danger fw-bold">
                      ${m.property.rent}
                    </span>{" "}
                    per week
                  </div>
                  <div className="card-text mb-2 ">
                    Available Date: {m.property.availability.slice(0, 10)}
                  </div>
                  <div className="card-text mb-2">
                    {" "}
                    {m.property.bedroom} bedroom(s), {m.property.bathroom}{" "}
                    bathroom(s), {m.property.carSpot} carspot(s)
                  </div>
                  <div className="card-text mb-2">
                    Is vacant ?{" "}
                    {m.property.isVacant ? (
                      <span className="fw-bold">Yes</span>
                    ) : (
                      <span className="fw-bold text-danger">No</span>
                    )}
                  </div>
                  <div className="card-text mb-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => handleDelete(m.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default MySavedList;