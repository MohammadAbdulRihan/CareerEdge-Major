"use client"
import React from 'react'
import { ReactFlow, Background } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import TurboNode from './turbo-node';

const nodeTypes = {
  turbo: TurboNode
}
const RoadmapFlow = ({ initialNodes, initialEdges }) => {

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        nodeTypes={nodeTypes}
        fitView
        panOnScroll
        panOnDrag
        zoomOnScroll
        attributionPosition="bottom-right"
      >
        {/* <Controls /> */}
        {/* <MiniMap /> */}
        <Background variant='dots' gap={12} size={1} />
      </ReactFlow>
    </div>
  )
}

export default RoadmapFlow
