import React, { useState, useEffect } from "react";
import "./../css/mandioca.css";
import Header from "./header";
// import { RadioButton } from "primereact/radiobutton";
import add_lista from "./../../svgs/add_lista.svg";
import download_selec from "./../../svgs/download_selec.svg";
import selec_all from "./../../svgs/selec_all.svg";
import playlist_add from "./../../svgs/playlist_add.svg";
import get_app from "./../../svgs/get_app.svg";
import cicle from "./../../svgs/cicle.svg";
// import cicle_preenchido from "../../svgs/cicle_preenchido.svg";
import JK from "./../../svgs/JK.svg";

const Post = async (obra, code, nome) => {
  const rawResponse = await fetch(
    "https://DotingMeaslyAstronomy.wayukier.repl.co/api/listas",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        obra: obra,
        code: code,
        nome: nome,
      }),
    }
  );
  const content = await rawResponse.json();

  console.log(content);
};

// const Post = (obra, code, nome) => {
//   const params = {
//     obra: obra,
//     code: code,
//     nome: nome,
//   };
//   const options = {
//     method: "POST",
//     body: JSON.stringify(params),
//   };
//   fetch("https://DotingMeaslyAstronomy.wayukier.repl.co/api/listas", options)
//     .then((response) => response.json())
//     .then((response) => {
//       console.log(response);
//     });
// };

const ItemLista = (props) => {
  const handlePlaylistAdd = () => {};
  const handleGetApp = () => {};
  const handleCicle = (obra, code, nome) => {
    Post(obra, code, nome);
  };

  return (
    <>
      <h3 id="nome_lista">{props.nome}</h3>
      <h4 id="code_lista">{props.code}</h4>
      <h4 id="obra_lista">{props.obra}</h4>
      <div className="opcao">
        <img src={playlist_add} alt="" onClick={() => handlePlaylistAdd(props.id)} />
        <img
          src={get_app}
          id="get_app_lista"
					alt=""
          onClick={() => handleGetApp(props.id)}
        />
        <img
          src={cicle}
          id="get_cicle"
					alt=""
          onClick={() => handleCicle(props.obra, props.code, props.nome)}
        />
      </div>
    </>
  );
};

const Lista = (props) => {
  const { vetor } = props;
  return (
    <ul className="lista">
      {vetor.map((user) => {
        const { _id, obra, code, nome } = user;
        return (
          <>
            <li key={_id} className="itemLista">
              <ItemLista id={_id} obra={obra} code={code} nome={nome} />
            </li>
          </>
        );
      })}
    </ul>
  );
};

const Everything = () => {
  const [users, setUsers] = useState([]);
  const [obra, setObra] = useState("");
  const [code, setCode] = useState("");
  const [nome, setNome] = useState("");
  const [url, setUrl] = useState(
    "https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Angel%20Beats!"
  );
  const [estado, setEstado] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nome) {
      console.log("Legal, temos um nome!");
      setUrl(
        `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/nome/${nome}`
      );
      // setEstado("[ATENÇÃO] Buscando por Música");
    } else if (code) {
      console.log("Legal temos um código yeh");
      setUrl(
        `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas/code/${code}`
      );
      // setEstado("[ATENÇÃO] Buscando por ID");
    } else if (obra) {
      console.log("Legal temos uma obra! YEHHH");
      if (obra === "*") {
        setUrl(`https://dotingmeaslyastronomy.wayukier.repl.co/api/m`);
      } else {
        setUrl(
          `https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=${obra}`
        );
      }
      // setEstado("[ATENÇÃO] Buscando por Obra");
      console.log(url);
    } else {
      console.log("Vish, não sei o que temos! Então vou colocar Angel Beats!");
      setUrl(
        "https://dotingmeaslyastronomy.wayukier.repl.co/api/musicas?obra=Angel%20Beats!"
      );
      // setEstado("[ATENÇÃO] Falha na entrada! Exibindo Angel Beats!");
    }
    // Após pesquisar todos os campos são limpos, para se preparar para próxima pesquisa
    setNome("");
    setCode("");
    setObra("");
  };

  const getUsers = async () => {
    const response = await fetch(url);
    const users = await response.json();
    setUsers(users);
    console.log(users);
  };

  useEffect(() => {
    getUsers();
  }, [url]);

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <h1 className="titulo">[BUSCAR]</h1>
        <div className="Obra">
          <label htmlFor="Obra">Obra</label>
          <input
            type="text"
            id="Obra"
            value={obra}
            placeholder="Angel Beats!"
            onChange={(event) => setObra(event.target.value)}
          ></input>
        </div>
        <div className="Secundario">
          <div className="ID">
            <label htmlFor="ID">ID</label>
            <input
              type="text"
              id="ID"
              value={code}
              placeholder="33300"
              onChange={(event) => setCode(event.target.value)}
            ></input>
          </div>
          <div className="Musica">
            <label htmlFor="Música">Música</label>
            <input
              type="text"
              id="Música"
              value={nome}
              placeholder="Ichiban no Takaramono (Yui version) (ED2)"
              onChange={(event) => setNome(event.target.value)}
            ></input>
          </div>
        </div>
        <div className="inferior">
          <h3>{estado}</h3>
          <button type="submit" className="btn">
            BUSCAR
          </button>
        </div>
        <div className="opcs">
          <img src={add_lista} alt="" />
          <img src={download_selec} id="ds" alt="" />
          <img src={selec_all} alt="" />
        </div>
      </form>
      <Lista vetor={users} />
      <img src={JK} alt="Mascot JK" className="animegirl" />
    </>
  );
};

export default Everything;
