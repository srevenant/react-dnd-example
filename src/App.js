import React, { Component } from 'react'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const DRAG_TYPE = 'DRAG_TYPE'

function DragBox ({ children }) {
  const [{ isDragging }, drag] = useDrag({
    item: { type: DRAG_TYPE },
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  })

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        textAlign: 'center',
        padding: '3rem',
        cursor: 'move',
        backgroundColor: '#ddd'
      }}
    >{children}</div>
  )
}

function DragReceptacle ({ children }) {
  const [{ isOver }] = useDrop({
    accept: DRAG_TYPE,
    drop: () => { console.log('received drop') },
    hover: () => { console.log('hover over drop') },
    collect: monitor => ({
      isOver: !!monitor.isOver()
    })
  })

  return (
    <div style={{
      textAlign: 'center',
      padding: '3rem',
      backgroundColor: isOver ? '#9f9' : '#99f'
    }}>
      {isOver && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.5,
          backgroundColor: 'yellow'
        }} />)}
      {children}</div>
  )
}

class App extends Component {
  render () {
    return (
      <DndProvider backend={HTML5Backend}>
        <DragBox>Drag This Box</DragBox>
        <p />
        <DragReceptacle>Over this Receptacle</DragReceptacle>
      </DndProvider>
    )
  }
}

export default App
