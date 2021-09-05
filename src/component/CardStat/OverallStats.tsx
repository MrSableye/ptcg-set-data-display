import React from 'react';
import { chunk } from 'lodash';
import {
  Col,
  Row,
  Statistic,
  Tooltip,
  Typography,
} from 'antd';
import { OverallStats } from 'utility/stat';
import TypeBar from './TypeBar';

const round = (value: number) => Math.round(value * 100) / 100;
const TypeDisplay = ({ stats }: { stats: OverallStats }) => (
  <>
    <Typography.Title level={2}>
      Type Stats
    </Typography.Title>
    <TypeBar count={stats.typeCounts} />
  </>
);

const SubtypeDisplay = ({ stats }: { stats: OverallStats }) => {
  if (Object.values(stats.subtypeCounts.individual).length <= 0) {
    return <></>;
  }

  const chunkedSubtypes = chunk(Object.entries(stats.subtypeCounts.individual), 6);

  return (
    <>
      <Typography.Title level={2}>
        Subtype Stats
      </Typography.Title>
      {
      chunkedSubtypes.map((subtypeChunk) => (
        <Row gutter={16}>
          {subtypeChunk.map((subtypeData) => (
            <Col span={4}>
              <Statistic
                title={`% ${subtypeData[0]}`}
                formatter={(value) => (
                  <Tooltip title={`${subtypeData[1]} / ${stats.subtypeCounts.total}`} placement="top">
                    {value}
                  </Tooltip>
                )}
                value={round((100 * subtypeData[1]) / stats.subtypeCounts.total)}
                suffix="%"
              />
            </Col>
          ))}
        </Row>
      ))
    }
    </>
  );
};

const RarityDisplay = ({ stats }: { stats: OverallStats }) => {
  if (Object.values(stats.rarityCounts.individual).length <= 0) {
    return <></>;
  }

  const chunkedRarities = chunk(Object.entries(stats.rarityCounts.individual), 6);

  return (
    <>
      <Typography.Title level={2}>
        Rarity Stats
      </Typography.Title>
      {
      chunkedRarities.map((rarityChunk) => (
        <Row gutter={16}>
          {rarityChunk.map((rarityData) => (
            <Col span={4}>
              <Statistic
                title={`% ${rarityData[0]}`}
                formatter={(value) => (
                  <Tooltip title={`${rarityData[1]} / ${stats.rarityCounts.total}`} placement="top">
                    {value}
                  </Tooltip>
                )}
                value={round((100 * rarityData[1]) / stats.rarityCounts.total)}
                suffix="%"
              />
            </Col>
          ))}
        </Row>
      ))
    }
    </>
  );
};

const OverallStatsDisplay = ({ stats }: { stats: OverallStats }) => (
  <div>
    <TypeDisplay stats={stats} />
    <SubtypeDisplay stats={stats} />
    <RarityDisplay stats={stats} />
  </div>
);

export default OverallStatsDisplay;
