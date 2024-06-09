import { FilterInfo } from "../../pages/Home";

type FilterProps = {
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  filterInfo: FilterInfo;
  handleConfirm: () => void;
};

const FilterPopup: React.FC<FilterProps> = ({
  filterInfo,
  handleChange,
  handleConfirm,
}) => {
  return (
    <div
      className="modal fade"
      id="filterModal"
      tabIndex={-1}
      aria-labelledby="filterModal"
      aria-hidden="true"
    >
      <div className="modal-dialog ">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="filterModalLabel">
              Filters
            </h1>
          </div>
          <div className="modal-body">
            <div className="row g-4">
              <div className="mb-2 col-sm-6">
                <label className="form-label">Min Rent: $</label>
                <input
                  type="number"
                  className="form-control"
                  name="minRent"
                  value={filterInfo.minRent || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-sm-6">
                <label className="form-label">Max Rent: $</label>
                <input
                  type="number"
                  className="form-control"
                  name="maxRent"
                  value={filterInfo.maxRent || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-sm-6">
                <label className="form-label">Min Bedroom: </label>
                <input
                  type="number"
                  className="form-control"
                  name="minBedroom"
                  value={filterInfo.minBedroom || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-sm-6">
                <label className="form-label">Max Bedroom: </label>
                <input
                  type="number"
                  className="form-control"
                  name="maxBedroom"
                  value={filterInfo.maxBedroom || ""}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-2 col-sm-6">
                <label className="form-label">Is pet allowed? </label>
                <select
                  className="form-select"
                  name="isPetAllowed"
                  value={
                    filterInfo.isPetAllowed !== null &&
                    filterInfo.isPetAllowed !== undefined
                      ? filterInfo.isPetAllowed.toString()
                      : ""
                  }
                  onChange={handleChange}
                >
                  <option value=""> - </option>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </select>
              </div>
              <div className="mb-2 col-sm-6">
                <label className="form-label">Carspot: </label>
                <input
                  type="number"
                  className="form-control"
                  name="carspot"
                  value={filterInfo.carspot || ""}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleConfirm}
              data-bs-dismiss="modal"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;
