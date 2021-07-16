import React from 'react';
import { Divider } from 'antd';
import { Card } from 'utility/card';
import { computeOverallStats, computePokemonStats } from 'utility/stat';
import OverallStats from './OverallStats';
import PokemonStats from './PokemonStats';

interface StatsProps {
  cards: Card[];
}

const Stats = ({ cards }: StatsProps) => {
  const overallStats = computeOverallStats(cards);
  const pokemonStats = computePokemonStats(cards);

  return (
    <div>
      <OverallStats stats={overallStats} />
      <Divider />
      <PokemonStats stats={pokemonStats} />
    </div>
  );
};

export default Stats;
