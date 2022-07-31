import { setDoc, doc } from "firebase/firestore";
import getDb from "./getDb";

const uploadData = (setLoading) => {
  setLoading(true);
  const [db] = getDb();
  const API_KEY = "AIzaSyC-JZ7LYx9zu9CYJeVwTH-uRrPOMODTul0";
  const DISCOVERY_DOCS = [
    "https://sheets.googleapis.com/$discovery/rest?version=v4",
  ];
  const spreadsheetId = "1Ou-pDb2tdYPu7xSu2LeGAc5jF0vofShBoP5XxLFvBOg";
  const range = "DailyUpload!A:AX";

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
      .then(function (response) {
        WriteFirestore(response.result.values);
      });
  }
  async function WriteFirestore(datos) {
    if (datos.length == 1) {
      window.alert("Sheet sin datos");
      setLoading(false);
    }
    // const categorias = datos[0];
    //shift remueve la primer fila, ya que contiene los títulos de columnas
    datos.shift();
    //función para subir individualmente cada documento (fila del sheet)
    const uploadDocument = async (dataArray, index) => {
      const numberFormat = (num) => {
        if (num.length == 1) {
          return "0" + num;
        } else {
          return num;
        }
      };
      let dni = dataArray[0];
      let m = numberFormat(dataArray[3]);
      let d = numberFormat(dataArray[4]);
      let idRegistro = dataArray[2] + dataArray[3] + dataArray[4];
      try {
        await setDoc(doc(db, "dailyupload", "driversdata", dni, idRegistro), {
          aniomesdia: dataArray[2] + m + d,
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
          //------------------------ sumo pnp a indicadores
          pnp: dataArray[26],
          //------------------------ targets de la versión 1.0
          tgt_pedidos_rechazados: dataArray[27],
          tgt_bultos_rechazados: dataArray[28],
          tgt_prom_disp_km: dataArray[29],
          tgt_prom_disp_tiempo: dataArray[30],
          tgt_prom_dqi: dataArray[31],
          tgt_prom_eficacia_mod: dataArray[32],
          tgt_prom_inicio_cierre: dataArray[33],
          tgt_prom_uso_ontime: dataArray[34],
          tgt_rmd_cantidad: dataArray[35],
          tgt_prom_rmd: dataArray[36],
          //-------------------------------- nuevos targets v2.0
          tgt_no_mod: dataArray[37],
          tgt_pnp: dataArray[38],
          //----------------------------- posiciones v2.0
          pos_rmd: dataArray[39],
          pos_pdv_puntuados: dataArray[40],
          pos_pedidos_rech: dataArray[41],
          pos_bultos_rech: dataArray[42],
          pos_eficacia_mod: dataArray[43],
          pos_no_mod: dataArray[44],
          pos_uso_bees: dataArray[45],
          pos_inicio_cierre: dataArray[46],
          pos_disp_km: dataArray[47],
          pos_disp_tiempo: dataArray[48],
          pos_pnp: dataArray[49],
        });
        if (datos.length - 1 === index) {
          window.alert("Datos cargados correctamente");
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        window.alert("Ocurrió un error cargando los datos. Intentá nuevamente");
      }
    };
    //llama uploadDocument por cada fila con datos leída
    datos.map((dato, index) => {
      uploadDocument(dato, index);
    });
  }
  gapi.load("client", initClient);
};
export default uploadData;
