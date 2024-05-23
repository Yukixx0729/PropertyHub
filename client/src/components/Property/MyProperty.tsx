import { useEffect, useState } from "react";
import { useUser } from "../AuthorizeView";

type Property = {
  id: string;
  address: string;
  postcode: string;
  rent: number;
  bedroom: number;
  carSpot: number;
  availability: string;
  bathroom: number;
  summary: string;
};

type Properties = Property[];

const MyProperty = () => {
  const user = useUser();
  const { id } = user.details ?? {};
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [properties, setProperties] = useState<Properties | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
        if (id) {
          const res = await fetch(`http://localhost:5031/landlord/${id}`);
          const data = await res.json();
          console.log(data);
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProperties();
  }, [id]);

  return (
    <div>
      <div className="mx-5 mt-3  d-flex justify-content-center align-items-center">
        <h2 className="p-2 me-3">My Property</h2>
        <span className="p-2 ">
          {" "}
          <a className="btn btn-primary">Add a new property</a>
        </span>
      </div>
      {isLoading && <p>...loading</p>}

      {properties &&
        properties.length > 0 &&
        properties.map((property) => {
          return (
            <div key={property.id} className="card d-flex flex-row mx-5 my-4">
              <img
                src="property.jpg"
                alt="property pic"
                className="img-fluid property-img"
              />
              <div className="card-body text-center">
                <h5 className="card-title  text-danger">
                  ${property.rent} per week
                </h5>

                <div className="card-text mt-4">
                  {property.address}, {property.postcode}
                </div>
                <div className="card-text ">
                  Available Date: {property.availability.slice(0, 10)}
                </div>
                <div className="card-text">
                  {" "}
                  {property.bedroom} bedroom(s) ,{property.bathroom}{" "}
                  bathroom(s), {property.carSpot} carspot(s)
                </div>

                <div className="d-flex  justify-content-center align-items-center mt-4">
                  <a href="#" className="card-link me-3">
                    Marked as rented
                  </a>
                  <a href="#" className="card-link me-3">
                    Edit
                  </a>

                  <a href="#" className="card-link me-3 text-danger">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyProperty;
