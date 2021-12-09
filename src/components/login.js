import React from 'react';
import { login } from '../utils/auth'

class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email_paciente: '',
			senha_paciente: ''
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	
	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e){
		e.preventDefault();

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}

		fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/login', options)
			.then(res => {
                return res.json();
			})
			.then(data => {
				if(data.err){
					alert(data.err);
				} else {
					login(data.token);
					window.location.href="/appointList"
				}
			}).catch(err => alert(err));
	}
	
	render(){
		return (
			<div>
			<nav className="navbar navbar-expand-lg">
			    <img src={require("../img/logo.png")} className="logo" id="logo" alt="Clínica Médica Oliveira Cohen"></img>
		    </nav>
			<div className="container">        
         		<h1 className="form-title">Login</h1>
		 			<form className="form" method="POST" onSubmit={this.handleSubmit}>
		 				<div className="form-group">
		 					<input type="text" className="form-control" id="email_paciente" name="email_paciente" onChange={this.handleChange} placeholder="Email" required/>
		 				</div><br/>

		 				<div className="form-group">
		 	   				<input type="password" className="form-control" id="senha_paciente" name="senha_paciente" onChange={this.handleChange} placeholder="Senha" required/>
		 				</div><br/>

		 				<button type="submit" className="btn btn-success">Entrar</button>
                 		<a type="button" className="btn btn-outline-primary" href="http://ec2-3-223-180-48.compute-1.amazonaws.com:3000/register">Cadastrar-se</a>
		 			</form>
			</div>
			</div>
		);
	}
} export default Login;
