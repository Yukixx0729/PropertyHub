import { useEffect, useState } from "react";
import { useUser } from "../AuthorizeView";

type Property = {
  id: string;
  address: string;
  postcode: string;
  rent: number;
  bedroom: number;
  carSpot: number;
  availability: Date;
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
      {isLoading && <p>...loading</p>}
      {properties &&
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
                <p className="card-text">{property.address}</p>
                <p className="card-text">
                  {" "}
                  {property.bedroom} bedroom(s) , {property.carSpot} carspot(s)
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default MyProperty;
