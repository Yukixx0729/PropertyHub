import { useNavigate, useParams } from "react-router-dom";
import { Property } from "./MyProperty";
import { useEffect, useState } from "react";
import PropertyForm from "./ProperyForm";
import { emptyProperty } from "./AddProperty";
const EditProperty = () => {
  const navigate = useNavigate();
  let { propertyId } = useParams();
  const [updatedProperty, setUpdatedProperty] =
    useState<Property>(emptyProperty);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { applicationUser, ...editedProperty } = updatedProperty;
    const parsedDate = Date.parse(updatedProperty.availability);
    if (!isNaN(parsedDate)) {
      updatedProperty.availability = new Date(parsedDate).toISOString();
    }

    try {
      await fetch(`http://localhost:5031/api/Properties/${propertyId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProperty),
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/myproperty");
    }
  };

  const fetchPropertyInfo = async (id: string) => {
    try {
      setIsLoading(true);
      if (id) {
        const res = await fetch(`http://localhost:5031/api/Properties/${id}`);
        const data = await res.json();
        data.availability = data.availability.slice(0, 10);
        setUpdatedProperty(data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPropertyInfo(`${propertyId}`);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUpdatedProperty((prevProperty) => ({
      ...prevProperty,
      [name]:
        name === "heater" ||
        name === "cooler" ||
        name === "isPetAllowed" ||
        name === "wardrobes"
          ? value === "true"
          : name === "bedroom" ||
            name === "carSpot" ||
            name === "rent" ||
            name === "bathroom"
          ? Number(value)
          : value,
    }));
  };

  return (
    <div className="container mt-3">
      <div className="mb-3 text-center">
        <h3>Edit Property</h3>
      </div>
      {isLoading && <p>...loading</p>}
      <PropertyForm
        handleChange={handleChange}
        newProperty={updatedProperty}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default EditProperty;
