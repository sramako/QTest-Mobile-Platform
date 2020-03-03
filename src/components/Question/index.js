import React from "react";
import ReactDOM from 'react-dom';

class Question extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {

        };
        this.selectAnswer = this.selectAnswer.bind(this);
        this.resolveSelection = this.resolveSelection.bind(this);
    }

    componentWillMount() {
        console.log("CHECK:"+this.props.questions);
        this.setState({
            question    :   this.props.questions.question,
            id          :   this.props.questions.id,
            answers     :   this.props.questions.answers,
            user_answers:   this.props.answers
        });
        this.setState({
            selected : this.props.answers[this.props.questions.id-1]
        })
    }

    componentDidMount() {
        setInterval(() => {
            this.setState({
                question    :   this.props.questions.question,
                id          :   this.props.questions.id,
                answers     :   this.props.questions.answers,
                user_answers:   this.props.answers
            });
            this.setState({
                selected : this.props.answers[this.props.questions.id-1]
            })
        }, 1000);
    }

    selectAnswer(e) {
        var selectedAnswer = e.target.id;
        this.props.handler(selectedAnswer);
        this.setState({ selected : e.target.id })
    }

    resolveSelection(id) {
        if( this.state.selected == id) {
            console.log(id+"selected")
            return "selected"
        }
        else {
            return "not_selected"
        }
    }

    render() {
        if(
            this.state.user_answers &&
            this.state.answers
            
        ) {
            return(
                <div id="question-container">
                    <div>{ this.state.question }</div>
                    {this.state.answers.map(answer => {
                        return(
                            <p
                                id = { answer.id }
                                key = { answer.id }
                                onClick = { this.selectAnswer }
                                className = { this.resolveSelection(answer.id) }
                            >
                                { answer.value }
                            </p>
                        )
                    })}
                </div>
        )}
        else {
            return null
        }
    }
}
export default Question;
