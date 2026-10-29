
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  obterVotos,
  calcularResultado,
  calcularTotalVotos,
  zerarVotos,
} from "../services/votacaoService";

function Resultado() {
  const [votos, setVotos] = useState(() => obterVotos());

  const totalVotos = calcularTotalVotos(votos);
  const placar = calcularResultado(votos);

  function handleZerarVotos() {
    const confirmou = window.confirm(
      "Tem certeza de que deseja zerar todos os votos?"
    );

    if (confirmou) {
      zerarVotos();
      setVotos(obterVotos());
    }
  }

  return (
    <main className="pagina-resultado">
      <h1>Resultado da votação</h1>

      <p>
        Total de votos: <strong>{totalVotos}</strong>
      </p>

      {totalVotos === 0 ? (
        <section className="sem-votos">
          <p>Ainda não há votos registrados.</p>
          <Link to="/votacao">Ir para a votação</Link>
        </section>
      ) : (
        <>
          <section className="placar">
            {placar.map((participante, index) => (
              <article
                key={participante.id}
                className={
                  index === 0
                    ? "placar-item placar-lider"
                    : "placar-item"
                }
              >
                <div className="placar-cabecalho">
                  <h2>{participante.nome}</h2>

                  {index === 0 && (
                    <span className="selo-lider">
                      Sairia hoje
                    </span>
                  )}
                </div>

                <p>
                  {participante.votos}{" "}
                  {participante.votos === 1 ? "voto" : "votos"}
                  {" — "}
                  {participante.percentual.toLocaleString("pt-BR", {
                    maximumFractionDigits: 1,
                  })}
                  %
                </p>

                <div
                  className="barra"
                  role="progressbar"
                  aria-valuenow={participante.percentual}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div
                    className="barra-preenchida"
                    style={{
                      width: `${participante.percentual}%`,
                    }}
                  />
                </div>
              </article>
            ))}
          </section>

          <button type="button" onClick={handleZerarVotos}>
            Zerar votação
          </button>
        </>
      )}
    </main>
  );
}

export default Resultado;
