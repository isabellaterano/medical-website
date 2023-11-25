import React, { useState,useEffect } from 'react';

const AppointmentForm = ({ doctorName, doctorSpeciality, onSubmit }) => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [selectedSlot, setSelectedSlot] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [instantConsult, setInstantConsult] = useState(false);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('name');
        const storedPhoneNumber = sessionStorage.getItem('phone');
        if (storedUsername){
            setName(storedUsername);
        }
        if (storedPhoneNumber){
            setPhoneNumber(storedPhoneNumber);
        }
        
    }, []);
  
    const handleSlotSelection = (slot) => {
      setSelectedSlot(slot);
    };
  
    const handleFormSubmit = (e) => {
      e.preventDefault();
      onSubmit({ name, phoneNumber, selectedDate, selectedSlot, instantConsult});
      setName('');
      setPhoneNumber('');
      setSelectedSlot(null);
      setSelectedDate(null);
    };
  
    return (
      <form name="AppointmentForm" onSubmit={handleFormSubmit} className="appointment-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
        <input type="checkbox" id="consultInstantCheck" 
          style={{width:"20px"}} checked={instantConsult} onChange={e => setInstantConsult(e.target.checked)} />
          <span class="checkLabel">Consult Instantly</span>
        </div>
        {instantConsult === false && (<div id="booking">
        <div className="form-group">
          <label htmlFor="appointmentDate">Date of Appointment:</label>
          <input
            type="date"
            id="appointmentDate"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="timeSlot">Book Time Slot:</label>
          <select id="timeSlot" required name="timeSlot" type="timeSlot" value={selectedSlot} onChange={e => setSelectedSlot(e.target.value)}>
            <option value="">Select a time slot</option>
            <option value="9am">9 am</option>
            <option value="10am">10 am</option>
            <option value="11am">11 am</option>
            <option value="2pm">2 pm</option>
            <option value="3pm">3 pm</option>
            <option value="4pm">4 pm</option>
          </select>
        </div>
        </div>)}
        <button type="submit">Book Now</button>
      </form>
    );
  };

export default AppointmentForm;