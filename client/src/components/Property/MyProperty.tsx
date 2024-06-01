import { useEffect, useState } from "react";
import { useUser } from "../AuthorizeView";
import { Link } from "react-router-dom";

export type Property = {
  id: string;
  address: string;
  postcode: string;
  rent: number;
  bedroom: number;
  carSpot: number;
  availability: string;
  bathroom: number;
  summary: string;
  isVacant: boolean;
  heater: boolean;
  cooler: boolean;
  isPetAllowed: boolean;
  applicationUser: any;
  wardrobes: boolean;
  landlordId: string;
  type: string;
};

type Properties = Property[];

const MyProperty = () => {
  const user = useUser();
  const { id } = user.details ?? {};
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<Properties | null>(null);

  const onClickDelete = async (id: string) => {
    await fetch(`http://localhost:5031/api/Properties/${id}`, {
      method: "DELETE",
    });

    await fetchProperties();
  };

  const onClickChangeStatus = async (propertyId: string) => {
    const property = properties?.filter((p) => p.id === propertyId);
    if (property && property.length > 0) {
      const { applicationUser, ...newProperty } = property[0];
      const updatedProperty = {
        ...newProperty,
        isVacant: !property[0].isVacant,
      };
      await fetch(`http://localhost:5031/api/Properties/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProperty),
      });
      await fetchProperties();
    }
  };

  const fetchProperties = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const res = await fetch(`http://localhost:5031/landlord/${id}`);
        const data = await res.json();

        setProperties(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [id]);

  return (
    <div>
      <div className="mx-5 mt-3  d-flex justify-content-center align-items-center">
        <h2 className="p-2 me-3">My Property</h2>
        <span className="p-2 ">
          {" "}
          <Link to={"/addproperty"} className="btn btn-primary">
            Add a new property
          </Link>
        </span>
      </div>
      {isLoading && <p>...loading</p>}
      {properties && properties.length === 0 && (
        <p className="mx-3 my-3 text-danger">
          You don't have any property yet.
        </p>
      )}
      {properties &&
        properties.length > 0 &&
        properties.map((property) => {
          return (
            <div key={property.id} className="card d-flex flex-row mx-5 my-4">
              <img
                src="property.jpg"
                alt="property pic"
                className="img-fluid property-img px-1 py-1 "
              />
              <div className="card-body text-center">
                <h5 className="card-title   mt-2">
                  {property.type.charAt(0).toUpperCase() +
                    property.type.slice(1)}
                  :
                  <span className="text-danger ms-2">
                    ${property.rent} per week
                  </span>
                </h5>

                <div className="card-text mt-4 mb-2">
                  {property.address}, {property.postcode}
                </div>
                <div className="card-text mb-2 ">
                  Available Date: {property.availability.slice(0, 10)}
                </div>
                <div className="card-text mb-2">
                  {" "}
                  {property.bedroom} bedroom(s), {property.bathroom}{" "}
                  bathroom(s), {property.carSpot} carspot(s)
                </div>

                <div className="d-flex  justify-content-center align-items-center mt-4">
                  <button
                    className="me-3 rounded p-1 px-3 btn btn-primary"
                    onClick={() => onClickChangeStatus(property.id)}
                  >
                    {property.isVacant
                      ? "Marked as rented"
                      : "Marked as available"}
                  </button>

                  <button className=" me-3 p-1 px-3 rounded btn btn-primary ">
                    <Link
                      to={`/editproperty/${property.id}`}
                      className="text-light link-underline link-underline-opacity-0"
                    >
                      Edit
                    </Link>
                  </button>

                  <button
                    className=" me-3  rounded p-1 px-3 btn btn-danger"
                    onClick={() => onClickDelete(property.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyProperty;
