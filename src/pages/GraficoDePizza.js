import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const GraficoDePizza = ({ registrosDespesas }) => {
  // Verifica se registrosDespesas é uma matriz válida antes de usar reduce
  if (!Array.isArray(registrosDespesas)) {
    return <div>Nenhum dado disponível para o gráfico.</div>;
  }

  // Calcula a contagem de cada categoria de despesa
  const categorias = registrosDespesas.reduce((acc, registro) => {
    if (registro.categoria in acc) {
      acc[registro.categoria]++;
    } else {
      acc[registro.categoria] = 1;
    }
    return acc;
  }, {});

  const labels = Object.keys(categorias);
  const data = Object.values(categorias);

  const dadosDoGrafico = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div className="grafico-de-pizza" style={{ width: '50%', margin: '0 auto' }}>
      <h4>Gráfico de Pizza por Categoria de Despesa</h4>
      <Doughnut data={dadosDoGrafico} />
    </div>
  );
};

export default GraficoDePizza;




