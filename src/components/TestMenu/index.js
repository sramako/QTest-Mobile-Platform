import React from "react";
import './testmenu.css';

class Tests extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {

        };
        this.loadTest = this.loadTest.bind(this);
    }

    componentWillMount() {
        setInterval(() => {
            this.setState({
                tests    :   this.props.tests
            });
        }, 1000);
    }

    loadTest(test, group) {
        console.log("CLICKED:"+test+group);
        this.props.loadTest(test, group);
    }

    render() {
        if(
            this.state.tests
        ) {
            return(
                <div id="testmenu-container">
                    {this.state.tests.map(data => {
                        return(
                            <div
                                className = "gradient-box gradient-night"
                                onClick = { () => this.loadTest(data[1], data[0]) }
                                data-test = { data[1] }
                                data-group = { data[0] }
                                key = { data[0]+'_'+data[1]}
                            >
                                <p className = 'test'>
                                    { data[1] }
                                </p>
                                <p className = 'group'>
                                    { data[0] }
                                </p>
                            </div>
                        )
                    })}
                </div>
        )}
        else {
            return null
        }
    }
}
export default Tests;
