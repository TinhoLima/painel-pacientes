import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const headerProps = {
  title: "Lista Cirúrgica",
};

// Inicio do backend
// const baseUrl = 'https://json-crud-eight.vercel.app/users'
const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: {
    sala: "",
    horario: "",
    paciente: "",
    medico: "",
    procedimento: "",
    leito: "",
    opmematerial: "",
    sangue: "",
    avaliacao: "",
    alergia: "",
    salaposcirurgica: "",
  },

  list: [],
};

export default class UserCrud extends Component {
  state = { ...initialState };

  componentWillMount() {
    axios(baseUrl).then((resp) => {
      this.setState({ list: resp.data });
    });
  }

  clear() {
    this.setState({ user: initialState.user });
  }

  save() {
    // Incluir ou alterar o usuário. Incluir - POST / Alterar - PUT
    const user = this.state.user;
    const method = user.sala ? "put" : "post";
    const url = user.sala ? `${baseUrl}/${user.sala}` : baseUrl;
    if (user == initialState.user) {
      window.alert("Favor preencher todos os campos.");
    } else {
      axios[method](url, user).then((resp) => {
        // Atualizar a lista local.
        const list = this.getUpdateList(resp.data);
        this.setState({ user: initialState.user, list });
      });
    }
  }

  getUpdateList(user, add = true) {
    const list = this.state.list.filter((u) => u.sala !== user.sala);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.save();
    }
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.sala}`).then((resp) => {
      const list = this.getUpdateList(user, false);
      this.setState({ list });
    });
  }

  renderForm() {
    return (
      <div className="form">
        <div className="row"></div>
      </div>
    );
  }

  renderTable() {
    return (
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Sala</th>
            <th>Horário da cirúrgia</th>
            <th>Nome do paciente</th>
            <th>Nome do médico</th>
            <th>Procedimento</th>
            <th>Leito</th>
            <th>OPME - Material</th>
            <th>Sangue</th>
            <th>Termo avaliação</th>
            <th>Alergia</th>
            <th>Sala que vai após a cirurgia</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.sala}>
          <td>{user.sala}</td>
          <td>{user.horario}</td>
          <td>{user.paciente}</td>
          <td>{user.medico}</td>
          <td>{user.procedimento}</td>
          <td>{user.leito}</td>
          <td>{user.opmematerial}</td>
          <td>{user.sangue}</td>
          <td>{user.avaliacao}</td>
          <td>{user.alergia}</td>
          <td>{user.salaposcirurgica}</td>
        </tr>
      );
    });
  }

  render() {
    return (
      <Main {...headerProps}>
        {this.renderForm()}
        {this.renderTable()}
      </Main>
    );
  }
}
