import { useEffect, useState } from 'react' // Hooks
// Importamos nuestra hoja de estilos
import './App.css';

// Importamos los componentes principales de la aplicación
import Header from './Header'
import CardPrincipal from './CardPrincipal';//Se guarda la moneda más valorizada en el mercado
import Card from './Card'//Guarda las demás monedas
import Convert from './Convert'
import TableCoins from './TableCoins'
import Footer from './Footer'

function App() {
  /*
    Estados: Utilizaremos 3 estados principales
    Estado setCoins: Aquí vamos a almacenar el valor de todas las monedas que nos entrega el consumo de la API.
    Estado setCurrency: Aquí vamos a almacenar el valor de todas las divisas que nos entrega el consumo de la API.
    Estado setSelCur: Aquí vamos a almacenar el valor de la divisa seleccionada.
  */
  const [coins, setCoins] = useState();//criptomonedas
  const [currency, setCurrency] = useState();//Divisas
  const [selCur, setSelCur] = useState("usd");//Desde el header se selecciona una divisa, alamacena la divisa seleccionada, por defecto se le pone el dolar

  /*
    Consumo de la API por medio del método async await y haciendo uso de Fetch
  */
  //asincronismo, mientras una pagina carga se puede manejar el otro contenido
  // Definimos una variable que va a contener el llamado de la API
  const getData = async () => {//Función anonima
    /* 
      Almacenamos la URL que generamos en la página de la API con los    valores que necesitamos mostrar en nuestros componentes. En la parte de vs_currency cambiamos el valor por defecto que es USD y le pasamos el valor que va a estar almacenado en nuestro estado selCur, es decir, la divisa que tengamos seleccionada en ese momento. 
      En per_page cambiamos el valor 100 por 4, ya que solo necesitamos las 4 primeras monedas, este valor puede ser cambiado de acuerdo a la información que quieran mostrar.
    */
    const response = await fetch(//Para indicarle que espere, respuesta de la API
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${selCur}&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d%2C30d%2C90d%2C1y`
    );//URL para guiar desde la API los valores que requerimos.Se modifica para que aparezca la divisa que seleccionemos y el numero de criptomonedas que queremos traer son las primeras 4 más valoradas

    /* 
      Cuando hacemos el llamado de la API el valor que nos retorna es un arreglo de objetos tipo json, este valor lo vamos a almacenar en una variable y lo vamos a leer por medio del método json()
    */
    const json = await response.json();//Almacena y lee los valores esperando a que cargue
    
    /*
      La siguiente URL la generamos de la API para que nos permita acceder a diferentes divisas, esta URL la almacenamos en una variable.
    */
    const response_cur = await fetch(//Se llama las divisas que soporta la API 
      `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
    );

    /*
      EL valor que nos retorna es un arreglo de tipo json, este valor lo vamos a almacenar en una variables y accedemos a él por medio del método json()
    */ 
    const cur = await response_cur.json();//Almacena las divisas
    
    // Almacenamos la información de todas las monedas en este estado
    setCoins(json);//Contiene toda la información de las monedas, se guarda en estados

    // Almacenamos el valor de las divisas en este estado
    setCurrency(cur);//Listado de divisas, se guarda en el estado
  };

  // Este estado cargara la información cuando el componente este listo
  useEffect(() => {
    getData();
  }, []);

  // Este estado cargará la información cuando seleccionemos una nueva divisa
  useEffect(() => {
    getData();
  }, [selCur]);

  /*
    Con el operador ternario validamos: Si el valor es diferente a la información de coins, es decir, si la información que nos entrega la API aun no esta lista entonces va a aparecer el texto "cargando", de lo contrario va a renderizar los componentes
  */ 

    //Condicional 
//Se valida con un if(operador ternario). Se coloca para que cargue cuando la información ya haya cargado

  return !coins ? (
    "Cargando..."
  ) : (
    <div className="App">
      {/* se almacena las divisas */}
      <Header currencys={currency} fun={setSelCur} cur={selCur} /> 
      <main>
        {/* se llaman todas las monedas , primero la que va por defecto, cuando se selecciona otra divisa cambiara cada valor en las card */}
        <CardPrincipal json={coins[0]} cur={selCur} />

        <div className="cards_con">
          {/* Se recorre el arreglo de coins con .map especificando las propiedades que se necesitan */}
          {coins.map(
            (
              {
                id,
                symbol,
                image,
                current_price,
                price_change_percentage_30d_in_currency,
              },
              index
            ) => {
              // Si el valor del indice es diferente de 0, retorna el componente card el que recibe las propiedades de una llave con un valor unico para cada elemento, price recibira el simbolo, el valor de la moneda de los ultimos 30 dias y los decimales que en esta caso seran 2
              if (index != 0) {
                return (
                  <Card
                    key={index}
                    price={`${symbol} - ${current_price} ${selCur} `}
                    porcentaje={deleteDec(
                      price_change_percentage_30d_in_currency,
                      2
                    )}
                    img={image}
                    coinId={id}
                    cur={selCur}
                  />
                );
              }
            }
          )}
        </div>
      </main>
      {/* El convert no recibe props */}
      <Convert />
      <TableCoins coins={coins} />
      <Footer />
    </div>
  );
}

export default App;

// Función para formatear los decimales
export function deleteDec(val, decimal) {
  return val.toFixed(decimal);
}

// Función para asignar la clase "green o red" de acuerdo al valor numérico
export function colorDec(num) {
  return num > 0 ? "green" : "red";
}

// Función para separar los valores en miles
export const numberF = Intl.NumberFormat("es-ES");