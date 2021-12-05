import React from "react";
import {} from "axios";
class Register extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
  };
  upDateState = (e) => {
    let newstate = { ...this.state };
    newstate[e.target.id] = e.target.value;
    this.setState(newstate);
  };
  Login = async (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(this.state),
    })
      .then((res) => {
        console.log("Rpromise", res);
      })
      .catch((res) => {
        console.log("ePromise", res);
      });
  };
  render() {
    return (
      <div>
        <div>
          <input
            id="name"
            type="text"
            onChange={this.upDateState}
            value={this.state.name}
          />
          <input
            id="email"
            type="email"
            onChange={this.upDateState}
            value={this.state.email}
          />
          <input
            id="password"
            type="password"
            onChange={this.upDateState}
            value={this.state.password}
          />
          <button type="submit" onClick={this.Login}>
            Submit
          </button>
        </div>
      </div>
    );
  }
}
export default Register;
