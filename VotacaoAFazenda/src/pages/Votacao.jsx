
import { useState } from "react";
import { Link } from "react-router-dom";

import ParticipanteCard from "../components/ParticipanteCard";
import {
  listarNaRoca,
  listarForaDaRoca,
  registrarVoto,
} from "../services/votacaoService";

function Votacao() {
  const [ultimoVoto, setUltimoVoto] = useState(null);
  const [quantidadeVotos, setQuantidadeVotos] = useState(0);

  const participantesNaRoca = listarNaRoca();
  const participantesForaDaRoca = listarForaDaRoca();

  function handleVotar(participante) {
    registrarVoto(participante.id);
    setUltimoVoto(participante);
    setQuantidadeVotos((anterior) => anterior + 1);
  }

  return (
    <main className="pagina-votacao">
      <section className="secao-votacao">
        <h1>Vote para eliminar</h1>

        <p>
          Escolha um participante para deixar A Fazenda 2026.
        </p>

        <div className="grade-roca">
          {participantesNaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
              onVotar={handleVotar}
            />
          ))}
        </div>

        {ultimoVoto !== null && (
          <div className="mensagem-confirmacao">
            <p>
              Seu voto foi registrado para{" "}
              <strong>{ultimoVoto.nome}</strong>!
            </p>

            <p>
              Você já votou {quantidadeVotos}{" "}
              {quantidadeVotos === 1 ? "vez" : "vezes"} nesta sessão.
            </p>

            <Link to="/resultado">
              Ver resultado da votação
            </Link>
          </div>
        )}
      </section>

      <section className="secao-demais-peoes">
        <h2>Demais peões</h2>

        <div className="grade-peoes">
          {participantesForaDaRoca.map((participante) => (
            <ParticipanteCard
              key={participante.id}
              participante={participante}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Votacao;
