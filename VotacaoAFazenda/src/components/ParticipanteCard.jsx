
function ParticipanteCard({ participante, onVotar }) {
  return (
    <article
      className={
        participante.naRoca
          ? "participante-card card-roca"
          : "participante-card"
      }
    >
      <div className="participante-foto">
        <img
          src={participante.foto}
          alt={participante.nome}
        />
      </div>

      <div className="participante-info">
        <h3>{participante.nome}</h3>

        {participante.naRoca && (
          <span className="selo-roca">Na roça</span>
        )}

        {onVotar && (
          <button
            type="button"
            onClick={() => onVotar(participante)}
          >
            Votar para eliminar
          </button>
        )}
      </div>
    </article>
  );
}

export default ParticipanteCard;
