import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Dialog } from "primereact/dialog";
import { supabase } from "../../utils/supabase"; // Pastikan sudah mengimpor supabase

export default function DialogDetail({ visible, onHide, hotelId }) {
  const [hotelDetails, setHotelDetails] = useState(null);

  const getImg = imgName => {
    return require(`../../resources/img/room/${imgName}.png`);
  };

  // Mengambil data hotel berdasarkan ID
  useEffect(() => {
    if (hotelId) {
      const fetchHotelDetails = async () => {
        try {
          const { data, error } = await supabase
            .from("hotels")
            .select("*")
            .eq("id", hotelId)
            .single(); // Mengambil satu hotel berdasarkan ID

          if (error) {
            console.error("Error fetching hotel details:", error);
          } else {
            setHotelDetails(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      };

      fetchHotelDetails();
    }
  }, [hotelId, visible]);

  // Tampilkan loading atau pesan jika data belum tersedia
  if (!hotelDetails) {
    return (
      <Dialog header="Loading..." visible={visible} onHide={onHide}>
        Loading...
      </Dialog>
    );
  }

  return (
    <Dialog
      header={hotelDetails.name_hotel}
      visible={visible}
      draggable={false}
      style={{ width: "50vw" }}
      onHide={onHide}>
      <div className="hotel-detail-content">
        <img
          src={getImg(hotelDetails.name_img)}
          alt={hotelDetails.name_hotel}
        />
        <div className="hotel-info">
          <p>
            <strong>Location:</strong> {hotelDetails.location}
          </p>
          <p>
            <strong>Rating:</strong> {hotelDetails.rating} / 5
          </p>
          <p>
            <strong>Price:</strong>{" "}
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
            }).format(hotelDetails.price)}
          </p>
        </div>
      </div>
    </Dialog>
  );
}

DialogDetail.propTypes = {
  visible: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  hotelId: PropTypes.number.isRequired, // Menambahkan hotelId sebagai props
};
