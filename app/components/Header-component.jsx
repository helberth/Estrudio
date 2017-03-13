//import React, { PropTypes } from 'react';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import NavDropdown from 'react-bootstrap/lib/NavDropdown';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Glyphicon from 'react-bootstrap/lib/Glyphicon';
import { LinkContainer } from 'react-router-bootstrap';
import { Button } from 'react-bootstrap';

export default class HeaderComponent extends Component {

    constructor(props, context) {
        super(props, context)
    }

    renderSignInLinks(authenticatedUser) {
        if (authenticatedUser) {
            return (
                <Navbar.Collapse>
                    <Nav pullRight>
                        <LinkContainer to="/profile" role="presentation">
                            <NavItem eventKey={1} href="#">
                                <Button bsStyle="link">{'Perfil'}</Button>
                            </NavItem>
                        </LinkContainer>
                        <LinkContainer to="/admin">
                            <NavItem eventKey={2} href="#"><Button bsStyle="success">Admin</Button></NavItem>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <NavItem eventKey={2} href="#" onClick={this.props.logout}>
                                <Button bsStyle="primary">Log out</Button>
                            </NavItem>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            );
        }

        return (
            <Navbar.Collapse>
                <Nav pullRight>
                    <LinkContainer to="/signin" role="presentation">
                        <NavItem eventKey={1} href="#"><Button bsStyle="link">Iniciar Sesión</Button></NavItem>
                    </LinkContainer>
                    <LinkContainer to="/signup">
                        <NavItem eventKey={2} href="#"><Button bsStyle="primary">Registro</Button></NavItem>
                    </LinkContainer>
                </Nav>
            </Navbar.Collapse>
        );
    }

    render() {
        const { /*type,*/ authenticatedUser } = this.props;

        return <div className="container navmiboo_">
            <Navbar fluid={true} inverse>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a href="/" >Estrudio</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                {this.renderSignInLinks(authenticatedUser)}
            </Navbar>
        </div>

    }
};

HeaderComponent.propTypes = {
    //toHome: PropTypes.func.isRequired
    // router: React.PropTypes.func.isRequired
};

HeaderComponent.contextTypes = {
    router: React.PropTypes.object.isRequired,
    store: React.PropTypes.object
}