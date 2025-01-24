import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilLockLocked, cilUser } from '@coreui/icons';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [data, setData] = useState({ username: '', password: '' });
  const navigate = useNavigate();
  function handleInputChange(event) {
    setData({ ...data, [event.target.name]: event.target.value });
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const token = btoa(`${data.username}:${data.password}`);
      localStorage.setItem('token', token);
      await axios
        .get(`http://localhost:8080/user/${data.username}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then((res) => {
          localStorage.setItem('user', JSON.stringify(res.data));
          navigate('/CourseManagement');
        })
        .catch((error) => console.log(error));

      console.log(response.data);
    } catch (error) {
      console.error('Error occurred:', error);
    }
  };

  const storedToken = localStorage.getItem('token');

  const backgroundStyle = {
    backgroundImage: 'url(/src/assets/images/bgLogin.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh', // Ensure it covers the full viewport height
  };


  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center bgLogin" >
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleFormSubmit}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        name="username"
                        placeholder="Username"
                        autoComplete="username"
                        value={data.username}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name="password"
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={data.password}
                        onChange={handleInputChange}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
