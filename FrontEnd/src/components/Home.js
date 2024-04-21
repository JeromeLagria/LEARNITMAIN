import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/LoginScreen");
  };

  const handleHome = (e) => {
    navigate("/");
  };

  return (
    <div>
      <div style={styles.container}>
        <div>
          <div style={styles.nav} onClick={handleHome}>
            LearnIT
          </div>
        </div>

        <div style={styles.Title}>
          <h1>LearnIT</h1>
        </div>

        <div style={styles.contentcontainer}>
          <div
            style={styles.content}
            onMouseEnter={(e) => {
              e.target.style.flexGrow = "8";
            }}
            onMouseLeave={(e) => {
              e.target.style.flexGrow = "4";
            }}
          >
            <div>
              <h1>Explore Explore</h1>
              <div>Content</div>
            </div>
          </div>
          <div style={styles.content2}>
            <h1>Get Started</h1>
            <div>
              <form onSubmit={handleSubmit}>
                <button
                  style={styles.Signupbutton}
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow =
                      "0px 0px 20px rgba(0, 0, 0, 0.4)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow =
                      "0px 0px 10px rgba(0, 0, 0, 0.2)";
                  }}
                  type="submit"
                  className="HomeLoginButton"
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
          <div
            style={styles.content}
            onMouseEnter={(e) => {
              e.target.style.flexGrow = "8";
            }}
            onMouseLeave={(e) => {
              e.target.style.flexGrow = "4";
            }}
          >
            <div>
              <h1>Select Course</h1>
              <div>Content</div>
            </div>
          </div>
        </div>
        <div>
          <div>Contact Us: 0906-926-0738 (TM) (P20/kilo Kanding papaitan)</div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
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

  Title: {
    display: "flex",
    justifyContent: "center",
    height: "20vh",
    alignItems: "center",
    color: "black",
    textShadow: "0px 0px 4px rgba(0, 0, 0, 0.5)",
    fontSize: "40px",
  },

  contentcontainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: "70vh",
    boxShadow:
      "0px -4px 6px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)",
  },

  content: {
    display: "flex",
    flexGrow: "4",
    alignItems: "center",
    flexDirection: "column",
    height: "100%",
    backgroundColor: "#28B498",
    color: "white",
    fontSize: "15px",
    transition: "flex-grow 0.3s ease",
  },

  content2: {
    display: "flex",
    flexGrow: "8",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "100%",
  },

  Signupbutton: {
    height: "50px",
    width: "200px",
    borderRadius: "15px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
    border: "0px",
    cursor: "pointer",
    transition: "box-shadow 0.3s ease",
    marginTop: "20px",
    backgroundColor: "#28B498",
    color: "white",
  },
};

export default Login;
