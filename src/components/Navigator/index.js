import React from "react";
import './navigator.css';
class Navigator extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {

        };
        this.changeQuestion = this.changeQuestion.bind(this);
    }

    componentWillMount() {
        console.log("CHECK:"+this.props.count)
        var bracket = new Array(this.props.count);
        for(var i = 0; i < bracket.length; i++) {
            bracket[i] = i+1;
        }
        this.setState({
            questions : bracket,
            currentQuestion : this.props.currentQuestion,
            count : this.props.count,
            answers : this.props.answers
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                currentQuestion : this.props.currentQuestion,
                count : this.props.count,
                answers : this.props.answers
            });
        }, 1000);
    }

    changeQuestion(e) {
        var currentQuestion = e.target.id;
        this.setState({ currentQuestion })
        this.props.handler(currentQuestion)
    }

    resolveButtonState(question) {
        if( question == this.state.currentQuestion) {
            return "current"
        }
        else if ( this.state.answers[question - 1] !== '-1' ) {
            return "dirty"
        }
        else {
            return "new"
        }
    }

    render() {
        if( this.state.answers ) {
            return(
            <div className="navigator">
                {this.state.questions.map(question => {
                    return(
                        <span key={ question } className="navigator-layout">
                            <span
                                id = { question }
                                className = { "navb "+this.resolveButtonState(question) }
                                onClick = { this.changeQuestion }
                            >
                                { question }
                            </span>
                        </span>
                    )}
                )}
            </div>
        )}
        else {
            return ""
        }
    }
}
export default Navigator;
