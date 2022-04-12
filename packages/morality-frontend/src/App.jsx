import "./App.css";
import React, { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Questions } from "./components/questions";
import { NavBar } from "./components/navbar";
import { Responses } from "./components/responses";

function App() {
  const [nav, setNav] = useState(0);
  return (
    <div className="App">
      <NavBar nav={nav} setNav={setNav} />
      <Stack id="container">{nav === 0 ? <Questions /> : <Responses />}</Stack>
    </div>
  );
}

export default App;
