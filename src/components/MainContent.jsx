import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, Form, FormControl, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CommunityLogo from '../logos/CommunityLogo';
import { faLayerGroup, faSearch, faEnvelope, faBell,faTimes } from '@fortawesome/free-solid-svg-icons';

function MainContent() {
  // Define a breakpoint for showing/hiding the search bar
  const searchBreakpoint = 650;

  // Font size for the brand icon/text.
  const [navLinkStyle, setNavStyle] = useState({
    fontSize:
      window.innerWidth < 480
        ? '1.5rem'
        : window.innerWidth < 768
        ? '1.5rem'
        : '1.5rem',
  });

  // Icon size state (if you need to adjust icon sizes later).
  const [iconSize, setIconSize] = useState('xl');

  // State to track the visibility of the nav links (on toggle).
  const [showLinks, setShowLinks] = useState(false);

  // State for notifications and messages counters.
  const [notifications, setNotifications] = useState(5);
  const [messages, setMessages] = useState(3);

  // New state for showing the search bar based on viewport width.
  const [showSearch, setShowSearch] = useState(window.innerWidth >= searchBreakpoint);

  // Update font size and search bar state on resize.
  useEffect(() => {
    const handleResize = () => {
      setNavStyle({
        fontSize:
          window.innerWidth < 480
            ? '1.5rem'
            : window.innerWidth < 768
            ? '1.5rem'
            : '1.5rem',
      });

      // Show the search bar only if the window width is above the breakpoint.
      if (window.innerWidth < searchBreakpoint) {
        setShowSearch(false);
      } else {
        setShowSearch(true);
      }
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount.
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleToggle = () => {
    setShowLinks(!showLinks);
  };

  const BrandName = 'Dashboard';

  return (
    <Navbar expand="lg">
      <Container fluid>
        {/* Main header row */}
        <div className="d-flex align-items-center w-100">
          {/* Left Section: Brand */}
          <div className="d-flex align-items-center">
            <Navbar.Brand style={navLinkStyle} href="/">
              <FontAwesomeIcon icon={faLayerGroup} style={{ marginRight: '8px' }} />
              {BrandName}
            </Navbar.Brand>
          </div>

          {/* Center Section: Search Bar (conditionally rendered) */}
          
            <div className="d-flex flex-grow-1 justify-content-center">
            {showSearch && (<Form className="d-flex" style={{ maxWidth: '250px' }}>
                <InputGroup>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    style={{
                      height: '1.8rem',
                      padding: '0.6rem',
                      lineHeight: '1.8rem',
                    }}
                  />
                  <Button variant="outline-primary" style={{ height: '1.8rem', lineHeight: '0rem' }}>
                    <FontAwesomeIcon icon={faSearch} />
                  </Button>
                </InputGroup>
              </Form> )}
            </div>
         

          {/* Right Section: Notification Icons, Community Logo and Toggle */}
          <div className="d-flex align-items-center">
            <div className="position-relative me-4">
              <FontAwesomeIcon icon={faEnvelope} size={iconSize} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary"
                style={{
                  fontSize: '0.7rem',
                  transform: 'translate(-50%, -40%)',
                }}
              >
                {messages}
              </span>
            </div>
            <div className="position-relative me-5">
              <FontAwesomeIcon icon={faBell} size={iconSize} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{
                  fontSize: '0.7rem',
                  transform: 'translate(-50%, -40%)',
                }}
              >
                {notifications}
              </span>
            </div>
            <div className="position-relative">
              <CommunityLogo />
            </div>

             {/* Only show the toggle button when the search bar is hidden (i.e., on smaller screens) */}
             <div className='position-relative'style={{width: '30px',
                height: '40px'}}>
              {!showSearch && (
              <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle}style={{
                border: 'none',
                outline: 'none',
                boxShadow:'none'
              }} >
                {showLinks ? (
                    <FontAwesomeIcon icon={faTimes} size={iconSize}/>
                  ) : (
                    <span className="navbar-toggler-icon" />
                  )}
              </Navbar.Toggle>
              
            )}</div>
          </div>
        </div>

        {/* Collapsed Navigation Links */}
        <Navbar.Collapse
          id="basic-navbar-nav"
          onExited={() => setShowLinks(false)}
          onEntered={() => setShowLinks(true)}
        >
          {showLinks && (
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/admissions">Admissions</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainContent;
