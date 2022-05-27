import { setDoc, doc } from "firebase/firestore";
import getDb from "./getDb";

// 0: "dni"
// 1: "fecha"
// 2: "anio"
// 3: "mes"
// 4: "dia"
// 5: "semana"
// 6: "pedidos_ruteados"
// 7: "pedidos_rechazados"
// 8: "bultos_ruteado"
// 9: "bultos_rechazados"
// 10: "pedidos_cerrado"
// 11: "bultos_cerrado"
// 12: "pedidos_mal_facturado"
// 13: "bultos_mal_facturado"
// 14: "sin_dinero"
// 15: "sin_envases"
// 16: "dqi"
// 17: "rmd_cantidad"
// 18: "rmd_puntaje"
// 19: "modulaciones"
// 20: "no_modulados"
// 21: "eficacia_modulaciones"
// 22: "dispersion_km"
// 23: "dispersion_tiempos"
// 24: "inicio_cierre"

const uploadData = (setLoading) => {
  const [db] = getDb();
  const API_KEY = "AIzaSyC-JZ7LYx9zu9CYJeVwTH-uRrPOMODTul0";
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const spreadsheetId = "1Ou-pDb2tdYPu7xSu2LeGAc5jF0vofShBoP5XxLFvBOg";
  const range = "DailyUpload!A:AJ";

  /*global gapi*/
  function initClient() {
    gapi.client
      .init({
        apiKey: API_KEY,
        discoveryDocs: DISCOVERY_DOCS,
      })
      .then(
        function () {
          ReadSheet();
        },
        function (error) {
          console.log(error);
          window.alert("Ocurrió un error conectando con el sheet");
        }
      );
  }

  function ReadSheet() {
    gapi.client.sheets.spreadsheets.values
      .get({
        spreadsheetId: spreadsheetId,
        range: range,
      })
      .then(
        function (response) {
          WriteFirestore(response.result.values);
        },
        function (response) {}
      );
  }
  async function WriteFirestore(datos) {
    // const categorias = datos[0];
    //shift remueve la primer fila, ya que contiene los títulos de columnas
    datos.shift();
    //función para subir individualmente cada documento (fila del sheet)
    const uploadDocument = async (dataArray) => {
      let dni = dataArray[0];
      let idRegistro = dataArray[2] + dataArray[3] + dataArray[4];
      try {
        await setDoc(doc(db, "dailyupload", "driversdata", dni, idRegistro), {
          dni: dataArray[0],
          fecha: dataArray[1],
          anio: dataArray[2],
          mes: dataArray[3],
          dia: dataArray[4],
          semana: dataArray[5],
          pedidos_ruteados: dataArray[6],
          pedidos_rechazados: dataArray[7],
          bultos_ruteado: dataArray[8],
          bultos_rechazados: dataArray[9],
          pedidos_cerrado: dataArray[10],
          bultos_cerrado: dataArray[11],
          pedidos_mal_facturado: dataArray[12],
          bultos_mal_facturado: dataArray[13],
          sin_dinero: dataArray[14],
          sin_envases: dataArray[15],
          dqi: dataArray[16],
          rmd_cantidad: dataArray[17],
          rmd_puntaje: dataArray[18],
          modulaciones: dataArray[19],
          no_modulados: dataArray[20],
          eficacia_modulaciones: dataArray[21],
          dispersion_km: dataArray[22],
          dispersion_tiempos: dataArray[23],
          inicio_cierre: dataArray[24],
          ontime_uso: dataArray[25],
          tgt_pedidos_rechazados: dataArray[26],
          tgt_bultos_rechazados: dataArray[27],
          tgt_prom_disp_km: dataArray[28],
          tgt_prom_disp_tiempo: dataArray[29],
          tgt_prom_dqi: dataArray[30],
          tgt_prom_eficacia_mod: dataArray[31],
          tgt_prom_inicio_cierre: dataArray[32],
          tgt_prom_uso_ontime: dataArray[33],
          tgt_rmd_cantidad: dataArray[34],
          tgt_prom_rmd: dataArray[35],
        });
      } catch (error) {
        console.log(error);
        window.alert("Ocurrió un error cargando los datos. Intentá nuevamente");
      }
    };
    //llama uploadDocument por cada fila con datos leída
    const individuales = datos.map((dato, index, array) => {
      uploadDocument(dato);
      if (array.length - 1 === index) {
        window.alert("Datos cargados correctamente");
        setLoading(false);
      }
    });
  }
  gapi.load("client", initClient);
};
export default uploadData;
