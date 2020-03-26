import React from "react";
import Loader from 'react-loader-spinner';
import './LoaderPage.css';

class LoaderPage extends React.Component {
    render() {
        return(
            <div className="container">
                <div className="box">
                    <Loader
                        type="TailSpin"
                        color="#2F90FF"
                        height={100}
                        width={100}
                        timeout={600000} //10 mins
                    />
                </div>
            </div>
        );
    }
}
export default LoaderPage;