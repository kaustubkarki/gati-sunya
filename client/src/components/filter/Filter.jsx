import "./filter.scss";
import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    location: searchParams.get("location") || "",
    property: searchParams.get("property") || "",
    price: searchParams.get("price") || "",
    twoWheeler: searchParams.get("twoWheeler") || "",
    fourWheeler: searchParams.get("fourWheeler") || "",
  });

  // Update local query state when searchParams change
  useEffect(() => {
    const newQuery = {
      location: searchParams.get("location") || "",
      property: searchParams.get("property") || "",
      price: searchParams.get("price") || "",
      twoWheeler: searchParams.get("twoWheeler") || "",
      fourWheeler: searchParams.get("fourWheeler") || "",
    };
    setQuery(newQuery);
  }, [searchParams]);

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setSearchParams(query);
  };

  return (
    <form className="filter" onSubmit={handleFilter}>
      <h1>
        Search results for <b>{query.location}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City Location"
            onChange={handleChange}
            value={query.location}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            value={query.property}
          >
            <option value="">any</option>
            <option value="office">Office</option>
            <option value="house">House</option>
            <option value="party">Party Palace</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder="any"
            onChange={handleChange}
            value={query.price}
          />
        </div>
        <div className="item">
          <label htmlFor="twoWheeler">Two Wheeler</label>
          <input
            type="number"
            id="twoWheeler"
            name="twoWheeler"
            placeholder="Two Wheeler capacity"
            onChange={handleChange}
            value={query.twoWheeler}
          />
        </div>
        <div className="item">
          <label htmlFor="fourWheeler">Four Wheeler</label>
          <input
            type="number"
            id="fourWheeler"
            name="fourWheeler"
            placeholder="Four Wheeler capacity"
            onChange={handleChange}
            value={query.fourWheeler}
          />
        </div>
        <button type="submit">
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </form>
  );
}

export default Filter;
