import React from 'react';
import { chunk } from 'lodash';
import { Col, Popover, Row } from 'antd';
import { Card } from 'utility/card';

const CardListItem = ({ card }: { card: Card }) => (
  <Col span={4}>
    <Popover placement="rightBottom" content={<img src={card.images.small} alt={card.id} />}>
      {card.name}
      {' '}
      <img width={24} height={24} src={card.set.images.symbol} alt={card.set.name} />
    </Popover>
  </Col>
);

const CardListRow = ({ cards }: { cards: Card[] }) => (
  <Row gutter={8}>
    {cards.map((card) => <CardListItem card={card} />)}
  </Row>
);

interface CardListProps {
  cards: Card[];
  rowSize: number;
}

const CardList = ({ cards, rowSize }: CardListProps) => (
  <div>
    {
    chunk(cards, rowSize).map((cardRow) => <CardListRow cards={cardRow} />)
  }
  </div>
);

export default CardList;
