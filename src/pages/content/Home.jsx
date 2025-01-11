import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";

import Room1 from "../../resources/img/room/room-1.png";
import Room2 from "../../resources/img/room/room-2.png";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="filter">
          Bob Hotel
        </div>
      </div>

      <div className="hotels">
        <div className="hotel-list">
          <div className="card">
            <div className="image-container">
              <img src={Room1} alt="hotel" />
            </div>
            <div className="content-container">
              <div className="header">
                <h3>VoyageTransa</h3>
                <FaStar />
              </div>
              <div className="location">
                <IoLocationOutline />
                <p>Location</p>
              </div>
              <div className="feature"></div>
              <div className="button">
                <div className="booking">
                  <button>Booking</button>
                </div>
                <div className="detail">
                  <button>Detail</button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="image-container">
              <img src={Room2} alt="hotel" />
            </div>
            <div className="content-container">
              <div className="header">
                <h3>VoyageTransa</h3>
                <FaStar />
              </div>
              <div className="location">
                <IoLocationOutline />
                <p>Location</p>
              </div>
              <div className="feature"></div>
              <div className="button">
                <div className="booking">
                  <button>Booking</button>
                </div>
                <div className="detail">
                  <button>Detail</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
