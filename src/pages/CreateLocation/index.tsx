import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

import logo from "../../assets/logo.svg";

import "./styles.css";

const CreateLocation: React.FC = () => {
  return (
    <>
      <div id="page-create-location">
        <div className="content">
          <header>
            <img src={logo} alt="Coleta Seletiva" />
            <Link to="/">
              <FiArrowLeft />
              Voltar para home
            </Link>
          </header>

          <form>
            <h1>
              Cadastro do <br /> local de coleta
            </h1>

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <div className="field">
                <label htmlFor="name">Nome da entidade</label>
                <input type="text" name="name" id="name" />
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input type="email" name="email" id="email" />
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input type="text" name="whatsapp" id="whatsapp" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Marque o endereço no mapa</span>
              </legend>

              <div className="field-group">
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <input type="text" name="city" id="city" />
                </div>
                <div className="field">
                  <label htmlFor="uf">Estado</label>
                  <input type="text" name="uf" id="uf" />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Ítens coletados</h2>
                <span>Você pode marcar um ou mais ítens</span>
              </legend>
              <ul className="items-grid"></ul>
            </fieldset>

            <button type="submit">Cadastrar local de coleta</button>
          </form>
        </div>
      </div>
      );
    </>
  );
};

export default CreateLocation;
