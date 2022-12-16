import { useEffect, useState, useRef } from "react";
import "./Graph.css";
import { Line } from "react-chartjs-2";//Es una libreria importada que se le pide traer el grafico tipo linea

// porpiedades de la libreria para usar el grafico lineal
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import moment from "moment/moment";//Se llama la libreria para definir las fechas del grafico principal

//Se define lo que se va a usar de la grafica de la libreria moment, con registrer
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export default function Graph({//Se ponen los valores de las props del grafico que se trajeron de la libreria
  type = 1,
  coin = "bitcoin",
  currency = "usd",
  days = 30,
  color = "#04D99D",
}) {
  const chartStyle = {//Se declara una constante donde se define el estilo del border, grid y ticks
    border: {
      display: false,
    },

    grid: {
      display: false,
    },
    ticks: {
      display: false,
    },
  };
  //Se consume la API con una variable url 
  let url = `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`;

  let data, options;//Se usan variables para la data y las opciones

  //Se usan constantes para los precios, datos y gradientes
  const [prices, setPrices] = useState();
  const [dates, setDates] = useState();
  const [gradient, setGradient] = useState();

  async function getData() {
    //Se usa un try catch en la funcion getData, para atrpar y mostrar los datos
    try {
      const response = await fetch(url);
      const json = await response.json();
      setPrices(json.prices.map((item) => Math.round(item[1])));
      setDates(json.prices.map((item) => moment.unix(item[0]).format("MM-DD")));
    } catch (e) {
      console.log("error", e);
    }
  }

  const chartRef = useRef(null);//Se usa otra constante para el hook y se le define como valor el useRef como nulo

  useEffect((_) => {//El use efect devolvera la data y se dibujara el context del grafico
    getData();
    const canvas = chartRef.current.firstChild;
    let BGgradient = canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, canvas.height);

    BGgradient.addColorStop(0, "rgba(4, 191, 157, 1)");
    BGgradient.addColorStop(1, "rgba(4, 191, 157, 0)");
    setGradient(BGgradient);
  }, []);

  /*El condicional switch devolvera el tipo de grafico, el case sera 0 o 1 para las opciones del grafico,
   donde si el case es 0 mostrara las propiedes que se quieres como true y un legen(estilos de la 
  libreria) y title con display false y las esclaas para los ejes x y y. En el y se pasa un ticks el cual
  tendra los valores que se muestran sobre la grafica y que la moneda se muestra en mayuscula. El data
  traera los labels y en datasets traera la data, el borderColor el background,  el pint Radius y se pone 
  break. Si el case es 1 se pone casi lo mismo que en el case 0, pero se le cambia las scales y en el 
  data se le quita el gradient y el otro y también se pone break*/
  switch (type) {
    case 0:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              callback: function (value, index, ticks) {
                return `$${value
                  .toString()
                  .replace(
                    /\B(?=(\d{3})+(?!\d))/g,
                    "."
                  )} ${currency.toUpperCase()}`;
              },
            },
          },
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            backgroundColor: gradient,
            tension: 0.4,
            pointRadius: 0,
            fill: true,
          },
        ],
      };
      break;
    case 1:
      options = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
        scales: {
          x: chartStyle,
          y: chartStyle,
        },
      };
      data = {
        labels: dates,
        datasets: [
          {
            data: prices,
            borderColor: color,
            tension: 0.4,
            pointRadius: 0,
          },
        ],
      };
      break;
  }
  //se pasa la referencia es decir ref el cual sera igual al charRef y se trae el tipo de grafico que sera Line y el data y sus opciones
  return (
    <div ref={chartRef} className="graph">
      <Line data={data} options={options} />
    </div>
  );
}