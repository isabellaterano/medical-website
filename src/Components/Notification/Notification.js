import React, { useEffect, useState } from 'react';
import './Notification.css';
const Notification = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [isShowNotification, setIsShowNotification] = useState(false);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedDoctorData){
        setDoctorData(storedDoctorData);
    }

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedUsername && storedDoctorData){
      setIsShowNotification(true);
    }
  }, []);

  function closeNotification() { 
	document.getElementById("appointment-card").style.display="none"; 
  }
  
  return (
    <div>
      {isShowNotification && (
        <>
          <div className="appointment-card" id="appointment-card">
            <button className="close" onClick={closeNotification}>&times;</button>
            <div className="appointment-card__content">
              <h3 className="appointment-card__title">Appointment Details</h3>
                  {doctorData.map( doctor => {
                    const storedAppointmentData = JSON.parse(localStorage.getItem(doctor?.name));
                    return (
                    <ul className="appointment-card__message" key={doctor?.name}>
                         <li><strong>Doctor:</strong> {doctor?.name}</li>
                         <li><strong>Speciality:</strong> {doctor?.speciality}</li>
                         <li><strong>Name:</strong> {storedAppointmentData?.name}</li>
                         <li><strong>Phone Number:</strong> {storedAppointmentData?.phoneNumber}</li>
                         <li><strong>Date of Appointment:</strong> {storedAppointmentData?.selectedDate}</li>
                         <li><strong>Time Slot:</strong> {storedAppointmentData?.selectedSlot}</li>
                    </ul>);
                  }
                  )
                  }

            </div>
          </div>
        </>
      )
      }
    </div>
  );
}

export default Notification;