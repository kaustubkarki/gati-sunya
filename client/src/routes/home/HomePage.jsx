import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);
  //!call multiple context with their name
  console.log({ currentUser });
  return (  
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">
            Book your parking while you park your appointment.
          </h1>
          <p>
            Reclaiming streets for people in Kathmandu: One parking space at a
            time.Instantly find an available spot and get to your destination
            faster with our hassle-free parking app, designed to make your
            journey smooth and stress-free.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Large Parking Spots.</h2>
            </div>
            <div className="box">
              <h1>200+</h1>
              <h2>Small Parking area.</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>gatiSunya pro users.</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default HomePage;
