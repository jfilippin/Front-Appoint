import React from 'react';
import $ from 'jquery';
import { getToken, logout } from '../utils/auth';
import Moment from 'moment';

class Appointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_especialidade: '',
            id_clinica: '',
            id_FormasDePagamento: '',
            id_medico: '',
            inicio_consulta: '',
            id_endereco: ''
        }
        
        this.handleEspecialidades = this.handleEspecialidades.bind(this);
        this.handleClinicas = this.handleClinicas.bind(this);
        this.handleEnderecos = this.handleEnderecos.bind(this);
        this.handleFormaPagamento = this.handleFormaPagamento.bind(this);
        this.handleMedicos = this.handleMedicos.bind(this);
        this.handleHorarioConsulta = this.handleHorarioConsulta.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
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
			    $("#id_especialidade").append(`
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
            if(this.state.id_especialidade != null){
                $("#id_clinica").removeAttr("disabled");
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
                if(data.err){
                    alert(data.err);
                } 
                $("#id_clinica").empty();
                for(var i = 0; i < data.clinicas.length; i++){                   
				    $("#id_clinica").append(`
   						<option value="${data.clinicas[i].id_clinica}" class="${data.clinicas[i].Enderecos_id_endereco}">${data.clinicas[i].nome_clinica}</option>
				    `);
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
                $("#id_FormasDePagamento").removeAttr("disabled");
                this.handleEnderecos();
            }
            
            const token = getToken();
            
            const options = {
	    		method: 'get',
    			headers: {
		    		'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    			}
		    }
        
            fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/FormasDePagamento', options)
		    .then(res => {
   				return res.json();
		    })
		    .then(data => {
                if(data.err){
                    alert(data.err);
                }

                $("#id_FormasDePagamento").empty();
			    for(var i = 0; i < data.formasDePagamento.length; i++){
				    $("#id_FormasDePagamento").append(`
   						<option value="${data.formasDePagamento[i].id_FormasDePagamento}">${data.formasDePagamento[i].formaPagamento}</option>
				    `)
   				}
		    }).catch(err => {
			    if(err){
				    alert(err);
			    }
		    });
        });

    }

    handleEnderecos(e){
        const token = getToken();
        
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(this.state)
        }

        console.log(JSON.stringify(this.state));

        fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/enderecos', options)
		.then(res => {
   			return res.json();
		})
		.then(data => { 
            $('input[name="id_endereco"]').val(data.endereco[0].nome_rua);
            $('input[name="id_endereco"]').attr("id", data.endereco[0].id_endereco);
            
            var id_endereco = $('input[name="id_endereco"]').attr("id");
            
            this.state.id_endereco = id_endereco;
        })
        .catch(err => {
            alert(err);
        });

    }

    handleFormaPagamento(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            if(this.state.id_FormasDePagamento !== ''){
                $("#id_medico").removeAttr("disabled");
            }

            const token = getToken();
            
            const options = {
	    		method: 'get',
    			headers: {
		    		'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
    			}
		    }
        
            fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/makeAppointment/medicos', options)
		    .then(res => {
   				return res.json();
		    })
		    .then(data => {
                $("#id_medico").empty();

                for(var i = 0; i < data.medicos.length; i++){
				    $("#id_medico").append(`
   						<option value="${data.medicos[i].id_medico}">${data.medicos[i].nome_medico}</option>
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
                $("#inicio_consulta").removeAttr("disabled");
            }
        });
    }

    handleHorarioConsulta(e){
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            var consultaDT = this.state.inicio_consulta;
            consultaDT = Moment(consultaDT).format('YYYY-MM-DD hh:mm:ss');

            this.state.inicio_consulta = consultaDT;
        });
    }

    handleSubmit(e){
        e.preventDefault();

        console.log(this.state);

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
		.then(data => {
            if(data.err){
                alert(JSON.stringify(data));
            } else {
                window.location.href="/appointList";
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
                <h1 className="form-title">Agendamento de consultas</h1>
                <form className="form" method="POST" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Selecione a área de atendimento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="id_especialidade" name="id_especialidade" onChange={this.handleEspecialidades} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione a clínica desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="id_clinica" name="id_clinica" onChange={this.handleClinicas} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Endereço da clínica:</label><br/>
		 				<input type="text" className="form-control" id="id_endereco" name="id_endereco" disabled/>
		 			</div><br/>

                    <div className="form-group">
                        <label>Selecione a forma de pagamento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="id_FormasDePagamento" name="id_FormasDePagamento" onChange={this.handleFormaPagamento} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o médico desejado <strong>*</strong></label><br/>
                        <select className="form-control" id="id_medico" name="id_medico" onChange={this.handleMedicos} disabled required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o dia e hora da consulta: <strong>*</strong></label><br/>
                        <input className="form-control" id="inicio_consulta" name="inicio_consulta" type="datetime-local" onChange={this.handleHorarioConsulta} disabled required/>
                    </div><br/>

                    <div className="alert alert-info" role="alert">
                        Campos marcados com <strong>*</strong> são obrigatórios.
                    </div>

                    <button type="submit" className="btn btn-success">Marcar</button> 
                    <a className="btn btn-outline-danger" href="/appointList">Cancelar</a>
                </form><br/>
            </div>
        </div>);
    }
} export default Appointment