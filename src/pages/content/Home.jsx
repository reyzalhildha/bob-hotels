import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { Button } from "primereact/button";
import DialogLogin from "../components/DialogLogin";
import DialogDetail from "../components/DialogDetail";

const supabase = createClient(
  "https://npwqsjbhohvyagbxqtkb.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wd3FzamJob2h2eWFnYnhxdGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2NTYzODAsImV4cCI6MjA1MjIzMjM4MH0.u2CUtfIDVgKVztbQSk7ZUFCHrxu6XnVldhCHNMQL3sw"
);

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [visibleLogin, setVisibleLogin] = useState(false);
  const [visibleDetail, setVisibleDetail] = useState(false);

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
                      label="Login"
                      icon="pi pi-external-link"
                      onClick={() => setVisibleLogin(true)}
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