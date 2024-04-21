'use client';

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getRadioList } from '@/app/lib/data-fetch';
import RadioCard from '../RadioCard/RadioCard';
import RadioPlayer from '../RadioPlayer/RadioPlayer';

const RadioStations = () => {
  const [selectedRadio, setSelectedRadio] = useState('');
  console.log('🚀 ~ RadioStations ~ selectedRadio:', selectedRadio);
  const { data, error, isLoading, isError } = useQuery(
    'radioList',
    getRadioList,
  );

  if (isLoading) return <div>Cargando...</div>;
  if (isError) return <div>Error al cargar las estaciones de radio</div>;

  return (
    <div>
      <h1>Estaciones de Radio</h1>
      <div>Filters</div>
      <div className="grid grid-cols-3 gap-2 p-4">
        {data &&
          data.map(station => (
            <RadioCard
              key={`station.changeuuid ${station.name}`}
              onClick={radio => setSelectedRadio(radio)}
              radio={station}
            />
          ))}
      </div>
      {selectedRadio && <RadioPlayer url={selectedRadio} />}
    </div>
  );
};

export default RadioStations;
