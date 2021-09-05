import React from 'react';
import { chunk } from 'lodash';
import { Col, Popover, Row } from 'antd';
import { Card } from 'utility/card';

const GalleryCardListItem = ({ card }: { card: Card }) => (
  <Col span={4}>
    <div style={{ maxWidth: '100%' }}>
      <div style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
        {card.name}
        {' '}
        <img width={24} height={24} src={card.set.images.symbol} alt={card.set.name} />
      </div>
      <img style={{ maxWidth: '100%' }} src={card.images.small} alt={card.id} />
    </div>
  </Col>
);

const NameCardListItem = ({ card }: { card: Card }) => (
  <Col span={4}>
    <Popover placement="rightBottom" content={<img src={card.images.small} alt={card.id} />}>
      {card.name}
      {' '}
      <img width={24} height={24} src={card.set.images.symbol} alt={card.set.name} />
    </Popover>
  </Col>
);

const CardListItem = ({ isGallery, card }: { isGallery: boolean, card: Card }) => (
  isGallery
    ? <GalleryCardListItem card={card} />
    : <NameCardListItem card={card} />
);

const CardListRow = ({ isGallery, cards }: { isGallery: boolean, cards: Card[] }) => (
  <Row gutter={8}>
    {cards.map((card) => <CardListItem isGallery={isGallery} card={card} />)}
  </Row>
);

interface CardListProps {
  isGallery: boolean;
  cards: Card[];
  rowSize: number;
}

const CardList = ({ isGallery, cards, rowSize }: CardListProps) => (
  <div>
    {
    chunk(cards, rowSize).map((cardRow) => <CardListRow isGallery={isGallery} cards={cardRow} />)
  }
  </div>
);

export default CardList;
