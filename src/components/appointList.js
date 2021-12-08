import React from 'react';
import { getToken, logout } from '../utils/auth';
import $ from 'jquery';
import Moment from 'moment';

class AppointList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_consulta: ''
        }

        this.getTable = this.getTable.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount(){
        window.addEventListener('load', this.getTable);
    }

    getTable(){
	    const token = getToken();
	    const options = {
		    method: 'get',
		    headers: {
		 	   'Content-Type': 'application/json',
		 	   'Authorization': `Bearer ${token}`
		    }
	    }

        fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/appointmentlist', options)
		.then(res => {
			if(!res.ok && res.statusCode === 401) {
				logout();
			} else {
				return res.json();
			}
		})
		.then(data => {
			  for(var i = 0; i < data[0].length; i++){
				  $('#tbody').append(`
                    <tr id="${data[0][i].id_consulta}">
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].especialidade}</td>
				        <td class="id_consulta" id="${data[0][i].id_consulta}">${Moment(data[0][i].inicio_consulta).format('DD/MM/YYYY hh:mm')}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${Moment(data[0][i].fim_consulta).format('DD/MM/YYYY hh:mm')}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].nome_medico}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].nome_rua}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].cidade}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].formaPagamento}</td>
				    </tr>`)
			  }
		}).catch(err => {
            if(err){
                alert(err);
                logout();
            }
        });
    }

    handleChange(e){
        this.setState({
			[e.target.className]: e.target.id
		}, () => {
            if(this.state.id_consulta !== ''){
                $("#remarcar").removeAttr("disabled");
                $("#desmarcar").removeAttr("disabled");
            }

            if($("#tbody tr").hasClass("selecionada")){
                $("#tbody tr").removeAttr("class");
            }
            document.getElementById(this.state.id_consulta).classList.add("selecionada");
        })
    }

    handleDelete(e){
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
 
        fetch('http://ec2-34-201-253-51.compute-1.amazonaws.com:3000/appointmentlist', options)
        .then(res => {
            if(!res.ok && res.statusCode === 401) {
                logout();
            } else {
                return res.json();
            }
        })
        .then(data => {
               window.location.href="/appointList";
        }).catch(err => {
               alert(err);
               logout();
        })
    }

    render(){
        return(
        <div>
            <nav className="navbar navbar-expand-lg">
			    <img src={require("../img/logo.png")} className="logo" id="logo" alt="Clínica Médica Oliveira Cohen"></img>

                <form className="appointBtn btn-group" role="group" onSubmit={this.handleDelete}>
                        <a className="btn btn-primary" href="/appointment">Marcar consulta</a>
                        <button type="submit" className="btn btn-danger" id="desmarcar" disabled>Desmarcar</button>
                </form>
		    </nav>

            <div className="container">
            <h1 className="form-title">Suas consultas</h1>
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>Área médica</th>
                                <th>Início da consulta</th>
                                <th>Término da consulta</th>
                                <th>Médico</th>
                                <th>Local da consulta</th>
                                <th>Cidade da consulta</th>
                                <th>Forma de pagamento</th>
                            </tr>
                        </thead>
              
                        <tbody id="tbody" name="id_consulta" onClick={this.handleChange}></tbody>
                    </table>
                <div/>
            </div>
        </div>
        </div>);
    }
} export default AppointList