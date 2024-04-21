'use client';

import { RadioStation } from '@/app/lib/interfaces';
import { Card, CardBody, CardHeader } from '@nextui-org/card';
import Image from 'next/image';
import React from 'react';

interface IProps {
  radio: RadioStation;
  onClick: (url: string) => void;
}

const RadioCard: React.FC<IProps> = ({ radio, onClick }) => {
  if (!radio) return;
  return (
    <button
      type="button"
      onClick={() => {
        console.log('HEY');
        onClick(radio.url);
      }}
    >
      <Card
        key={radio.changeuuid}
        className="py-4 bg-zinc-900 text-white w-52 h-52 cursor-pointer"
      >
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <h4 className="font-bold text-large">{radio.name}</h4>
        </CardHeader>
        <CardBody className="overflow-visible py-2 items-center">
          <Image
            alt="Radio Image"
            className="object-cover rounded-xl"
            src={radio.favicon}
            width={100}
            height={100}
          />
        </CardBody>
      </Card>
    </button>
  );
};

export default RadioCard;
