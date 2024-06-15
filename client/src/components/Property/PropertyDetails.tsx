import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Property } from "../MyProperty/MyProperty";
import { useUser } from "../AuthorizeView";
import { MySaved } from "../Saved/MySavedList";

const PropertyDetails = () => {
  const user = useUser();
  const { id } = user.details ?? {};
  const navigate = useNavigate();
  const { propertyId } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [isSaved, setIsSaved] = useState<boolean>(false);
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

  const checkIfSaved = async (id: string, propertyId: string) => {
    try {
      if (id) {
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
        const saved = data.some((s: MySaved) => s.propertyId === propertyId);

        setIsSaved(saved);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    propertyInfo(`${propertyId}`);
    checkIfSaved(`${id}`, `${propertyId}`);
  }, [id]);

  const handleClickSavedBtn = async (propertyId: string) => {
    try {
      if (propertyId && id) {
        await fetch(`http://localhost:5031/api/MySaveds`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            renterId: id,
            propertyId: propertyId,
          }),
        });
        checkIfSaved(`${id}`, `${propertyId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!property?.isVacant)
    return (
      <p className="mt-3 text-danger mx-3 my-3">
        Sorry, this property is not vacant or offline.
      </p>
    );

  return (
    <div className="container-md d-flex justify-content-center">
      {property?.isVacant && (
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
            {user.details.id && user.details.id !== property.landlordId ? (
              <div className="d-flex flex-column gap-3 py-4 px-5">
                <a
                  href={`mailto:${property.landlordUsername}`}
                  className="btn btn-primary"
                >
                  Email Landlord
                </a>
                <button
                  className="btn btn-primary"
                  onClick={() => handleClickSavedBtn(property.id)}
                  disabled={isSaved}
                >
                  {isSaved ? "⭐️ Saved" : "⭐️ Save this"}
                </button>
              </div>
            ) : property.landlordId !== user.details.id ? (
              <div className="d-flex flex-column gap-3 py-4 px-5">
                <button
                  onClick={() => navigate("/log-in")}
                  className="btn btn-primary"
                >
                  Email Landlord
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/log-in")}
                >
                  ⭐️ Saved this
                </button>
              </div>
            ) : null}
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
