import { GoogleLogout } from 'react-google-login';
import React from "react";
import { urlConfig } from '../../conf';

class Logout extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentWillMount() {

    }

    // Pass as props to flush profile
    logout() {
        console.log("Logged Out")
    }

    render() {
        return(
            <GoogleLogout
                clientId={ urlConfig.client_id }
                buttonText="Logout"
                onLogoutSuccess={ this.logout }
            >
            </GoogleLogout>
    )}
}
export default Logout;