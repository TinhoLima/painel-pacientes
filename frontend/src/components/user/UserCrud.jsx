import React, { Component } from "react";
import Main from "../template/Main";
import axios from "axios";

const date = new Date();
const today = date.toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "2-digit",
});

const headerProps = {
  title: "LISTA CIRÚRGICA - ",
  date: today.toLocaleString(),
};

// Inicio do backend
const baseUrl = "http://localhost:3001/users";
const initialState = {
  user: {
    id: "",
    sala: "",
    horario: "",
    paciente: "",
    procedimento: "",
    medico: "",
    status: "",
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
    const method = user.id ? "put" : "post";
    const url = user.id ? `${baseUrl}/${user.id}` : baseUrl;
    axios[method](url, user).then((resp) => {
      // Atualizar a lista local.
      const list = this.getUpdateList(resp.data);
      this.setState({ user: initialState.user, list });
    });
  }

  getUpdateList(user, add = true) {
    const list = this.state.list.filter((u) => u.id !== user.id);
    if (add) list.unshift(user);
    return list;
  }

  updateField(event) {
    const user = { ...this.state.user };
    user[event.target.name] = event.target.value;
    this.setState({ user });
  }

  load(user) {
    this.setState({ user });
  }

  remove(user) {
    axios.delete(`${baseUrl}/${user.id}`).then((resp) => {
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
            <th>Procedimento</th>
            <th>Nome do médico</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  }

  renderRows() {
    return this.state.list.map((user) => {
      return (
        <tr key={user.id}>
          <td className="sala">{user.sala}</td>
          <td className="hora">{user.horario}</td>
          <td>{user.paciente}</td>
          <td>{user.procedimento}</td>
          <td>{user.medico}</td>
          {/* <td>{user.status}</td> */}
          <td>
            <div className="vermelho"></div>
          </td>
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
