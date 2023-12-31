import React, { useEffect, useState } from 'react';
import './DoctorCard.css';
import Popup from 'reactjs-popup';
import AppointmentForm from '../AppointmentForm/AppointmentForm';
import { v4 as uuidv4 } from 'uuid';

const DoctorCard = ({name, speciality, experience, ratings, profilePic }) => {
    const [showModal, setShowModal] = useState(false);
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        const storedAppointmentData = JSON.parse(localStorage.getItem(name));
        if (storedAppointmentData) {
          const updatedAppointments = [...appointments, storedAppointmentData];
          setAppointments(updatedAppointments);
        }

      }, []);

    const handleBooking = () => {
        setShowModal(true);
      };

    const handleCancel = (appointmentId) => {
        const updatedAppointments = appointments.filter((appointment) => appointment.id !== appointmentId);
        setAppointments(updatedAppointments);

        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const updatedDoctorData = storedDoctorData.filter((doctor) => doctor.name !== name);

        if (updatedAppointments.length <=0){
            localStorage.removeItem(name);
        }else{
            localStorage.setItem(name,JSON.stringify(updatedAppointments));
        }

        if (updatedDoctorData.length <=0){
            localStorage.removeItem('doctorData');
        }else{
            localStorage.setItem('doctorData',JSON.stringify(updatedDoctorData));
        }

        //window.location.reload();
      };

    const handleFormSubmit = (appointmentData) => {
        const newAppointment = {
          id: uuidv4(),
          ...appointmentData,
        };
        const updatedAppointments = [...appointments, newAppointment];
        setAppointments(updatedAppointments);
        setShowModal(false);

        const doctorData = {'name': name, 'speciality': speciality};
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        let updatedDoctorData = [];

        if (storedDoctorData){
            if (!storedDoctorData.includes(doctorData)){
                updatedDoctorData = [...storedDoctorData, doctorData];
            }
        }else{
            updatedDoctorData =[doctorData];
        }

        localStorage.setItem('doctorData',JSON.stringify(updatedDoctorData));
        localStorage.setItem(name,JSON.stringify(newAppointment));

        //window.location.reload();

      };

  return (
    <div className="doctor-card-container">
      <div className="doctor-card-details-container">
        <div className="doctor-card-profile-image-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
        </div>
        <div className="doctor-card-details">
          <div className="doctor-card-detail-name">{name}</div>
          <div className="doctor-card-detail-speciality">{speciality}</div>
          <div className="doctor-card-detail-experience">{experience} years experience</div>
          <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
        </div>
      </div>

      <div className="doctor-card-options-container">
       <Popup
          style={{ backgroundColor: '#FFFFFF'}}
          trigger={
            <button className={`book-appointment-btn ${appointments.length > 0 ? 'cancel-appointment' : ''}`} >
              {appointments.length > 0 ? (
                <div>Cancel Appointment</div>
              ) : (
                <div>Book Appointment</div>
              )}
              <div>No Booking Fee</div>
            </button>
          }
          modal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          {(close) => (
            <div className="doctorbg" style={{overflow: 'scroll' }}>
              <button className="close" onClick={close}>
                &times;
              </button>
              <div className="doctor-card">
                <div className="doctor-card-profile-image-container">
                <svg xmlns="http://www.w3.org/2000/svg" width="46" height="46" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/> </svg>
                </div>
                <div className="doctor-card-details">
                  <div className="doctor-card-detail-name">{name}</div>
                  <div className="doctor-card-detail-speciality">{speciality}</div>
                  <div className="doctor-card-detail-experience">{experience} years experience</div>
                  <div className="doctor-card-detail-consultationfees">Ratings: {ratings}</div>
                </div>
              

              {appointments.length > 0 ? (
                <>
                  <h3 style={{ textAlign: 'center' }}>Appointment Booked!</h3>
                  {appointments.map((appointment) => (
                    <div className="bookedInfo" key={appointment.id}>
                      <p>Name: {appointment.name}</p>
                      <p>Phone Number: {appointment.phoneNumber}</p>

                      {appointment.instantConsult? (
                          <p>Consult Instantly</p>
                      ):(
                      <>
                          <p>Date: {appointment.selectedDate}</p>
                          <p>Time: {appointment.selectedSlot}</p>
                      </>
                      )
                      }
                      <center>
                          <button onClick={() => handleCancel(appointment.id)} style={{marginTop:'20px'}}>Cancel Appointment</button>
                      </center>
                    </div>
                  ))}
                </>
              ) : (
                <AppointmentForm doctorName={name} doctorSpeciality={speciality} onSubmit={handleFormSubmit} />
              )}
            </div>
            </div>
          )}
        </Popup> 
      </div>

    </div>
  );
};

export default DoctorCard;