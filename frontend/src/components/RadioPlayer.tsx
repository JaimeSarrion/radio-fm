import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

const obtenerUrlRadio = async () => {
  const response = await axios.get('http://localhost:5000/api/radio'); // Cambia la URL según la configuración de tu backend
  return response.data.url;
};

const RadioPlayer = () => {
  const { data: radioUrl, error } = useQuery('radioUrl', obtenerUrlRadio);

  if (error) {
    console.log(error);
    return <div>Error al cargar la URL de la radio</div>;
  }

  return (
    <div>
      {radioUrl && (
        <audio controls autoPlay>
          <source src={radioUrl} type="audio/mpeg" />
          Tu navegador no soporta la reproducción de audio.
        </audio>
      )}
    </div>
  );
};

export default RadioPlayer;
