import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";
import apiRequest from "./../../lib/apiRequest";
import UploadWidget from "./../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

const NewPostPage = () => {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    //! This line converts the FormData object into a plain JavaScript object. The Object.fromEntries(formData) method takes an iterable of key-value pairs (like the entries in formData) and returns a new object.
    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          location: inputs.location,
          twowheeler: parseInt(inputs.twowheeler),
          fourwheeler: parseInt(inputs.fourwheeler),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          size: parseInt(inputs.size),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="tel" />
            </div>
            <div className="item">
              <label htmlFor="location">Location</label>
              <input id="location" name="location" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="twowheeler">Space for two wheelers</label>
              <input min={1} id="twowheeler" name="twowheeler" type="number" />
            </div>
            <div className="item">
              <label htmlFor="fourwheeler">Space for four wheelers</label>
              <input
                min={1}
                id="fourwheeler"
                name="fourwheeler"
                type="number"
              />
            </div>
            {/* //!for location mapping */}
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            {/* //!mapping */}
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="hourly" defaultChecked>
                  Hourly
                </option>
                <option value="overnight">Over night</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="office">Office</option>
                <option value="house">House</option>
                <option value="party">Partypalace</option>
                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="tenant" defaultChecked>
                  Park at your own risk
                </option>
                <option value="owner">Insurance Covered</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        <div className="image-container">
          {images.map((image, index) => (
            <img src={image} key={index} />
          ))}
        </div>
        <UploadWidget
          uwConfig={{
            cloudName: "kaustubkarki",
            uploadPreset: "realState",
            multiple: true,
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
};

export default NewPostPage;
//2:46:20
