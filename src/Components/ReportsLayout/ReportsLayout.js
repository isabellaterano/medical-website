import React, { useEffect, useState} from 'react';
import './ReportsLayout.css';
import Popup from 'reactjs-popup';
import { useNavigate } from "react-router-dom";

const ReportsLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState([]);
  const [isShowReportsLayout, setIsShowReportsLayout] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    let storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));

    const authtoken = sessionStorage.getItem("auth-token");
    if (!authtoken) {
      navigate("/login");
    }

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
      setIsShowReportsLayout(true);
    }
  }, []);

  return (
      <div className="ReportsLayoutPane">
        <div className="ReportsLayoutText">Reports</div>
        <center>
        <table className="ReportsLayoutTable">
          <thead>
            <tr>
                <th>Serial Number</th>
                <th>Doctor Name</th>
                <th>Doctor Speciality</th>
                <th>View Report</th>
                <th>Download Report</th>
            </tr>
        </thead>
        <tbody>
        {isLoggedIn && doctorData.map( (doctor) => (
            <tr key={doctor?.id}>
                <td style={{textAlign:'center'}}>{doctor?.id}</td>
                <td style={{textAlign:'center'}}>{doctor?.name}</td>
                <td style={{textAlign:'center',maxWidth:"150px"}}>{doctor?.speciality}</td>
                <td style={{textAlign:'center'}}>
                <Popup style={{ backgroundColor: '#f5f5f5',zIndex:'2'}}
                    trigger={
                        <button>View Reports</button>
                    }
                    modal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                >    
                {(close) => (
                    <div className="pdfbg">
                    <button className="close" onClick={close}>
                        &times;
                    </button>
                    <object className="pdf-area"data="StayHealthyReportMod.pdf"></object> 
                    </div>
                )}
                </Popup>
                
                </td>
                <td><a href="StayHealthyReportMod.pdf" download><button> Download Reports</button></a></td>

            </tr>)
        )}
        </tbody>
      
      </table>
      </center>
    </div>
  );
}

export default ReportsLayout;