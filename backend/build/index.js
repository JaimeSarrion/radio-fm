"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RadioBrowser = require('radio-browser');
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/api/radio', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const results = yield RadioBrowser.searchStations({
            language: 'spanish', // Cambia el idioma según tus preferencias
            limit: 1
        });
        // Envía la URL de transmisión de la primera estación encontrada como respuesta
        if (results.length > 0) {
            res.json({ url: results[0].url });
        }
        else {
            res.status(404).json({ error: 'No se encontraron estaciones de radio.' });
        }
    }
    catch (error) {
        console.error('Error al buscar estaciones de radio:', error);
        res.status(500).json({ error: 'Error del servidor al buscar estaciones de radio.' });
    }
}));
app.get('/ping', (req, res) => {
    console.log("Someone has pinged here");
    res.send('pong');
});
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
