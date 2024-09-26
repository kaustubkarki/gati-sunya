import React, { useState } from "react";
import "./popupBooking.scss";
// import Map from "../map/Map";
import PaymentButton from "../../routes/payment/PaymentButton";
import MapComponent from "../mapComponent/MapComponent";

const PopupBooking = ({ isOpen, onClose, image, name, post }) => {
  if (!isOpen) return null;
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dst = post;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <div className="popup-left">
          {/* <img src={image} alt="Parking Image" className="popup-image" /> */}
          <div className="mapContainer">
            <MapComponent enableRouting={true} destination={dst} />
          </div>
          {/* <button className="popup-left_button">
            View in Map
          </button> */}
        </div>
        <div className="popup-right">
          <h2>Enter Booking Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                placeholder={name}
              />
            </div>
            <div className="form-group">
              <label htmlFor="parkingNumber">Parking Slot required</label>
              <input
                type="text"
                id="parkingNumber"
                name="parkingNumber"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="carNumber">Vechile Number</label>
              <input type="text" id="carNumber" name="carNumber" required />
            </div>
            {/* <button type="submit" className="submit-btn">
            </button> */}
            <PaymentButton />
          </form>
          <button onClick={onClose} className="close-btn">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupBooking;
