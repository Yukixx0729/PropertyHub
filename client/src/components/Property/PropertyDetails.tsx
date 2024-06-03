import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Property } from "./MyProperty";
import { useUser } from "../AuthorizeView";

const PropertyDetails = () => {
  const user = useUser();
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const propertyInfo = async (id: string) => {
    try {
      if (id) {
        const res = await fetch(`http://localhost:5031/api/Properties/${id}`);
        const data = await res.json();

        setProperty(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    propertyInfo(`${propertyId}`);
  }, []);

  return (
    <div className="container-md d-flex justify-content-center">
      {property && (
        <div className="card my-3 px-1" style={{ maxWidth: "55rem" }}>
          <div className=" text-center">
            {" "}
            <img
              src="/property.jpg"
              alt="property pic"
              className="card-img-top img-fluid py-1"
            />
          </div>
          <div className=" mt-3  px-3">
            <h5 className="fw-bold">Property information</h5>
            <p>Rent: ${property.rent} per week</p>
            <p>
              Address: {property.address}, {property.postcode}
            </p>
            <p>
              <span className="text-capitalize">{property.type}: </span>
              {property.bedroom} bedroom(s), {property.bathroom} bathroom(s),{" "}
              {property.carSpot} carspot(s)
            </p>
            <p>Available date: {property.availability.slice(0, 10)}</p>
          </div>
          <div className="d-flex flex-row px-3 justify-content-between mt-3">
            <div>
              <h5 className="fw-bold">Property features</h5>
              <ul className="fw-3">
                <li>
                  Cooler:{" "}
                  {property.cooler ? <span>Yes ✅</span> : <span>No ❎</span>}
                </li>
                <li>
                  Heater:{" "}
                  {property.heater ? <span>Yes ✅</span> : <span>No ❎</span>}
                </li>
                <li>
                  Pet allowed:{" "}
                  {property.isPetAllowed ? (
                    <span>Yes ✅</span>
                  ) : (
                    <span>No ❎</span>
                  )}
                </li>
                <li>
                  Built-in Wardrobes:{" "}
                  {property.wardrobes ? (
                    <span>Yes ✅</span>
                  ) : (
                    <span>No ❎</span>
                  )}
                </li>
              </ul>
            </div>
            {user.details.id !== property.landlordId && (
              <div className="d-flex flex-column gap-3 py-4 px-5">
                <a
                  href={`mailto:${property.landlordUsername}`}
                  className="btn btn-primary"
                >
                  Email Landlord
                </a>
                <button className="btn btn-primary">⭐️ Saved this</button>
              </div>
            )}
          </div>
          <div className="px-3 mt-3">
            <h5 className="fw-bold">Some words from the landlord...</h5>
            <p className="bg-gray-300">{property.summary}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
