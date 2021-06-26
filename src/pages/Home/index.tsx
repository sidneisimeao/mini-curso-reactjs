import React from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import "./styles.css";

const Home: React.FC = () => {
  return (
    <div id="page-home">
      <div className="content">
        <header>
          <img src={logo} alt="Reciclagem" />
        </header>

        <main>
          <h1>Coleta Seletiva e reciclagem em geral.</h1>
          <p>
            Reciclagem de materiais diversos, tais como, papel, plástico,
            metais, etc...
          </p>
          <Link to="/create-location">
            <span>
              <FiLogIn />
            </span>
            <strong>Cadastrar novo local de coletas</strong>
          </Link>
        </main>
      </div>
    </div>
  );
};

export default Home;
