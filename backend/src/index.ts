import express, { Request, Response } from 'express';
const RadioBrowser = require('radio-browser');
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.get('/api/radio', async (req: Request, res: Response) => {
  try {
    const results: any = await RadioBrowser.searchStations({
      language: 'spanish',
      limit: 1
    });

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
