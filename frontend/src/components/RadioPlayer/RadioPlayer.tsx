import React from 'react';

interface IProps {
  url: string;
}

const RadioPlayer: React.FC<IProps> = ({ url }) => {
  return (
    <div>
      {url && (
        <audio controls autoPlay>
          <source src={url} type="audio/mpeg" />
          Tu navegador no soporta la reproducción de audio.
        </audio>
      )}
    </div>
  );
};

export default RadioPlayer;
