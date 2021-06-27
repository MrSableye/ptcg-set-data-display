import {
  Col,
  Row,
  Statistic,
  Typography,
} from 'antd';
import { AttackStats, PokemonStats } from 'utility/stat';
import TypeBar from './TypeBar';

const round = (value: number) => {
  return Math.round(value * 100) / 100;
};
const AttackStatsDisplay = ({
  title, stats, attackStat,
  }: {
    title: string, stats: PokemonStats, attackStat: AttackStats,
  }) => <div>
  <Typography.Title level={2}>
    {title}
  </Typography.Title>
  <Row gutter={16}>
    <Col span={4}>
      <Statistic title={`% w/`} value={round(100 * attackStat.moveCount / stats.count)} suffix={'%'} />
    </Col>
    <Col span={4}>
      <Statistic title="Average Cost" value={round(attackStat.moveCost / attackStat.moveCount)} />
    </Col>
    <Col span={4}>
      <Statistic title="% w/ Effect" value={round(100 * attackStat.moveEffectCount / attackStat.moveCount)} suffix={'%'} />
    </Col>
  </Row>
  <Row gutter={16}>
    <Col span={4}>
      <Statistic title="% Damaging" value={round(100 * attackStat.damageMoveCount / attackStat.moveCount)} suffix={'%'} />
    </Col>
    <Col span={4}>
      <Statistic title="Average Damage" value={round(attackStat.damage / attackStat.moveCount)} />
    </Col>
    <Col span={4}>
      <Statistic title={`% w/ +Damage`} value={round(100 * attackStat.plusDamageCount / attackStat.moveCount)} suffix={'%'} />
    </Col>
    <Col span={4}>
      <Statistic title={`% w/ ×Damage`} value={round(100 * attackStat.timesDamageCount / attackStat.moveCount)} suffix={'%'} />
    </Col>
    <Col span={4}>
      <Statistic title={`% w/ -Damage`} value={round(100 * attackStat.minusDamageCount / attackStat.moveCount)} suffix={'%'} />
    </Col>
  </Row>
  <TypeBar count={attackStat.costTypeStats} />
</div>;

const PokemonStatsDisplay = ({ stats }: { stats: PokemonStats }) => <div>
  <Typography.Title level={2}>
      General Stats
    </Typography.Title>
  <Row gutter={16}>
    <Col span={4}>
      <Statistic title="Average HP" value={round(stats.hp / stats.count)} />
    </Col>
    <Col span={4}>
      <Statistic title="Average Retreat" value={round(stats.retreatCount / stats.count)} />
    </Col>
    <Col span={4}>
      <Statistic title="% w/ Abilities" value={round(100 * stats.abilityCount / stats.count)} suffix={'%'} />
    </Col>
  </Row>
  {
    stats.attackStats.map((attackStat, attackStatIndex) => (<AttackStatsDisplay
      key={attackStatIndex}
      title={`Attack ${attackStatIndex + 1}`}
      stats={stats}
      attackStat={attackStat}
    />))
  }
  {
    stats.attackStatsByCost.map((attackStat, attackStatIndex) => (<AttackStatsDisplay
      key={attackStatIndex}
      title={`${attackStatIndex} Cost Attack`}
      stats={stats}
      attackStat={attackStat}
    />))
  }
</div>;

export default PokemonStatsDisplay;