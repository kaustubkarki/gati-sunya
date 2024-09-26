import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      {/* //! image to show  */}
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="" />
      </Link>

      {/* //! location ko Naam */}
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="" />
          <span>{item.location}</span>
        </p>
        <p className="price">NPR {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/twoWheeler.png" alt="" />
              {/* //! bedroom-> 2 wheeler */}
              <span>{item.twowheeler} </span>
            </div>
            <div className="feature">
              <img src="/fourWheeler.png" alt="" />
              {/* //! bathroom-> 4 wheeler */}
              <span>{item.fourwheeler} </span>
            </div>
          </div>
          {/* <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="" />
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Card;
