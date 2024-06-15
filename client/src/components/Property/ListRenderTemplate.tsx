import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import { Properties, Property } from "../MyProperty/MyProperty";

type ListProps = {
  loading: boolean;
  results: Properties | null;
  currentPropertiesData: Properties | null;
  handlePageClick: (select: number) => void;
  itemsPerPage: number;
};

const ListRenderTemplate: React.FC<ListProps> = ({
  loading,
  results,
  currentPropertiesData,
  handlePageClick,
  itemsPerPage,
}) => {
  if (loading) return <p className="text-danger mt-3">...loading</p>;
  if (!results?.length)
    return <p className="text-danger mt-3">No result found.</p>;

  return (
    <>
      <div>
        {currentPropertiesData &&
          currentPropertiesData.length > 0 &&
          currentPropertiesData.map((p: Property) => {
            return (
              p.isVacant && (
                <div
                  className="card mx-5 my-4 result-container shadow"
                  key={p.id}
                >
                  <Link to={`/property/${p.id}`}>
                    <img
                      src="/property.jpg"
                      alt="property pic"
                      className="img-fluid card-img-top p-2 result-img"
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">${p.rent} per week</h5>
                    <p className="card-text my-1">
                      {p.address} ,{p.postcode}
                    </p>
                    <p className="card-text my-1">
                      {p.bedroom} bedroom(s), {p.bathroom} bathroom(s),{" "}
                      {p.carSpot} carspot(s)
                    </p>
                    <p className="card-text">
                      {" "}
                      Available Date:{" "}
                      <span className="text-danger">
                        {p.availability.slice(0, 10)}
                      </span>
                    </p>
                  </div>
                </div>
              )
            );
          })}
        <div>
          {results && results.length > 0 && (
            <ReactPaginate
              pageCount={Math.ceil(results.length / itemsPerPage)}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              onPageChange={({ selected }) => handlePageClick(selected + 1)}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ListRenderTemplate;
