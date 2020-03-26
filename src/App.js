// src.App.js

import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import './App.css';
import { urlConfig } from './conf.js';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navigator from './components/Navigator';
import Question from './components/Question';
import NavigationButtons from "./components/NavigationButtons";
import Logout from "./components/Logout";
import NavBar from "./components/NavBar";
import Tests from "./components/TestMenu";
import Notifications from "./components/Notifications";
import LoaderPage from "./components/Loader";
import { css } from 'glamor';
import Cookies from 'js-cookie';

class App extends Component {
	constructor() {
		super();
		this.state = {
			currentQuestion : 1,
			login : false,
			page : "login"
		};
		this.navigationHandler = this.navigationHandler.bind(this);
		this.answerHandler = this.answerHandler.bind(this);
		this.previousQuestion = this.previousQuestion.bind(this);
		this.nextQuestion = this.nextQuestion.bind(this);
		this.loadTests = this.loadTests.bind(this);
		this.loadTest = this.loadTest.bind(this);
		this.selectTest = this.selectTest.bind(this);
	}

	//#region Authentication
	responseGoogleSuccess = (response) => {
		console.log(response);
		this.setState({
			profile : response.profileObj,
			login : true,
			page : "signup",
		});
		// this.loadTests();
	}

	responseGoogleFailure = (response) => {
		console.log("ERROR");
		console.log(response);
	}
	//#endregion

	componentDidMount() {
		this.interval = setInterval(() => this.syncAPI(), 60000);
	}

	notify = (message) => toast(
        message,
        {
			position: toast.POSITION.BOTTOM_LEFT,
			draggablePercent: 60,
			autoClose: 1500,
			className: css({
				background: 'black'
			})
        }
	);
	
	//#region Data API Calls
	selectTest(test, group) {
		this.setState({
			test	:	test,
			group	:	group,
			page	:	"test"
		})
		console.log("trying to set test, group")
	}

