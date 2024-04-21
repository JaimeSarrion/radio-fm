import express, { Request, Response } from "express";
const RadioBrowser = require("radio-browser");
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

interface Params {
  language?: string;
  country?: string;
  tag?: string;
  limit?: number;
}

async function buscarEstacionesDeRadio(params?: Params): Promise<any> {
  try {
    // Realiza la búsqueda de estaciones de radio utilizando los parámetros proporcionados
    const results = await RadioBrowser.searchStations(params);

    console.log('Estaciones de radio encontradas:');
    results.forEach((station: any) => {
      console.log(`${station.name} - ${station.url}`);
    });

    return results; // Devuelve los resultados de la búsqueda
  } catch (error) {
    console.error('Error al buscar las estaciones de radio:', error);
    throw error; // Lanza el error para manejarlo en el contexto donde se llame a esta función
  }
}


app.get("/api/radio", async (req: Request, res: Response) => {
  try {
    const results: any = await RadioBrowser.searchStations({
      language: "spanish",
      limit: 1,
      state: "spain",
    });

    if (results.length > 0) {
      res.json({ url: results[0].url });
    } else {
      res.status(404).json({ error: "No se encontraron estaciones de radio." });
    }
  } catch (error) {
    console.error("Error al buscar estaciones de radio:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al buscar estaciones de radio." });
  }
});

app.get("/radio/list", async (req: Request, res: Response) => {
  try {
    let filter = {
      country: 'Spain',
      order: 'clickcount',
      state: 'Valencia',
      by: 'topvote',
      name: 'ser'
    };
    const result = await RadioBrowser.searchStations(filter);

    if (result) {
      res.json({ data: result });
    } else {
      res.status(404).json({ error: "No hay listado de radios." });
    }

  } catch (error) {
    console.error("Error al listar estaciones de radio:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al buscar estaciones de radio." });
  }
});

app.get('/stations/list', async (req, res) => {
  try {
    const params: Params = req.query; // Obtiene los parámetros de la consulta
    console.log(params)
    const results = await buscarEstacionesDeRadio(params);

    res.json(results);
  } catch (error) {
    console.error('Error al buscar estaciones de radio:', error);
    res.status(500).json({ error: 'Error al buscar estaciones de radio' }); // Devuelve un error HTTP 500 si hay un error
  }
});

app.get("/ping", (req, res) => {
  console.log("Someone has pinged here");
  res.send("pong");
});

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
