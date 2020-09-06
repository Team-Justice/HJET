import React from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import logo from './HJETpiclogo.png';
import {Link} from 'react-router-dom';

class NavBar extends React.Component {

    render() {
        return (
            <Navbar bg="dark">
            <Navbar.Brand href="#home">
              <Link to="/">
                <img
                  src={logo}
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                  alt="HJET logo"
                />
              </Link>
              
            </Navbar.Brand>
          </Navbar>
        )
    }
    
}

export default NavBar;