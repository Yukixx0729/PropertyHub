import { Link } from "react-router-dom";
import { Property } from "./MyProperty";

type PropertyFormProps = {
  handleChange: (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => void;
  newProperty: Property;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const PropertyForm: React.FC<PropertyFormProps> = ({
  handleChange,
  newProperty,
  handleSubmit,
}) => {
  return (
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
      <div className="mb-3 col-md-3">
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
      <div className=" mb-3 col-md-3">
        <label className="form-label">Property type:</label>
        <select
          className="form-select"
          name="type"
          onChange={handleChange}
          value={newProperty.type}
          required
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="townhouse">Townhouse</option>
          <option value="studio">Studio</option>
          <option value="unit">Unit</option>
          <option value="others">Others</option>
        </select>
      </div>
      <div className="mb-3 col-md-3">
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
      <div className="mb-3 col-md-3">
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
      <div className="mb-3 col-md-3">
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
      <div className="mb-3 col-md-3">
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
      <div className=" mb-3 col-md-3">
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
      <div className=" mb-3 col-md-3">
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
      <div className="mb-3 text-center">
        <button type="submit" className="btn btn-primary me-3">
          Confirm
        </button>
        <Link to={"/myproperty"} className="btn btn-secondary ">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default PropertyForm;