	loadTest(test, group) {
		// args: email, group, test
		var requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.profile["email"],
				group: this.state.group,
				test: this.state.test
			})
		}
		console.log(this.state.test)
		fetch(urlConfig.url+'metadata', requestOptions)
		.then(res => res.json())
		.then((data) => {

			// metadata
			var count = parseInt(data.metadata);
			this.setState({ count });
			var answers = new Array(count);
			for(var i = 0; i < count; i++) {
				answers[i] = -1;
			}
			this.setState({ answers });

			// questions
			this.setState({ questions : data.questions })
			console.log("XHR:"+JSON.stringify(this.questions));
			this.notify('Loading Test')

		})
		.catch(console.log)

		this.syncAPI();
	}

	loadTests( ) {
		// args: email
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: this.state.profile["email"]
				// email: "sramakoo@gmail.com"
			})
		}
		console.log("API CALL"+this.state)
		fetch(urlConfig.url+'tests', requestOptions)
		.then(res => res.json())
		.then((data) => {
			var tests = data;
			this.setState({ tests });
			console.log("XHR:"+data);
			console.log("NOTIFY")
			this.notify('Tests Loaded')
		})
		.catch(console.log)
	}

	tryLogin( username, password ) {
		// args: email
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email: username,
				password: password
			})
		}
		console.log("Internal Login")
		fetch(urlConfig.url+'authentication', requestOptions)
		.then(res => res.json())
		.then((data) => {
			var tests = data;
			if(data["state"]!="error") {
				this.setState({
					login	:	true,
					profile	:	{
						"googleId": data["googleId"],
						"imageUrl": data["imageUrl"],
						"email": data["email"],
						"name": data["name"],
						"givenName": data["givenName"],
						"familyName": data["familyName"]
					},
					page	:	"tests"
				})
			}
			this.notify('Tests Loaded')
		})
		.catch(console.log)
		return false
	}

	trySignup( username, password ) {
		// args: email
		const requestOptions = {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				email		: username,
				password	: password,
				googleId	: this.state.profile["googleId"],
				imageUrl	: this.state.profile["imageUrl"],
				email		: this.state.profile["email"],
				name		: this.state.profile["name"],
				givenName	: this.state.profile["givenName"],
				familyName	: this.state.profile["familyName"]
			})
		}
		console.log("Signup")
		fetch(urlConfig.url+'authentication', requestOptions)
		.then(res => res.json())
		.then((data) => {
			var tests = data;
			if(data["state"]!="error") {
				this.notify('Signed Up')
			}		
		})
		.catch(console.log)
	}

	syncAPI() {
		if (
			this.state.questions && 
			this.state.count &&
			this.state.answers &&
			this.state.profile &&
			this.state.page === "test"
		)
		{
			console.log("SYNCAPI")
			var requestOptions = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					email: this.state.profile["email"],
					group: this.state.group,
					test: this.state.test,
					answer: this.state.answers
				})
			}
			console.log(requestOptions)
			fetch(urlConfig.url+'status', requestOptions)
			.then(res => res.text())
			.then((data) => {
				var s = JSON.stringify(data);
				var s = JSON.parse(data)

				// updated answer
				// TODO: Answer Sanity Check
				this.setState({ answers : s["ANSWER"] })

				// climax
				this.setState({ climax : s.CLIMAX })

				this.notify('Syncing with Server')

				this.setState({ sync : true })
			})
			.catch(console.log)
		}
	}
	//#endregion

	//#region Navigation
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
        if(currentQuestion > 1) {
            currentQuestion = currentQuestion - 1;
            currentQuestion = currentQuestion.toString();
            this.setState({ currentQuestion });
        }
	}
	//#endregion

	render() {
		// LOGIN
		if(
			this.state.login!==true &&
			this.state.page==="login"
		) {
			//#region autologin
			var username = Cookies.get('username')
			var password = Cookies.get('password')
			var result = this.tryLogin(username, password)
			if(result == false) {
				return(
					
					<div>
						<div>Wrong credentials or account does not exist!</div>
						<GoogleLogin
							clientId={ urlConfig.client_id }
							buttonText="Sign Up with Google"
							onSuccess={ this.responseGoogleSuccess }
							onFailure={ this.responseGoogleFailure }
							cookiePolicy={ 'single_host_origin' }
						/>
						<div>
							Username : { Cookies.get('username') }
							Password : { Cookies.get('password') }
						</div>
				</div>
				)
			}

			// this.setState({
			// 	login	:	true,
			// 	profile	:	{
			// 		"googleId": "101871717918121156189",
			// 		"imageUrl": "assets/avatar.jpg",
			// 		"email": "sramakoo@gmail.com",
			// 		"name": "Sram Ako",
			// 		"givenName": "Sram",
			// 		"familyName": "Ako"
			// 	},
			// 	page	:	"tests"
			// })
			//#endregion
			return(
				<div>
					<GoogleLogin
						clientId={ urlConfig.client_id }
						buttonText="Sign Up with Google"
						onSuccess={ this.responseGoogleSuccess }
						onFailure={ this.responseGoogleFailure }
						cookiePolicy={ 'single_host_origin' }
					/>
					<div>
						Username : { Cookies.get('username') }
						Password : { Cookies.get('password') }
					</div>
				</div>
			);
		}

		// SIGN UP
		else if(
			this.state.profile &&
			this.state.page === "signup"
		)
		{
			var username;
			var password;
			// function setUser(s) {
			// 	username = s
			// }
			function setPass(s) {
				password = s
			}
			return(
				<div>
					{/* <div>
						Email : <input onChange={event => setUser(event.target.value)} />
					</div> */}
					<div>
						Password : <input onChange={event => setPass(event.target.value)} />
					</div>
					<button onClick={ this.trySignup(this.state.profile["email"], password) }>
						SignUp
					</button>
				</div>
			);
		}		

		// TEST MENU
		else if(
			this.state.profile &&
			this.state.tests &&
			this.state.page === "tests"
		) {
			return(
				<div>
					<NavBar
						profile={ this.state.profile }
					>
					</NavBar>
					<Tests 
						tests={ this.state.tests }
						loadTest={ this.selectTest }
					/>
					<ToastContainer />
				</div>
			);
		}

		// TEST
		else if(
			this.state.questions && 
			this.state.count &&
			this.state.answers &&
			this.state.profile &&
			this.state.page === "test" &&
			this.state.sync
		) {
			return (
				<div>
					<NavBar
						profile={ this.state.profile }
					/>
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
					<ToastContainer />
				</div>
			);
		}

		// BUFFER
		else {
			if(this.state.page=="tests") {
				this.loadTests();
			}
			if(this.state.page=="test") {
				this.loadTest(this.state.test, this.state.group)
			}
			return (
				<LoaderPage />
			)
		}
	}
}
export default App;