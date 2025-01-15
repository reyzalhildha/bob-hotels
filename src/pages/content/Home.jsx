import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "primereact/button";
import DialogLogin from "../components/DialogLogin";
import DialogDetail from "../components/DialogDetail";
import { supabase } from '../../utils/supabase'


export default function Home() {
  const [countries, setCountries] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);
  
  let navigate = useNavigate(); 

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("hotels").select();
    const filteredData = data.filter((hotel) => hotel.status_booking === "READY");
    setCountries(filteredData);
    console.log(data);
  }

  const getImg = (imgName) => {
    return require(`../../resources/img/room/${imgName}.png`);
  };

  const handleHideDialog = () => {
    setVisibleLogin(false);
    setVisibleDetail(false);
  };

  return (
    <>
      <div className="home">
        <div className="filter">Bob Hotel</div>
      </div>

      <div className="hotels">
        <h1>Daftar Hotel</h1>
        <div className="hotel-list">
          {countries.map((country) => (
            <div className="card" key={country.id}>
              <div className="image-container">
                <img src={getImg(country.name_img)} alt="hotel" />
              </div>
              <div className="content-container">
                <div className="header">
                  <h3>{country.name_hotel}</h3>
                  <span>
                    {country.rating}/5
                    <FaStar />
                  </span>
                </div>
                <div className="location">
                  <IoLocationOutline />
                  <p>{country.location}</p>
                </div>
                <div className="feature"></div>
                <div className="button">
                  <div className="booking">
                    <Button
                      label="Booking"
                      icon="pi pi-external-link"
                      onClick={() => navigate("/login")}
                    />
                  </div>
                  <div className="detail">
                    <Button
                      label="Detail"
                      icon="pi pi-external-link"
                      onClick={() => setVisibleDetail(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* DIALOG */}
      <DialogLogin visible={visibleLogin} onHide={handleHideDialog} />
      <DialogDetail visible={visibleDetail} onHide={handleHideDialog} />
    </>
  );
}