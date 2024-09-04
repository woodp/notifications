import { Link } from 'react-router-dom'
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav } from 'mdb-react-ui-kit';

export const Menu = () => {

  return (
    <MDBNavbar expand='lg' light bgColor='light'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>Notifications</MDBNavbarBrand>
      </MDBContainer>
    </MDBNavbar>
  );
}