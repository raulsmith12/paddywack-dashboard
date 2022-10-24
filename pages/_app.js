import { useState } from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/owl.css';
import swal from 'sweetalert';

function MyApp({ Component, pageProps }) {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: 'post',
      url: 'https://backend.paddywackgifts.com/public/api/login',
      headers: { 'content-type': 'application/json' },
      data: { email, password }
    })
    .then(result => {
      swal("Login Successful", "Please wait while we redirect you", "success"),
      setTimeout(setSignedIn(true), 7000)
    })
    .catch(error => swal("Incorrect Login Credentials. Try again."))
  }

  return (
    <div className="container-fluid px-0">
      {signedIn && (
        <div className="row">
          <div className="col-md-2 col-sm-3">
            &nbsp;
          </div>
          <div className="col-md-10 col-sm-9">
            <main className="main">
              <Component {...pageProps} />
            </main>
          </div>
        </div>
      )}
      {!signedIn && (
        <div className="container-sm full-screen d-flex align-items-center justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h3 className="text-center">Welcome</h3>
              </div>
            </div>
            <div className="row">
              <div className="col-6 offset-3">
                <form className="border border-primary px-2 py-2" onSubmit={e => handleFormSubmit(e)}>
                  <div className="mb-3">
                    <label htmlFor='emailInput' className="form-label">Email address</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" name="email" required value={email} onChange={e => setEmail(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor='passwordInput' className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" name="password" required value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                  <button type="submit" className="btn btn-primary">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyApp
