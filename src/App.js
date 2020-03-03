// src.App.js

import React, { Component } from 'react';
import './App.css';

import Navigator from './components/Navigator';
import Question from './components/Question';
import NavigationButtons from "./components/NavigationButtons";
import GoogleLogin from 'react-google-login';

const responseGoogle = (response) => {
	console.log(response);
}

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentQuestion : 1,
			login : false
		};
		this.navigationHandler = this.navigationHandler.bind(this);
		this.answerHandler = this.answerHandler.bind(this);
		this.previousQuestion = this.previousQuestion.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
	}

	componentWillMount() {
		fetch('http://localhost:5000/metadata')
		.then(res => res.json())
		.then((data) => {
			var count = parseInt(data.size);
			this.setState({ count });
			console.log("XHR:"+data);
		})
		.catch(console.log)

		fetch('http://localhost:5000/questions')
		.then(res => res.json())
		.then((questions) => {
			this.setState({ questions })
			var answers = new Array(questions.length);
			for(var i = 0; i < questions.length; i++) {
				answers[i] = -1;
			}
			this.setState({ answers });
			console.log("XHR:"+JSON.stringify(questions));
		})
		.catch(console.log)

	}

	navigationHandler(currentQuestion) {
		this.setState({ currentQuestion : currentQuestion });
	}

	answerHandler(selectedAnswer) {
		var answers = this.state.answers;
		answers[this.state.currentQuestion-1] = selectedAnswer;
		this.setState({ answers : answers });
	}

	nextQuestion() {
        var currentQuestion = parseInt( this.state.currentQuestion );
        var count = parseInt( this.state.count );
        if(currentQuestion < count) {
            currentQuestion = currentQuestion + 1;
            currentQuestion = currentQuestion.toString();
            this.setState({ currentQuestion });
        }
    }

    previousQuestion() {
        var currentQuestion = parseInt( this.state.currentQuestion );
        var count = parseInt( this.state.count );
        if(currentQuestion > 1) {
            currentQuestion = currentQuestion - 1;
            currentQuestion = currentQuestion.toString();
            this.setState({ currentQuestion });
        }
    }

	render() {
		if( login!=true ) {
			ReactDOM.render(
				<GoogleLogin
					clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
					buttonText="Login"
					onSuccess={ responseGoogle }
					onFailure={ responseGoogle }
					cookiePolicy={ 'single_host_origin' }
				/>,
				document.getElementById('googleButton')
			);
		}
		else if(
			this.state.questions && 
			this.state.count &&
			this.state.answers
		) {
			return (
				<div>
					<Navigator
						count={ this.state.count }
						handler={ this.navigationHandler }
						currentQuestion={ this.state.currentQuestion }
						answers={ this.state.answers }
					/>
					<Question
						questions={ this.state.questions[this.state.currentQuestion-1] }
						// key={ this.state.currentQuestion }
						handler={ this.answerHandler }
						currentQuestion={ this.state.currentQuestion }
						answers={ this.state.answers }
					/>
					<NavigationButtons
						previousQuestion = { this.previousQuestion }
						nextQuestion = { this.nextQuestion }
						count={ this.state.count }
						currentQuestion={ this.state.currentQuestion }
						key = { this.state.currentQuestion }
					/>
				</div>
			);
		}
		else {
			return (
				<p>Loading...</p>
			)
		}
	}
}
export default App;