import logo from "./logo.svg";
import "./App.css";
import Register from "./compnents/reg";
import Login from "./compnents/login";

function App() {
  return (
    <div className="App">
      <Register />
      <div>---Login---</div>
      <Login />
    </div>
  );
}

export default App;
