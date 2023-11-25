import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import './ProfileCard.css';

const ProfileCard = ({changeName}) => {
    const [userDetails, setUserDetails] = useState({});
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const authtoken = sessionStorage.getItem("auth-token");
      if (!authtoken) {
        navigate("/login");
      } else {
        fetchUserProfile();
      }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email"); // Get the email from session storage
  
            if (!authtoken) {
                navigate("/login");
            } else {
                const response = await fetch(`${API_URL}/api/auth/user`, {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Email": email, // Add the email to the headers
                    },
                });

                if (response.ok) {
                    const user = await response.json();
                    setUserDetails(user);
                    setUpdatedDetails(user);
                } else {
                    // Handle error case
                    throw new Error("Failed to fetch user profile");
                }
            }
        } catch (error) {
            console.error(error);
            // Handle error case
        }
    };

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        setUpdatedDetails({
          ...updatedDetails,
          [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email"); // Get the email from session storage
  
            if (!authtoken || !email) {
                navigate("/login");
                return;
            }

            const payload = { ...updatedDetails };
            const response = await fetch(`${API_URL}/api/auth/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
                body: JSON.stringify(payload),
            });
            if (response.ok) {
                // Update the user details in session storage
                sessionStorage.setItem("name", updatedDetails.name);
                sessionStorage.setItem("phone", updatedDetails.phone);
                setUserDetails(updatedDetails);
                changeName(updatedDetails.name);
                setEditMode(false);
                // Display success message to the user
                setTimeout(() => {alert(`Profile Updated Successfully!`)},500);
                navigate("/");
            } else {
                // Handle error case
                throw new Error("Failed to update profile");
            }
        } catch (error) {
          console.error(error);
          // Handle error case
        }
    };
  
    return (
        <div>
        <div className="profile-container">
        {editMode ? (
            <div>
            <center><h2>Edit Profile</h2></center>
            <form name="editProfile" onSubmit={handleSubmit}>
                <label className="label" htmlFor="email">Email</label>
                    <input type="email" name="email"
                      value={userDetails.email}
                      disabled/>
                <label className="label" htmlFor="name">Name</label>
                    <input type="text" name="name"
                      value={updatedDetails.name} onChange={handleInputChange}/>
                <label className="label" htmlFor="phone">Phone</label>
                    <input type="text" name="phone"
                      value={updatedDetails.phone} onChange={handleInputChange}/>
                <button type="submit">Save</button>
            </form>
            </div>
        ) : (
            <div className="profile-details">
                <center><h2>Your Profile</h2></center>
                <p> <b>Email:</b> {userDetails.email}</p>
                <p> <b>Phone:</b> {userDetails.phone}</p>
                <button onClick={handleEdit}>Edit</button>
            </div>
        )}
            <div className="profile-details">
                <center><h2>Your Reports</h2></center>
                <a href="/ReportsLayout">
                    <button>Get Reports</button>
                </a>
            </div>
        </div>
        </div>
        );

};

export default ProfileCard;