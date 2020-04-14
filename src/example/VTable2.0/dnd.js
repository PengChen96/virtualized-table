import React from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { DndProvider } from 'react-dnd';
import Backend from 'react-dnd-html5-backend';

const ItemTypes = {
  KNIGHT: 'knight',
};
function Knight(props) {

  const ref = React.useRef();
  const [{ isOver, dropClassName }, drop] = useDrop({
    accept: ItemTypes.KNIGHT,
    collect: monitor => {
      const { index: dragIndex } = monitor.getItem() || {};
      if (dragIndex === props.index) {
        return {};
      }
      return {
        isOver: monitor.isOver(),
        dropClassName: dragIndex < props.index ? ' drop-over-downward' : ' drop-over-upward',
      };
    },
    drop: item => {
      console.log(item.index, '=>', props.index);
    },
  });
  const [{isDragging}, drag] = useDrag({
    item: {
      type: ItemTypes.KNIGHT,
      index: props.index
    },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    }),
  });
  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={`${props.className}${isOver ? dropClassName : ''}`}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
        width: 100
      }}
    >
      {props.index}
    </div>
  );

}

function Board() {
  return <DndProvider backend={Backend}>
    <div style={{display: 'flex'}}>
      <Knight index={'A'}/>
      <Knight index={'B'}/>
      <Knight index={'C'}/>
      <Knight index={'D'}/>
    </div>
    <div>
      <Knight index={'A'}/>
      <Knight index={'B'}/>
      <Knight index={'C'}/>
      <Knight index={'D'}/>
    </div>
  </DndProvider>;
}
export default Board;