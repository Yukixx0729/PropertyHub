import { Link } from "react-router-dom";

const AddProperty = () => {
  return (
    <div className="container mt-3">
      {" "}
      <div className="mb-3 text-center">
        <h3>New Property</h3>
        <p className="text-danger">All information will be required.</p>
      </div>
      <form className="row g-4 ">
        <div className="mb-3 col-md-6">
          <label className="form-label">Address:</label>
          <input type="text" className="form-control" required />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Postcode:</label>
          <input type="text" className="form-control" />
        </div>
        <div className="mb-3 col-md-4">
          <label className="form-label">Rent per week:</label>
          <input type="number" className="form-control" />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Bedroom:</label>
          <input type="number" className="form-control" />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Bathroom:</label>
          <input type="number" className="form-control" />
        </div>
        <div className="mb-3 col-md-2">
          <label className="form-label">Carspot:</label>
          <input type="number" className="form-control" />
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Available date:</label>
          <input type="date" className="form-control" />
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Heater:</label>
          <select className="form-select">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Cooler:</label>
          <select className="form-select">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-3 col-md-6">
          <label className="form-label">Pet allowed?:</label>
          <select className="form-select">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className=" mb-3 col-md-6">
          <label className="form-label">Built-in wardrobe:</label>
          <select className="form-select">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
        <div className="mb-3 ">
          <label className="form-label">Summary:</label>
          <textarea className="form-control" rows={4} />
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
