import React from "react";
import Header from "./components/Header";
import Menu from "./components/Menu";
import Field from "./components/Field";

function App() {
  return (
    <>
      <Header title="Página Inicial" />
      <Menu>
        <ul>
          <li>Eu sou um item</li>
          <li>Eu sou outro</li>
        </ul>
      </Menu>
      <h1>Hello Dev</h1>
      <Field />
    </>
  );
}

export default App;
