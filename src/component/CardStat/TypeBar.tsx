import React from 'react';
import { Tooltip } from 'antd';
import { Count } from 'utility/stat';
import './TypeBar.css';

const round = (value: number) => Math.round(value * 100) / 100;

interface TypeConfig {
  name: string;
  shortName: string;
  color: string;
  order: number;
}

const typeConfigs: Record<string, TypeConfig> = {
  Colorless: {
    name: 'Colorless',
    shortName: 'C',
    color: '#ece8dc',
    order: 10,
  },
  Darkness: {
    name: 'Darkness',
    shortName: 'D',
    color: '#183352',
    order: 6,
  },
  Dragon: {
    name: 'Dragon',
    shortName: 'N',
    color: '#a6891e',
    order: 9,
  },
  Fairy: {
    name: 'Fairy',
    shortName: 'Y',
    color: '#c8599f',
    order: 8,
  },
  Fighting: {
    name: 'Fighting',
    shortName: 'F',
    color: '#d84117',
    order: 5,
  },
  Fire: {
    name: 'Fire',
    shortName: 'R',
    color: '#ea2a1f',
    order: 1,
  },
  Grass: {
    name: 'Grass',
    shortName: 'G',
    color: '#1d932a',
    order: 0,
  },
  Lightning: {
    name: 'Lightning',
    shortName: 'L',
    color: '#f7df0d',
    order: 3,
  },
  Metal: {
    name: 'Metal',
    shortName: 'M',
    color: '#899098',
    order: 7,
  },
  Psychic: {
    name: 'Psychic',
    shortName: 'P',
    color: '#7c3b8f',
    order: 4,
  },
  Water: {
    name: 'Water',
    shortName: 'W',
    color: '#0778cc',
    order: 2,
  },
  Free: {
    name: 'Free',
    shortName: '_',
    color: '#989898',
    order: 11,
  },
};

interface TypeBarProps {
  count: Count;
}

const TypeBar = ({ count }: TypeBarProps) => {
  const typeData = Object.entries(count.individual)
    .map(([typeName, typeCount]) => [typeCount, typeConfigs[typeName]] as [number, TypeConfig])
    .sort((a, b) => a[1].order - b[1].order);

  return (
    <div style={{ width: '100%' }}>
      {
      typeData.map(([typeCount, typeConfig]) => {
        const percent = `${(100 * typeCount) / count.total}%`;
        return (
          <Tooltip title={`${typeCount} / ${count.total}`}>
            <span
              style={{
                display: 'inline-block',
                width: percent,
                backgroundColor: typeConfig.color,
                paddingTop: '1em',
                paddingBottom: '1em',
                textAlign: 'center',
                whiteSpace: 'nowrap',
              }}
              className="type"
            >
              {`${typeConfig.shortName} (${round((100 * typeCount) / count.total)}%)`}
            </span>
          </Tooltip>
        );
      })
    }
    </div>
  );
};

export default TypeBar;
