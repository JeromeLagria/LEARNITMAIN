import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    navigate('/SignupScreen');
  };

  const handleHome = (e) => {
    navigate('/LearnIT');
};
  
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    try {
      const response = await axios.post('https://learnit-bde1.onrender.com/LoginScreen', { email, password });
      if (response.data.message === "Login Successfully") {
        console.log(response.data.userId);
        localStorage.setItem('token', response.data.userId);
        navigate('/ProfileScreen');
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error('Login error:', error);
      setError("An error occurred while logging in.");
    }
  };
  return (

    <div>
      <div style={styles.container}>
        <div style={styles.nav} onClick={handleHome}>LearnIT</div>
        <div style={styles.login}>
          <h1>Login to Your Account</h1>

            <form onSubmit={handleSubmit}>
                <input
                  style={styles.input}
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span>{emailError}</span>
                <input
                  style={styles.input}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span>{passwordError}</span>
              
              <button 
              style={styles.Loginbutton} 
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
              }}
              type="submit"
              >Login</button>
            </form>
        </div>
            <div style={styles.signup}>
              <h1> New Here?</h1>
              <div> Sign up and discover LearnIT!</div>
              <div><button 
              style={styles.Signupbutton } 
              onClick={handleSignup}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
              }}
              >Signup</button></div>
            </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    height: '100vh',
    postion: 'relative',
  },

  nav: {
    display: 'flex',
    position: 'fixed',
    top: '0',
    left: '0',
    margin: '10px',
    padding: '10px',
    border: '1px solid black',
    cursor: 'pointer'
  },

  login: {
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: '8',
    height: '100%',
    textShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
  },

  signup: {
    textAlign: 'center',
    padding: '20px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    flexGrow: '4',
    height: '100%',
    backgroundColor: '#28B498',
    color: 'white',
    textShadow: '0px 0px 4px rgba(0, 0, 0, 0.5)',
  },

  input: {
    height: '50px',
    borderRadius: '15px',
    border: '0px',
    margin: '10px',
    backgroundColor: '#EDF5F3',
    width: '100%',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    fontSize: '20px',
  },

  Loginbutton: {
    height: '50px',
    width: '200px',
    borderRadius: '15px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    border: '0px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease', 
    marginTop: '20px',
    backgroundColor: '#28B498',
    color: 'white',
    fontSize: '20px',
  },

  Signupbutton: {
    height: '50px',
    width: '200px',
    borderRadius: '15px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    border: '0px',
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease', 
    marginTop: '20px',
    backgroundColor: 'white',
    color: 'black',
    fontSize: '20px',
  },


}

export default LoginScreen;
