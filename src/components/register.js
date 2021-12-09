import React from 'react';
import $ from 'jquery';
import InputMask from 'react-input-mask';

/* eslint-disable */
class Register extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			nome_paciente: '',
			email_paciente: '',
			senha_paciente: '',
			confirmacao_senha: '',
			cpf_paciente: '',
			data_nascimento_paciente: '',
			sexo: 'm',
			telefone: '',
			id_cidade: '',
			bairro: '',
			nome_rua: '',
			numero: '',
			complemento: ''
		};

		this.estado = { id_estado: '' };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.handleChangeEstado = this.handleChangeEstado.bind(this);
	}

	componentDidMount(){
		window.addEventListener('load', this.getEstados);

		const options = {
			method: 'get',
			headers: {
				'Content-Type': 'application/json'
			}
		}

		fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/registration/estados', options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				for(var i = 0; i < 27; i++){
					$("#estado").append(`
						<option value="${data.estados[i].id_estado}">${data.estados[i].estado}</option>
					`)
				}
			}).catch(err => {
				if(err){
					alert(err);
				}
			});
	}

	handleChange(e){
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleChangeEstado(e){
		this.estado.id_estado = e.target.value;

		if(this.estado.id_estado != null){
			$("#id_cidade").removeAttr("disabled");
		} 

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.estado)
		}

		fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/registration/cidades', options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				
				$("#id_cidade").empty();

				for(var j = 0; j < data.cidades.length; j++){
					$("#id_cidade").append(`
						<option value="${data.cidades[j].id_cidade}">${data.cidades[j].cidade}</option>
					`)
				}
			}).catch(err => {
				if(err){
					alert(err);
				}
			});
	}

	handleSubmit(e){
		e.preventDefault();

		var telefoneSemMascara = this.state.telefone;
		var cpfSemMascara = this.state.cpf_paciente;

		telefoneSemMascara = telefoneSemMascara.replace(/[^0-9,]*/g, '').replace(',', '.');
		cpfSemMascara = cpfSemMascara.replace(/[^0-9,]*/g, '').replace(',', '.');

		this.state.cpf_paciente = cpfSemMascara;
		this.state.telefone = telefoneSemMascara;

		const options = {
			method: 'post',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		}

		fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/registration', options)
			.then(res => {
				return res.json();
			})
			.then(data => {
				if(data.err){
					alert(data.err);
				} else {
					window.location.href="/"
				}
			}).catch(err => {
				if(err){
					alert(err);
				}
			});
	}

	render(){
		return (
			<div>
				<nav className="navbar navbar-expand-lg">
				    <img src={require("../img/logo.png")} className="logo" id="logo" alt="Clínica Médica Oliveira Cohen"></img>
			    </nav>
				<div className="container">
	        		<h1 className="form-title">Cadastro de usuário</h1>
    	    		<form className="form" method="POST" onSubmit={this.handleSubmit}>
						<div className="form-group">
               				<label>Nome completo: <strong>*</strong></label><br/>
               				<input type="text" className="form-control" name="nome_paciente" id="nome_paciente" onChange={this.handleChange} placeholder="Seu nome aqui" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>E-mail: <strong>*</strong></label><br/>
               				<input type="email" className="form-control" name="email_paciente" id="email_paciente" onChange={this.handleChange} placeholder="usuario@email.com" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Senha: <strong>*</strong></label><br/>
               				<input type="password" className="form-control" name="senha_paciente" id="senha_paciente" onChange={this.handleChange} placeholder="Senha" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Confirme sua senha: <strong>*</strong></label><br/>
               				<input type="password" className="form-control" name="confirmacao_senha" id="confirmacao_senha" onChange={this.handleChange} placeholder="Senha" required/>
          				</div><br/>

          				<div className="form-group">
	               			<label>Telefone: <strong>*</strong></label><br/>
    	           			<InputMask type="text" className="form-control" name="telefone" id="telefone" onChange={this.handleChange} mask="(99) 99999-9999" placeholder="(xx) 9xxxx-xxxx" required/>
        	  			</div><br/>

          				<div className="form-group">
               				<label>CPF: <strong>*</strong></label><br/>
               				<InputMask type="text" className="form-control" name="cpf_paciente" id="cpf_paciente" onChange={this.handleChange} mask="999.999.999-99" placeholder="xxx.xxx.xxx-xx" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Data de nascimento: <strong>*</strong></label><br/>
               				<input type="date" className="form-control" name="data_nascimento_paciente" id="data_nascimento_paciente" onChange={this.handleChange} placeholder="dd/mm/aaaa" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Sexo: <strong>*</strong></label><br/> 
               				<select value={this.state.sexo} name="sexo" onChange={this.handleChange} className="form-control" id="sex">
	                   			<option value="m">Masculino</option>
    	               			<option value="f">Feminino</option>
        	           			<option value="o">Outro</option>
            	   				</select>
          				</div><br/>

          				<div className="form-group">
               				<label>Endereço: <strong>*</strong></label><br/>
               				<input type="text" className="form-control" name="nome_rua" id="nome_rua" onChange={this.handleChange} placeholder="Rua das Bananeiras" required/>
          				</div><br/>

						<div className="form-group">
	               			<label>Bairro: <strong>*</strong></label><br/>
    	           			<input type="text" className="form-control" name="bairro" id="bairro" onChange={this.handleChange} placeholder="Vargem do Bom Jesus" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>N° da residência: <strong>*</strong></label><br/>
               				<input type="number" className="form-control" name="numero" id="numero" onChange={this.handleChange} placeholder="99" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Complemento: <strong>*</strong></label><br/>
               				<input type="text" className="form-control" name="complemento" id="complemento" onChange={this.handleChange} placeholder="Casa" required/>
          				</div><br/>

          				<div className="form-group">
               				<label>Estado: <strong>*</strong></label><br/>
               				<select name="id_estado" className="form-control" id="estado" onChange={this.handleChangeEstado}></select>
          				</div><br/>

          				<div className="form-group">
               				<label>Cidade: <strong>*</strong></label><br/>
               				<select className="form-control"  name="id_cidade" id="id_cidade" onChange={this.handleChange} disabled></select>
          				</div><br/>

          				<div className="alert alert-info" role="alert">
               				Campos marcados com <strong>*</strong> são obrigatórios.
          				</div>

          				<button type="submit" className="btn btn-success">Enviar</button> 
          				<button type="reset" className="btn btn-outline-danger">Recomeçar</button>
						<a type="button" className="btn btn-outline-secondary" href="http://ec2-3-223-180-48.compute-1.amazonaws.com:3000/">Voltar</a>
         			</form><br/>
		 		</div>
			</div>);
	}
} export default Register;
