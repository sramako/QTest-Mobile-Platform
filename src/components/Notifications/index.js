import React, { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Notifications extends Component {
    notify = () => toast(
        "Wow so easy !",
        {
            position: toast.POSITION.BOTTOM_CENTER
        }
    );

    render(){
        return (
        <div>
            <button onClick={this.notify}>Notify !</button>
            <ToastContainer />
        </div>
        );
    }
}
export default Notifications;