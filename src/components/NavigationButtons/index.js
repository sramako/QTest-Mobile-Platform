import React from "react";
import './navigationbuttons.css';

class NavigationButtons extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            previousActive : true,
            nextActive : true,
            previousStyle : {
                backgroundColor : 'rgb(47, 144, 255)',
                color : 'white'
            },
            nextStyle : {
                backgroundColor : 'rgb(47, 144, 255)',
                color : 'white'
            }
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        var count = this.props.count;
        var currentQuestion = this.props.currentQuestion;
        console.log(count)
        if( currentQuestion == 1) {
            this.setState({
                previousActive : false,
                previousStyle : {
                    backgroundColor : 'rgb(224, 224, 224)',
                    color : 'black'
                }
            })
        }
        if( currentQuestion == count) {
            this.setState({
                nextActive : false,
                nextStyle : {
                    backgroundColor : 'rgb(224, 224, 224)',
                    color : 'black'
                }
            })
        }
    }

    previous() {
        this.props.previousQuestion();
    }

    next() {
        this.props.nextQuestion();
    }

    render() {
        return(
            <div className="navigationButtons">
                <div 
                    id = 'previous'
                    disabled = { !this.state.previousActive }
                    onClick = { this.previous }
                    className = 'navigationButton'
                    style = { this.state.previousStyle }
                >
                    Previous
                </div>

                <div 
                    id = 'next'
                    disabled = { !this.state.nextActive }
                    onClick = { this.next }
                    className = 'navigationButton'
                    style = { this.state.nextStyle }
                >
                    Next
                </div>
            </div>
    )}
}
export default NavigationButtons;
