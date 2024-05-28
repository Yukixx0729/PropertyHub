import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Property } from "./MyProperty";
import { useUser } from "../AuthorizeView";

const AddProperty = () => {
  const user = useUser();
  const navigate = useNavigate();
  const emptyProperty = {
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
  };

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
      <form className="row g-4 " onSubmit={handleSubmit}>
        <div className="mb-3 col-md-6">
          <label className="form-label">Address:</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={newProperty.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Postcode:</label>
          <input
            type="text"
            className="form-control"
            name="postcode"
            value={newProperty.postcode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label">Rent per week:</label>
          <input
            type="number"
            className="form-control"
            name="rent"
            value={newProperty.rent}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Bedroom:</label>
          <input
            type="number"
            className="form-control"
            value={newProperty.bedroom}
            name="bedroom"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Bathroom:</label>
          <input
            type="number"
            className="form-control"
            name="bathroom"
            value={newProperty.bathroom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Carspot:</label>
          <input
            type="number"
            className="form-control"
            name="carSpot"
            value={newProperty.carSpot}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Available date:</label>
          <input
            type="date"
            className="form-control"
            name="availability"
            value={newProperty.availability}
            onChange={handleChange}
            required
          />
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Heater:</label>
          <select
            className="form-select"
            name="heater"
            value={newProperty.heater.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Cooler:</label>
          <select
            className="form-select"
            name="cooler"
            value={newProperty.cooler.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Pet allowed?:</label>
          <select
            className="form-select"
            name="isPetAllowed"
            value={newProperty.isPetAllowed.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Built-in wardrobe:</label>
          <select
            className="form-select"
            name="wardrobe"
            value={newProperty.wardrobes.toString()}
            onChange={handleChange}
          >
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label className="form-label">Summary:</label>
          <textarea
            className="form-control"
            rows={4}
            name="summary"
            value={newProperty.summary}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3 ">
          <button type="submit" className="btn btn-primary me-3">
            Confirm
          </button>
          <Link to={"/myproperty"} className="btn btn-secondary ">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default AddProperty;
