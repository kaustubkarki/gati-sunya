import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["hourly", "overnight"];

function SearchBar() {
  const [query, setQuery] = useState({
    type: "",
    location: "",
    time: 0,
  });

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  //! this  is a technique called "spreading". It copies all previous state properties and only updates the property whose name matches e.target.name with the new value (e.target.value).

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
        />
        <input
          type="tel"
          name="time"
          min={0}
          max={24}
          placeholder="Time (24hr format)"
          onChange={handleChange}
        />
        <Link
          to={`/list?type=${query.type}&location=${query.location}&time=${query.time}&`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
