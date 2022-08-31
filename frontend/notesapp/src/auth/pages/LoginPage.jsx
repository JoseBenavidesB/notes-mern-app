import './loginPage.css'

import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAuthStore } from '../../hooks/useAuthStore';
import { useForm } from '../../hooks/useForm';
import './loginPage.css';

/* Initial login value */
const loginFormFields = {
    loginEmail: '',
    loginPassword: '',
};

/* Initial Register value */
const registerFormFields = {
    registerName: '',
    registerEmail: '',
    registerPassword: '',
    registerPassword2: '',
};


export const LoginPage = () => {

    const { startLogin, errorMessage, startRegister } = useAuthStore();

    /* ---------Login--------- */
    const { loginEmail, loginPassword , onInputChange: onLoginInputChange } = useForm( loginFormFields);

    const loginSubmit = ( event ) => {
        event.preventDefault();
        startLogin({ email: loginEmail, password: loginPassword });

    };

    /* ---------Register--------- */
    const { 
        registerName, 
        registerEmail, 
        registerPassword, 
        registerPassword2 , 
        onInputChange: onRegisterInputChange } = useForm( registerFormFields);

    const registerSubmit = ( event ) => {
        event.preventDefault();

        if ( registerPassword !== registerPassword2 ) {
            Swal.fire('Register Error', 'Passwords are not the same', 'error')
            return;
        };

        startRegister( registerName, registerEmail, registerPassword );

    };

    useEffect(() => {
      if ( errorMessage !== undefined ) {
        Swal.fire('Authentication Error', errorMessage, 'error');
      }
    
    }, [errorMessage])
    

  return (
      <div className="container login-container">
          <div className="row">
              <div className="col-md-6 login-form-1">
                  <h3>LogIn</h3>
                  <form onSubmit={ loginSubmit }>
                      <div className="form-group mb-2">
                          <input 
                              type="text"
                              className="form-control"
                              placeholder="Email"
                              name="loginEmail"
                              value={ loginEmail }
                              onChange= { onLoginInputChange }
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name="loginPassword"
                              value={ loginPassword }
                              onChange= { onLoginInputChange }
                          />
                      </div>
                      <div className="d-grid gap-2">
                          <input 
                              type="submit"
                              className="btnSubmit"
                              value="Login" 
                          />
                      </div>
                  </form>
              </div>
                {/* -----------Register -----------*/}
              <div className="col-md-6 login-form-2">
                  <h3>Register</h3>
                  <form onSubmit={ registerSubmit }>
                      <div className="form-group mb-2">
                          <input
                              type="text"
                              className="form-control"
                              placeholder="Name"
                              name="registerName"
                              value={ registerName }
                              onChange= { onRegisterInputChange }
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="email"
                              className="form-control"
                              placeholder="Email"
                              name="registerEmail"
                              value={ registerEmail }
                              onChange= { onRegisterInputChange }
                          />
                      </div>
                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Password"
                              name="registerPassword"
                              value={ registerPassword }
                              onChange= { onRegisterInputChange }
                          />
                      </div>

                      <div className="form-group mb-2">
                          <input
                              type="password"
                              className="form-control"
                              placeholder="Repeat password" 
                              name="registerPassword2"
                              value={ registerPassword2 }
                              onChange= { onRegisterInputChange }
                          />
                      </div>

                      <div className="d-grid gap-2">
                          <input 
                              type="submit" 
                              className="btnSubmit" 
                              value="Create Account" />
                      </div>
                  </form>
              </div>
          </div>
      </div>
  )
}
