import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdSettings, MdExitToApp } from "react-icons/md"; // Using icons from react-icons
import profileImage from "../assets/profile.jpg"; // Import profile image

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [editingBio, setEditingBio] = useState(false); // State to track if bio is being edited
  const [newBio, setNewBio] = useState(""); // State to store the new bio
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = localStorage.getItem("token");
        console.log(userId); // Log the user ID
        const response = await axios.get(
          `https://learnit-bde1.onrender.com/users/${userId}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSaveBio = async () => {
    try {
      const userId = localStorage.getItem("token");
      await axios.put(`https://learnit-bde1.onrender.com/users/${userId}`, { bio: newBio });
      setUserData({ ...userData, bio: newBio }); // Update the bio in the local state
      setEditingBio(false); // Exit editing mode
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/LoginScreen"); // Redirect to login screen
  };

  const handleMyLearning = () => {
    navigate("/MyLearning");
  };

  const handleHome = (e) => {
    navigate("/LearnIT");
  };

  const handleSettings = () => {
    // Navigate to settings screen or implement settings logic here
  };

  return (
    <div>
      <div style={styles.nav} onClick={handleHome}>
        {" "}
        LearnIT{" "}
      </div>
      <div style={styles.container}>
        <div style={styles.profilecontainer}>
          {userData && (
            <div style={styles.profilecontainer2}>
              <img src={profileImage} alt="Profile" className="profileImage" />
              <div className="profileTitle">
                {userData.firstname} {userData.lastname}
              </div>
              <div style={styles.profiledescription}>
                <div style={styles.desc}>Student ID: {userData.studentID}</div>
                <div style={styles.desc}>Points: {userData.points}</div>
                {editingBio ? (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      type="text"
                      value={newBio}
                      onChange={(e) => setNewBio(e.target.value)}
                    />
                    <button onClick={handleSaveBio}>Save</button>
                  </div>
                ) : (
                  <div style={styles.desc}>
                    <span>Bio: {userData.bio}</span>
                    <div
                      style={styles.EditBio}
                      onClick={() => setEditingBio(true)}
                      onMouseEnter={(e) => {
                        e.target.style.boxShadow =
                          "0px 0px 20px rgba(0, 0, 0, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.boxShadow =
                          "0px 0px 10px rgba(0, 0, 0, 0.2)";
                      }}
                    >
                      Edit Bio
                    </div>
                  </div>
                )}
              </div>
              <div
                style={styles.mylearning}
                onMouseEnter={(e) => {
                  e.target.style.boxShadow = "0px 0px 20px rgba(0, 0, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.boxShadow = "0px 0px 10px rgba(0, 0, 0, 0.2)";
                }}
              >
                <span style={styles.mylearning} onClick={handleMyLearning}>
                  Start Learning
                </span>
              </div>
            </div>
          )}
          <div className="sidebarBottom">
            <div className="sidebarButton" onClick={handleSettings}>
              <MdSettings size={24} color="white" />
              <span className="buttonText">Settings</span>
            </div>
            <div className="sidebarButton" onClick={handleLogout}>
              <MdExitToApp size={24} color="white" />
              <span className="buttonText" onClick={handleLogout}>
                Logout
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "93vh",
    marginTop: "2vh",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },

  nav: {
    display: "flex",
    position: "fixed",
    top: "0",
    left: "0",
    margin: "10px",
    padding: "10px",
    border: "1px solid black",
    cursor: "pointer",
  },

  profilecontainer: {
    display: "flex",
    padding: "50px",
    height: "80vh",
    width: "50%",
    justifyContent: "center",
    position: "absolute",
    borderRadius: "15px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
  },

  profilecontainer2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  profiledescription: {
    display: "flex",
    flexDirection: "column",
  },

  desc: {
    padding: "10px",
    margin: "10px",
    display: "flex",
    flexDirection: "column",
  },

  mylearning: {
    display: "flex",
    width: "100%",
    height: "50px",
    backgroundColor: "#28B498",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  },

  EditBio: {
    display: "flex",
    backgroundColor: "#28B498",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    borderRadius: "5px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    marginTop: "5px",
  },
};

export default ProfileScreen;
