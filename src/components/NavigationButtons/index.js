import React from "react";
import ReactDOM from 'react-dom';

class NavigationButtons extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            previousActive : true,
            nextActive : true
        };
        this.previous = this.previous.bind(this);
        this.next = this.next.bind(this);
    }

    componentWillMount() {
        var count = this.props.count;
        var currentQuestion = this.props.currentQuestion;
        console.log(count)
        if( currentQuestion == 1) {
            this.setState({ previousActive : false })
        }
        if( currentQuestion == count) {
            this.setState({ nextActive : false })
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
                <button 
                    id = 'previous'
                    disabled = { !this.state.previousActive }
                    onClick = { this.previous }
                >
                    Previous
                </button>

                <button 
                    id = 'next'
                    disabled = { !this.state.nextActive }
                    onClick = { this.next }
                >
                    Next
                </button>
            </div>
    )}
}
export default NavigationButtons;
