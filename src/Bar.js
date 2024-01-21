<Bar
  data={{
    labels: ['Categoria 1', 'Categoria 2', 'Categoria 3', 'Categoria 4'],
    datasets: [
      {
        label: 'Gastos por Categoria',
        data: [100, 150, 200, 75], // Substitua esses valores pelos seus dados reais
        backgroundColor: ['blue', 'green', 'red', 'purple'], // Cores das barras
      },
    ],
  }}
  options={{
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  }}
/>