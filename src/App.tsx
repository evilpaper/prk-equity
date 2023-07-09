import { DataFetchDemo } from "./Components/DataFetchDemo";
import Logo from "./assets/PrK-logo-WHITE.svg";
import "./App.css";
import { Forecast } from "./Components/Forecast";

function App() {
  return (
    <div className="app">
      {/* <DataFetchDemo /> */}
      <img
        src={Logo}
        loading="eager"
        width="60"
        alt="ark logo"
        aria-label="home"
      ></img>{" "}
      <h1>SaaS forecast</h1>
      <Forecast />
    </div>
  );
}

export default App;
