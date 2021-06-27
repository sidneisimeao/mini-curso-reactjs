import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
  useCallback,
} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Map, TileLayer, Marker } from "react-leaflet";
import { Link, useHistory } from "react-router-dom";
import { LeafletMouseEvent } from "leaflet";

import api from "../../Services/api";
import Dropzone from "../../components/Dropzone";
import logo from "../../assets/logo.svg";

import "./styles.css";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

const CreateLocation: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);

  const [selectedMapPosition, setSelectedMapPosition] = useState<
    [number, number]
  >([0, 0]);

  const [formData, setformData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    city: "",
    uf: "",
  });

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [selectedFile, setSelectedFile] = useState<File>();

  const history = useHistory();

  const handleMapClick = useCallback((event: LeafletMouseEvent): void => {
    setSelectedMapPosition([event.latlng.lat, event.latlng.lng]);
  }, []);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;
      setformData({ ...formData, [name]: value });
    },
    [formData],
  );

  const handleSelectItem = useCallback(
    (id: number) => {
      const alreadySelected = selectedItems.findIndex((item) => item === id);

      if (alreadySelected >= 0) {
        // remove o item caso exista
        const filteredItems = selectedItems.filter((item) => item !== id);
        setSelectedItems(filteredItems);
        return;
      }
      setSelectedItems([...selectedItems, id]);
    },
    [selectedItems],
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault();

      const { city, email, name, uf, whatsapp } = formData;
      const [latitude, longitude] = selectedMapPosition;
      const items = selectedItems;

      const data = new FormData();

      data.append("name", name);
      data.append("email", email);
      data.append("whatsapp", whatsapp);
      data.append("latitude", String(latitude));
      data.append("longitude", String(longitude));
      data.append("city", city);
      data.append("uf", uf);
      data.append("items", items.join(","));

      if (selectedFile) {
        data.append("image", selectedFile);
      }

      await api.post("locations", data);

      history.push("/");
    },
    [formData, selectedItems, selectedFile, history, selectedMapPosition],
  );

  useEffect(() => {
    api.get("items").then((response) => {
      setItems(response.data);
    });
  }, []);

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

          <form onSubmit={handleSubmit}>
            <h1>
              Cadastro do <br /> local de coleta
            </h1>

            <fieldset>
              <legend>
                <h2>Dados</h2>
              </legend>
              <div className="field">
                <Dropzone onFileUploaded={setSelectedFile} />
              </div>
              <div className="field">
                <label htmlFor="name">Nome da entidade</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleInputChange}
                />
              </div>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="email">E-mail</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="whatsapp">Whatsapp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    id="whatsapp"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Endereço</h2>
                <span>Marque o endereço no mapa</span>
              </legend>
              <Map
                center={[-21.78842, -46.562721]}
                zoom={14}
                onclick={handleMapClick}
              >
                <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={selectedMapPosition} />
              </Map>
              <div className="field-group">
                <div className="field">
                  <label htmlFor="city">Cidade</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    onChange={handleInputChange}
                  />
                </div>
                <div className="field">
                  <label htmlFor="uf">Estado</label>
                  <input
                    type="text"
                    name="uf"
                    id="uf"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>
                <h2>Ítens coletados</h2>
                <span>Você pode marcar um ou mais ítens</span>
              </legend>
              <ul className="items-grid">
                {items.map((item) => (
                  <li
                    className={
                      selectedItems.includes(item.id) ? "selected" : ""
                    }
                    key={item.id}
                    onClick={() => handleSelectItem(item.id)}
                  >
                    <img src={item.image_url} alt={item.title} />
                  </li>
                ))}
              </ul>
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
