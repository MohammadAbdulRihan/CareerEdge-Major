'use client';

import { Handle, Position } from '@xyflow/react';
import React from 'react';

const TurboNode = ({ data }) => {
  return (
    <div className="rounded-lg border border-gray-300 bg-yellow-100 shadow-md w-full p-4">
      <div className="font-bold text-lg text-gray-800 mb-1">
        {data.title}
      </div>

      <p className="text-sm text-gray-700 line-clamp-2">{data.description}</p>

      {data?.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline text-sm mt-2 inline-block"
        >
          Learn More
        </a>
      )}

      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default TurboNode;
