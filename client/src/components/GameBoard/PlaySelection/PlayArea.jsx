import React from 'react';
import DraggableCardInPlayQueue from './DraggableCardInPlayQueue.jsx';
import { cardInPlayQueue } from '../../../dndTypes';
import { DropTarget } from 'react-dnd/lib';

const PlayArea = ({cards, onMove, connectDropTarget, isOver, canDrop}) => (
  connectDropTarget(<div className='tray' style={{minHeight: '100px'}}>
    {cards.map(card =>
      <DraggableCardInPlayQueue
        key={card.id}
        card={card}
        onDrop={onMove}
      />
    )}
  </div>)
);

export default DropTarget(cardInPlayQueue, {}, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
}))(PlayArea);