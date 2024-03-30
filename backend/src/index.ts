import express, { Request, Response } from 'express';
const RadioBrowser = require('radio-browser');


const app = express();
app.use(express.json());

app.get('/api/radio', async (req: Request, res: Response) => {
  try {
    const results: any = await RadioBrowser.searchStations({
      language: 'spanish', // Cambia el idioma según tus preferencias
      limit: 1
    });

    // Envía la URL de transmisión de la primera estación encontrada como respuesta
    if (results.length > 0) {
      res.json({ url: results[0].url });
    } else {
      res.status(404).json({ error: 'No se encontraron estaciones de radio.' });
    }
  } catch (error) {
    console.error('Error al buscar estaciones de radio:', error);
    res.status(500).json({ error: 'Error del servidor al buscar estaciones de radio.' });
  }
});

app.get('/ping', (req, res)=>{
  console.log("Someone has pinged here");
  res.send('pong')
})

const PORT: number = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
