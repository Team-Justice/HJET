import React from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import logo from './HJETpiclogo.png';

class NavBar extends React.Component {

    render() {
        return (
            <Navbar bg="dark">
            <Navbar.Brand href="#home">
              <img
                src={logo}
                width="30"
                height="30"
                className="d-inline-block align-top"
                alt="HJET logo"
              />
            </Navbar.Brand>
          </Navbar>
        )
    }
    
}

export default NavBar;