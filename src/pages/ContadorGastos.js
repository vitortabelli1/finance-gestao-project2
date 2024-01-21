import React, { useState, useEffect } from 'react';

function ContadorGastos() {
  const [tempoDecorrido, setTempoDecorrido] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      // Lógica para atualizar o tempo decorrido (pode ser ajustada de acordo com sua lógica)
      setTempoDecorrido((tempo) => tempo + 1);
    }, 1000); // Atualiza a cada segundo (1000ms)

    return () => clearInterval(interval);
  }, []);

  // Função para formatar o tempo decorrido em um formato legível (horas, minutos, segundos)
  const formatarTempo = (tempo) => {
    const horas = Math.floor(tempo / 3600);
    const minutos = Math.floor((tempo % 3600) / 60);
    const segundos = tempo % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      <h2>Tempo decorrido em gastos:</h2>
      <p>{formatarTempo(tempoDecorrido)}</p>
    </div>
  );
}

export default ContadorGastos;
