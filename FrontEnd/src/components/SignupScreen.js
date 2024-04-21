import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignupScreen = () => {
    const [studentID, setStudentID] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleGoback = (e) => {
        navigate('/LoginScreen');
    };

    const handleHome = (e) => {
        navigate('/LearnIT');
    };

    const handleSignup = async () => {
        try {
            const response = await fetch('https://learnit-bde1.onrender.com/SignupScreen', { // Match the backend endpoint
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    studentID,
                    email,
                    firstName,
                    lastName,
                    password
                })
            });
            if (!response.ok) {
                throw new Error('Error signing up');
            }
            navigate('/LoginScreen');
        } catch (error) {
            console.error('Signup error:', error);
        }
    };

    return (
        <div>
            <div style={styles.nav} onClick={handleHome}>LearnIT</div>
        <div style={styles.container}>
            <div style={styles.signup}>
            <h2>Create Your Account</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="studentID">Student ID</label>
                    <input id="studentID" style={styles.input} value={studentID} onChange={(e) => setStudentID(e.target.value)} required />
                </div>
                <div style={styles.inputNames}>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" style={styles.input} value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" style={styles.input} value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" style={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" style={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="button" style={styles.Signupbutton} onClick={handleSignup}>Signup</button>
            </form>
            </div>
            <div style={styles.login}>
              <h1> Already Have an Account?</h1>
              <div> Log in and discover LearnIT!</div>
              <div><button 
              style={styles.Loginbutton } 
              onClick={handleGoback}
              onMouseEnter={(e) => {
                e.target.style.boxShadow = '0px 0px 20px rgba(0, 0, 0, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.2)';
              }}
              >Login</button></div>
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
    
      signup: {
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: '10',
        height: '100%',
        textShadow: '0px 0px 4px rgba(0, 0, 0, 0.3)',
        fontSize: '20px',
      },
    
      login: {
        textAlign: 'center',
        padding: '20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        flexGrow: '2',
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
        width: '95%',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        fontSize: '20px',
        textAlign: 'center',
      },

      inputNames: {
        display: 'flex',
        flexDirection: 'row',
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
        backgroundColor: '#28B498',
        color: 'white',
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
        backgroundColor: 'white',
        color: 'black',
        fontSize: '20px',
      },


}

export default SignupScreen;
