import './Navbar.css';
import React, {useRef} from 'react';
import {redirect} from 'react-router-dom';
import Popup from 'reactjs-popup';
import ProfileCard from '../ProfileCard/ProfileCard';

function Navbar(){
    const ref = useRef();
    const isLogedOut=sessionStorage.getItem("auth-token") ? false : true;


    const logOutMe = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        
        return redirect("/");
    }

    let name = "";

    if (isLogedOut===false){
        //name = sessionStorage.getItem("email").toString().split('@');
        //name = name[0];
        name = sessionStorage.getItem("name");
    }

    function handleNameUpdate(newValue){
        document.getElementById("name_tag").innerHTML = "Welcome: "+newValue;
    }

    return(
<div className="e1_3">
    <a href="/" className="e1_16">StayHealthy</a>
    <svg className="doctor_svg" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 31C8 26.9048 10.2378 23.3324 13.5573 21.4388C13.9749 21.2004 14.4938 21.34 14.8028 21.7084C17.0041 24.332 20.3072 26 24 26C27.6928 26 30.9958 24.332 33.1972 21.7084C33.5062 21.34 34.0252 21.2004 34.4428 21.4388C37.7622 23.3324 40 26.9048 40 31V40C40 42.2092 38.2092 44 36 44H12C9.79086 44 8 42.2092 8 40V31ZM26 29.587H22V33.087H18.5V37.087H22V40.587H26V37.087H29.5V33.087H26V29.587Z" fill="white"/>
        <path d="M24 22C28.4182 22 32 18.4183 32 14H16C16 18.4183 19.5817 22 24 22Z" fill="white"/>
        <path d="M16 10V5C16 4.44772 16.4477 4 17 4H31C31.5522 4 32 4.44772 32 5V10H16Z" fill="white"/>
    </svg>

<ul className="nav_links">
    <li className="link"><a href="/">Home</a></li>         
    <li className="link"><a href="/Reviews">Reviews</a></li>
    <li className="link"><a href="/BookingConsultation">Appointments</a></li>
    <li className="link"><a href="#">Health Blog</a></li>
</ul>
{isLogedOut?
(<div><div className="e26_461">
    <a href="/Sign_Up">
        <button className="ei26_461_1_6">Sign Up</button>
    </a>
</div>
<div className="e40_620">
    <a href="/Login">
        <button className="ei26_461_1_6">Login</button>
    </a>
</div></div>):(
    <div>
        <Popup style={{ backgroundColor: '#f5f5f5',zIndex:'2'}}
            ref={ref}
            trigger={
                <div className="name_tag" id="name_tag">Welcome, {name}</div>
            }
            >    
            {(close) => (
                <div className="profilebg"><ProfileCard changeName={handleNameUpdate}/></div>      
            )}
        </Popup>
    
    <div className="e26_461">
    <a href="/">
        <button className="ei26_461_1_6" onClick={logOutMe}>Logout</button>
    </a>
    </div>
</div>
)}
</div>
);
}

export default Navbar;