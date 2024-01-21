import React, { useState, useEffect } from 'react';
import './App.css';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, BarController } from 'chart.js';
import ReactApexChart from 'react-apexcharts';

function Dashboard() {
  const [modoNoturno, setModoNoturno] = useState(false);

  const alternarModoNoturno = () => {
    setModoNoturno(!modoNoturno);
  };

  useEffect(() => {
    const body = document.body;
    if (modoNoturno) {
      body.classList.add('dark-mode');
    } else {
      body.classList.remove('dark-mode');
    }
    // Adicione ou remova a classe específica
    body.classList.toggle('white-bold-text', modoNoturno);
  }, [modoNoturno]);

  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [registros, setRegistros] = useState([]);
  const [data, setData] = useState('');
  const [categoria, setCategoria] = useState('');
  const [saldoTotal, setSaldoTotal] = useState(0);
  const [contadorDespesas, setContadorDespesas] = useState(0);
  const [saldoGuardado, setSaldoGuardado] = useState(0);
  const [saldoIndisponivel, setSaldoIndisponivel] = useState(0);

  const calcularSaldoGuardado = (quantidade) => {
    setSaldoGuardado(parseFloat(quantidade) || 0);
  };

  const handleAdicionar = () => {
    const novoRegistro = { descricao, valor, data, categoria };
    setRegistros([...registros, novoRegistro]);
    setDescricao('');
    setValor('');
    setData('');
    setCategoria('');
    setContadorDespesas(contadorDespesas + 1);
  };

  const [downloadedData, setDownloadedData] = useState(null);

  const handleDownloadJSON = () => {
    const jsonData = JSON.stringify(registros, null, 2);
    const blob = new Blob([jsonData], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const calcularSaldoDisponivel = () => {
    const totalDespesas = registros.reduce((total, registro) => total + parseFloat(registro.valor), 0);
    const saldoDisponivel = saldoTotal - totalDespesas;
    return { saldoDisponivel, totalDespesas };
  };

  const calcularPorcentagemLucro = () => {
    const { saldoDisponivel, totalDespesas } = calcularSaldoDisponivel();
    const porcentagemLucro = (saldoDisponivel / (totalDespesas || 1)) * 100;
    return porcentagemLucro;
  };

  useEffect(() => {
    Chart.register(CategoryScale, LinearScale, BarElement, BarController);

    const chartData = {
      labels: ['Saldo Total', 'Saldo Disponível'],
      datasets: [
        {
          label: 'Saldo',
          data: [saldoTotal, calcularSaldoDisponivel().saldoDisponivel],
          backgroundColor: ['blue', 'red'],
        },
      ],
    };

    setChartData(chartData);
  }, [saldoTotal, registros]);

  const [chartData, setChartData] = useState(null);

  const { saldoDisponivel, totalDespesas } = calcularSaldoDisponivel();

  const calcularDistribuicaoCategorias = () => {
    const categorias = {};
    registros.forEach((registro) => {
      const { categoria } = registro;
      categorias[categoria] = categorias[categoria] ? categorias[categoria] + 1 : 1;
    });

    const labels = Object.keys(categorias);
    const data = Object.values(categorias);

    setCategoriaData({
      options: {
        labels,
      },
      series: data,
      type: 'donut',
    });
  };

  useEffect(() => {
    calcularDistribuicaoCategorias();
  }, [registros]);

  const [categoriaData, setCategoriaData] = useState(null);

  const [waveChartData, setWaveChartData] = useState({
    options: {
      chart: {
        id: 'wave-chart',
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      },
    },
    series: [
      {
        name: 'Gastos',
        data: [1000, 1500, 1200, 1800, 2000, 1600, 1700, 1900, 2100, 2200, 2400, 2600],
      },
    ],
  });

  const [lucroChartData, setLucroChartData] = useState({
    options: {
      chart: {
        id: 'lucro-chart',
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: '70%',
          },
          dataLabels: {
            showOn: 'always',
          },
        },
      },
      labels: ['Lucro'],
    },
    series: [calcularPorcentagemLucro()],
  });

  const [quantidadeGuardar, setQuantidadeGuardar] = useState('');
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [iraRetirar, setIraRetirar] = useState('');

  const [valorImposto, setValorImposto] = useState(0);
  const [contasPassaram, setContasPassaram] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const saldoDisponivel = calcularSaldoDisponivel().saldoDisponivel;
    const resultado = parseFloat(quantidadeGuardar) - saldoDisponivel;
    setSaldoGuardado(resultado >= 0 ? parseFloat(quantidadeGuardar) : 0);
    setSaldoIndisponivel(resultado < 0 ? Math.abs(resultado) : 0);
    setValorImposto(resultado);
    setContasPassaram(resultado >= 0);
  };



  return (
    <div className={`dashboard ${modoNoturno ? 'dark-mode' : ''}`}>
      <div className="add-expense-container">
        <div className="add-expense">
          <div className="saldo-total-input">
            <label htmlFor="saldoTotal">Saldo Total:</label>
            <input
              type="number"
              id="saldoTotal"
              value={saldoTotal}
              onChange={(e) => setSaldoTotal(e.target.value)}
            />
          </div>
          <div className="description-input">
            <label htmlFor="descricao">Gastos:</label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
          </div>
          <div className="value-input">
            <label htmlFor="valor">Valor:</label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
            />
          </div>
          <div className="date-input">
            <label htmlFor="data">Data:</label>
            <input
              type="date"
              id="data"
              value={data}
              onChange={(e) => setData(e.target.value)}
            />
          </div>
          <div className="category-input">
            <label htmlFor="categoria">Categoria:</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="">Selecione uma categoria</option>
              <option value="Conta de Luz">Conta de Luz</option>
              <option value="Conta de Telefone">Conta de Telefone</option>
              <option value="Conta de Água">Conta de Água</option>
              <option value="Contas de Casa">Contas de Casa</option>
              <option value="Gastos Emergenciais">Gastos Emergenciais</option>
              <option value="Compras">Compras</option>
            </select>
          </div>
          <div className="button-add">
        <button onClick={handleAdicionar}>Adicionar</button>
      </div> 
      
        </div>
        <div className="valor-container">
          <div className="value-to-save-input">
            
          </div>
        </div>
        <div className= "borda"></div>
        
        <div className= "info-container">
        <div className="info">
                <div className="saldo-disponivel">
                  <p>Saldo Disponível:</p>
                  <span>{saldoDisponivel}</span>
                </div>
                <div className="total-despesas">
                  <p>Total de Despesas:</p>
                  <span>{totalDespesas}</span>
                
              </div>
      </div>   
      </div>     
        <div className="charts-container">
        <div className="chart-and-info">
        {chartData && (
                <Bar
                  data={chartData}
                  options={{
                    scales: {
                      y: {
                        beginAtZero: true,
                      },
                    },
                  }}
                />
              )}
        </div>
          <div className="chart-container">
            <h4></h4>
          </div>
        </div>
      </div>
     
      <div className="chart">
        <h4>Gráfico de Onda dos Maiores Gastos por Mês</h4>
        {waveChartData && (
          <ReactApexChart options={waveChartData.options} series={waveChartData.series} type="line" />
        )}
      </div>     
      <div className="chart-container">
          <div className="chart-pizza">
            <h4>Maiores gastos</h4>
            {categoriaData && (
              <ReactApexChart options={categoriaData.options} series={categoriaData.series} type={categoriaData.type} />
            )}
          </div>
        </div>
      
      
      <div className="table2">
      <div className="download-container">
        <button className="download-button" onClick={handleDownloadJSON}>
          <i className="fas fa-download"></i> Baixar Dados</button>
      </div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Gastos</th>
              <th>Valor</th>
              <th>Data</th>
              <th>Categoria</th>
              <th>Quanto a guardar</th>
            </tr>
          </thead>
          <tbody>
            {registros.map((registro, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{registro.descricao}</td>
                <td>{registro.valor}</td>
                <td>{registro.data}</td>
                <td>{registro.categoria}</td>
                <td>{registro.valorAGuardar}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="charts">
        <div className="chart">
          {/* Conteúdo do gráfico */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;