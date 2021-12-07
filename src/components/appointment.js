import React from 'react';
import { getToken, logout } from '../utils/auth';

class Appointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_especialidade: '',
            id_clinica: '',
            id_FormasDePagamento: '',
            id_medico: '',
            inicio_consulta: ''
        }
        
        this.initForm = this.initForm.bind(this);

        this.handleEspecialidades = this.handleChangeEspecialidades.bind(this);
        this.handleClinicas = this.handleClinicas.bind(this);
        this.handleFormaPagamento = this.handleFormaPagamento.bind(this);
        this.handleMedicos = this.handleMedicos.bind(this);
        this.horarioConsulta = this.horarioConsulta.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    initForm(e){
        const token = getToken();
            
        const options = {
    		method: 'get',
   			headers: {
	    		'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
   			}
	    }
        
        fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/especialidades', options)
        .then(res => {
   	    	return res.json();
		})
		.then(data => {
		    for(var i = 0; i < data.especialidades.length; i++){
			    $("#especialidade").append(`
   		    		<option value="${data.especialidades[i].id_especialidade}">${data.especialidades[i].especialidade}</option>
			    `)
   			}
	    }).catch(err => {
		    if(err){
			    alert(err);
		    }
	    });
    }

    handleEspecialidades(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(this.state.id_especialidade !== ''){
                $("#clinicas").removeAttr("disabled");
            }

            const token = getToken();
            
            const options = {
	    		method: 'get',
    			headers: {
		    		'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    			}
		    }
        
            fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/clinicas', options)
		    .then(res => {
   				return res.json();
		    })
		    .then(data => {
			    for(var i = 0; i < data.clinicas.length; i++){
                    $("#clinicas").empty();

				    $("#clinicas").append(`
   						<option value="${data.clinicas[i].id_clinica}">${data.clinicas[i].clinica}</option>
				    `)
   				}
		    }).catch(err => {
			    if(err){
				    alert(err);
			    }
		    });
        });
    }

    handleClinicas(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(this.state.id_clinica !== ''){
                $("#FormasDePagamento").removeAttr("disabled");
            }

            const token = getToken();
            
            const options = {
	    		method: 'get',
    			headers: {
		    		'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    			}
		    }
        
            fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/especialidades', options)
		    .then(res => {
   				return res.json();
		    })
		    .then(data => {
			    for(var i = 0; i < data.FormasDePagamento.length; i++){
                    $("#FormasDePagamento").empty();
				    $("#FormasDePagamento").append(`
   						<option value="${data.FormasDePagamento[i].id_FormasDePagamento}">${data.FormasDePagamento[i].FormasDePagamento}</option>
				    `)
   				}
		    }).catch(err => {
			    if(err){
				    alert(err);
			    }
		    });
        });
    }

    handleFormaPagamento(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(this.state.id_FormasDePagamento !== ''){
                $("#medicos").removeAttr("disabled");
            }

            const token = getToken();
            
            const options = {
	    		method: 'get',
    			headers: {
		    		'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    			}
		    }
        
            fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/especialidades', options)
		    .then(res => {
   				return res.json();
		    })
		    .then(data => {
			    for(var i = 0; i < data.clinicas.length; i++){
                    $("#medicos").empty();

				    $("#medicos").append(`
   						<option value="${data.medicos[i].id_medico}">${data.clinicas[i].medico}</option>
				    `)
   				}
		    }).catch(err => {
			    if(err){
				    alert(err);
			    }
		    });
        });
    }

    handleMedicos(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(this.state.id_medico !== ''){
                $("#HorarioConsulta").removeAttr("disabled");
            }
        });
    }

    handleHorarioConsulta(e){
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e){
        e.preventDefault();

        const token = getToken();
            
        const options = {
			method: 'post',
			headers: {
	    		'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
                body: JSON.stringify(this.state)
		}
        
        fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment', options)
		.then(res => {
   		    return res.json();
		})
		.then(() => {
            alert("Consulta marcada com sucesso");
            window.location.href="/appointList";
		}).catch(err => {
		    if(err){
			    alert(err);
                logout();
			}
		});
    }

    render(){
        return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
			    <img src={require("../img/logo.png")} className="logo" id="logo" alt="Clínica Médica Oliveira Cohen"></img>
		    </nav>

            <div className="container">
                <h1 className="form-title">Agendamento de consultas</h1>
                <form className="form" method="POST" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Selecione a área de atendimento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="especialidade" name="especialidade" onChange={this.handleEspecialidades} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o local da consulta <strong>*</strong></label><br/>
                        <select className="form-control" id="clinicas" name="clinicas" onChange={this.handleClinicas} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione a forma de pagamento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="FormasDePagamento" name="FormasDePagamento" onChange={this.handleFormaPagamento} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o médico desejado <strong>*</strong></label><br/>
                        <select className="form-control" id="medicos" name="medicos" onChange={this.handleMedicos} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o dia e hora da consulta: <strong>*</strong></label><br/>
                        <input className="form-control" id="HorarioConsulta" name="HorarioConsulta" type="datetime-local" onChange={this.handleHorarioConsulta} disabled required/>
                    </div><br/>
          
                    <div className="alert alert-info" role="alert">
                        Campos marcados com <strong>*</strong> são obrigatórios.
                    </div>

                    <button type="submit" className="btn btn-success">Marcar</button> 
                    <a className="btn btn-outline-danger" href="/appointList">Cancelar</a>
                </form><br/>
            </div>
        </>);
    }
} export default Appointment