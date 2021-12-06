import React from 'react';
import { getToken, logout } from '../utils/auth';
import $ from 'jquery';
import Moment from 'moment';

class AppointList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id_consulta: '0'
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
                        <td class="id_consulta" id="${data[0][i].id_consulta}"></td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].especialidade}</td>
				        <td class="id_consulta" id="${data[0][i].id_consulta}">${Moment(data[0][i].inicio_consulta).format('DD/MM/YYYY hh:mm')}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${Moment(data[0][i].fim_consulta).format('DD/MM/YYYY hh:mm')}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].nome_medico}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].nome_rua}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].cidade}</td>
                        <td class="id_consulta" id="${data[0][i].id_consulta}">${data[0][i].formaPagamento}</td>
				    </tr>`)
			  }
		}).catch(err => alert(err));
    }

    handleChange(e){
        this.setState({
			[e.target.className]: e.target.id
		});
        
        if(this.state.id_consulta !== 0){
            $("#remarcar").removeAttr("disabled");
            $("#desmarcar").removeAttr("disabled");
        }

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
        })
    }

    render(){
        return(
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
			    <img src={require("../img/logo.png")} className="logo" id="logo" alt="Clínica Médica Oliveira Cohen"></img>
                <div class="btn-group" role="group">
                    <button type="button" class="logoutBtn btn btn-outline-primary" onClick="logout">Sair</button>
                </div>

                <form className="appointBtn btn-group" role="group" onSubmit={this.handleDelete}>
                        <a className="btn btn-primary" href="/appointment">Marcar consulta</a>
                        <button type="submit" className="btn btn-danger" id="desmarcar" disabled>Desmarcar</button>
                </form>
		    </nav>

            <div className="container">
                <div className="table-responsive">
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
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
        </>);
    }
} export default AppointList