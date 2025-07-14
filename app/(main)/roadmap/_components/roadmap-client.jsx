'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FileText, Plus } from 'lucide-react';
import Roadmap from './Roadmap';

export default function RoadmapListPage({ initialRoadmaps }) {
  const [roadmaps, setRoadmaps] = useState(initialRoadmaps); // ✅ load from props
  const [create, setCreate] = useState(false);                // ✅ modal toggle

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">🚀 All Roadmaps</h1>

      <div className="space-y-2">
        {roadmaps.map((roadmap) => (
          <Link
            key={roadmap.id}
            href={`/roadmap/${roadmap.id}`}
            className="flex items-center gap-3 p-3 border rounded-lg hover:bg-blue-400 text-white-900 transition"
          >
            <FileText className="w-5 h-5 text-blue-500" />
            <span className="text-lg">{roadmap.name}</span>
          </Link>
        ))}
      </div>

      <button
        onClick={() => setCreate(true)}
        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        <Plus className="w-4 h-4" />
        Create New Roadmap
      </button>

      {create && (
        <Roadmap
          create={create}
          setCreate={() => setCreate(false)}
          setRoadmaps={setRoadmaps}
        />
      )}
    </div>
  );
}
