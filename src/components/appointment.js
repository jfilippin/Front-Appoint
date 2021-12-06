import React from 'react';
import { getToken, logout, isAuth } from '../utils/auth';

class Appointment extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            payment: '',
            area: '',
            city: '',
            clinic: '',
            medic:'',
            appointDT: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.state({
            [e.target.name]: e.target.value
        });

        console.log(this.state);
    }

    handleSubmit(e){
        e.preventDefault();

        // const options = {
		// 	method: 'post',
		// 	headers: {
		// 		'Content-Type': 'application/json'
		// 	},
		// 	body: JSON.stringify(this.state)
		// }
        //fetch
    }

    render(){
        return (
            <div className="container">
                <h1 className="form-title">Agendamento de consultas</h1>
                <form className="form" method="POST" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label>Selecione a forma de pagamento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="payment" name="payment" onChange={this.handleChange} required>
                            <option value="dinheiro">Dinheiro</option>
                            <option value="credito">Crédito</option>
                            <option value="debito">Débito</option>
                            <option value="plano">Plano</option>
                        </select>
                    </div><br/>
             
                    <div className="form-group">
                        <label>Selecione a área de atendimento desejada <strong>*</strong></label><br/>
                        <select className="form-control" id="area" value="area" name="area" onChange={this.handleChange} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione sua cidade <strong>*</strong></label><br/>
                        <select className="form-control" id="city" value="city" name="city" onChange={this.handleChange} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o local da consulta <strong>*</strong></label><br/>
                        <select className="form-control" id="clinic" value="clinic" name="clinic" onChange={this.handleChange} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o médico desejado <strong>*</strong></label><br/>
                        <select className="form-control" id="medic" value="medic" name="medic" onChange={this.handleChange} required></select>
                    </div><br/>

                    <div className="form-group">
                        <label>Selecione o dia e hora da consulta: <strong>*</strong></label><br/>
                        <input type="datetime-local" className="form-control" name="appointDT" id="appointDT" onChange={this.handleChange} required/>
                    </div><br/>
          
                    <div className="alert alert-info" role="alert">
                        Campos marcados com <strong>*</strong> são obrigatórios.
                    </div>

                    <button type="submit" className="btn btn-success" id="botao">Marcar</button> 
                    <a className="btn btn-outline-danger" id="botao" href="http://localhost:3000/appointList">Cancelar</a>
                </form><br/>
            </div>);
    }
} export default Appointment