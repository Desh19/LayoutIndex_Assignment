import React from 'react'
// import logo from '../Image/logo.png';

const Navbar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                {/* <a className="navbar-brand" href="#">Navbar</a> */}
                {/* <img src={logo} alt="Logo" style={{ width:'200px', padding:'20px'}}/> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                   
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/deviceAdd">Device</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/locationAdd">Location</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="locationList">Location List</a>
                    </li>
                    
                </ul>
                </div>
            </div>
            </nav>

    </div>
  )
}


export default Navbar