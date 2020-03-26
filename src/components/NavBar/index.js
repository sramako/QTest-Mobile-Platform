import React from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
  } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css'
import Logout from "../Logout";
import './navbar.css';

class NavBar extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            isOpen : false,
            device : "unknown"
        };
        this.openNav = this.openNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
    }

    componentWillMount() {
        var viewRatio = window.innerWidth/window.innerHeight;
        if(viewRatio > 1)
        {
            this.setState({
                device : "desktop"
            })
        }
        else
        {
            this.setState({
                device : "mobile"
            })
        }
    }

    toggle = () => this.setState({ isOpen : !this.state.isOpen });

    openNav() {
        console.log("Open Side Nav");
        this.setState({ sideBarWidth : "250px" });
    }
      
    closeNav() {
        this.setState({ sideBarWidth : "0" });
    }

    render() {
        if( this.state.device=="desktop" )
        {
            return(
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                    QTEST
                </NavbarBrand>

                <NavbarToggler onClick={ this.toggle } />
                
                <Collapse isOpen={ this.state.isOpen } navbar>
                    <Nav className="mr-auto" navbar>                            
                        {/* <UncontrolledDropdown nav inNavbar>

                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            
                            <DropdownMenu left>
                                <DropdownItem>
                                    Option 1
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    Reset
                                </DropdownItem>
                            </DropdownMenu>

                        </UncontrolledDropdown> */}

                        {/* <NavItem>
                            <NavLink href="/components/">Components</NavLink>
                        </NavItem> */}
                    </Nav>
                    
                    <Nav><img src={ this.props.profile.imageUrl }></img></Nav>
                    <NavbarText>{ this.props.profile.name }</NavbarText>
                    <Nav><Logout/></Nav>
                </Collapse>
            </Navbar>
        )}
        else if( this.state.device=="mobile")
        {
            return(
                <div class="mobile-container">

                    <div id="mySidenav" class="sidenav" style={{ width : this.state.sideBarWidth }}>
                        <a href="javascript:void(0)" class="closebtn" onClick={ this.closeNav }>&times;</a>
                        <div><img src={ this.props.profile.imageUrl } className="mobile-avatar"></img></div>
                        <br/>
                        <div>{ this.props.profile.name }</div>
                        {/* <a href="a">Services</a>
                        <a href="a">Clients</a>
                        <a href="a">Contact</a> */}
                    </div>

                    <div class="topnav">
                        <a href="#home" class="active">Q T e s T</a>
                        <div id="myLinks">
                            <a href="#news">Option</a>
                        </div>
                        {/* <a href="javascript:void(0);" class="icon" onClick="myFunction()"></a> */}
                        <span 
                                style={{ fontSize:'35px', cursor:'pointer' }} 
                                onClick={ this.openNav }
                                class="icon"
                            >
                                &#9776;
                        </span>
                    </div>               

                </div>
        )}
        else
        {
            return(
                <div>Loading...</div>
            )
        }
    }
}
export default NavBar;