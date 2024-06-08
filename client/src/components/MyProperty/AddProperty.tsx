import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Property } from "./MyProperty";
import { useUser } from "../AuthorizeView";
import PropertyForm from "./ProperyForm";

export const emptyProperty = {
  id: "",
  address: "",
  postcode: "",
  rent: 0,
  bedroom: 0,
  carSpot: 0,
  availability: "",
  bathroom: 0,
  summary: "",
  isVacant: true,
  heater: true,
  cooler: true,
  isPetAllowed: true,
  wardrobes: true,
  landlordId: "",
  applicationUser: null,
  type: "aparment",
  landlordUsername: "",
};

const AddProperty = () => {
  const user = useUser();
  const navigate = useNavigate();

  const [newProperty, setNewProperty] = useState<Property>(emptyProperty);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewProperty((prevProperty) => ({
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { id, applicationUser, ...updatedProperty } = newProperty;

    const parsedDate = Date.parse(updatedProperty.availability);
    if (!isNaN(parsedDate)) {
      updatedProperty.availability = new Date(parsedDate).toISOString();
    }

    updatedProperty.landlordId = user.details.id;
    try {
      await fetch("http://localhost:5031/api/Properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProperty),
      });
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/myproperty");
    }
  };

  return (
    <div className="container mt-3">
      {" "}
      <div className="mb-3 text-center">
        <h3>New Property</h3>
        <p className="text-danger">All information will be required.</p>
      </div>
      <PropertyForm
        handleChange={handleChange}
        newProperty={newProperty}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default AddProperty;
