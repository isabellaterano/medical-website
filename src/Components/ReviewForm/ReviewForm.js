import React, { useEffect, useState, useRef } from 'react';
import './ReviewForm.css';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";
import GiveReviews from '../GiveReviews/GiveReviews';

const ReviewForm = ({ children }) => {
  const ref = useRef();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [isShowReviewForm, setIsShowReviewForm] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }

    const storedUsername = sessionStorage.getItem('email');
    let storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    if (storedDoctorData){
        let i=1;
        storedDoctorData.forEach(element => {element.id = i++;});

        setDoctorData(storedDoctorData);

    }

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedUsername && storedDoctorData){
      setIsShowReviewForm(true);
    }
  }, []);

  const handleFormSubmit = (submittedMessage) => {
    const updatedDoctorData = doctorData.map(doctor =>{
        if (doctor.id === submittedMessage.doctor.id){
            doctor.review = submittedMessage.review;
            doctor.rating = submittedMessage.rating;
        }
        return doctor;
    });
    setDoctorData(updatedDoctorData);
    setShowModal(false);
 

  };

  return (
      <div className="ReviewFormPane">
        <div className="ReviewFormText">Reviews</div>
        <center>
        <table className="ReviewFormTable">
          <thead>
            <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>Provide Feedback</th>
                <th>Review Given</th>
            </tr>
        </thead>
        <tbody>
        {isLoggedIn && doctorData.map( (doctor) => (
            <tr key={doctor?.id}>
                <td style={{textAlign:'center'}}>{doctor?.id}</td>
                <td style={{textAlign:'center'}}>{doctor?.name}</td>
                <td style={{textAlign:'center', maxWidth:'150px'}}>{doctor?.speciality}</td>
                <td style={{textAlign:'center'}}>
                    <Popup style={{ backgroundColor: '#f5f5f5'}}
                        ref={ref}
                        trigger={
                        <button className="ReviewButton" disabled={doctor?.review}>
                            {doctor?.review? "Reviewed" : "Click Here"}
                        </button>
                        }
                        >
                        
                        {(close) => (
                            <div className="doctorbg" style={{overflow: 'scroll' }}>
                                <button className="close" onClick={close}>
                                      &times;
                                </button>
                            <GiveReviews doctor={doctor} onSubmit={handleFormSubmit} />
                            </div>
                        )}
                    </Popup>
                </td>
                <td>{doctor?.review}</td>

            </tr>)
        )}
        </tbody>
      
      </table>
      </center>
    </div>
  );
}


export default ReviewForm;