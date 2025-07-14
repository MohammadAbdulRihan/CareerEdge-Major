import { getRoadmap } from '@/actions/roadmap';
import RoadmapFlow from './_components/roadmap-flow';

export default async function RoadmapPage({ params }) {
  const { roadmapid } = await params
  const roadmap = await getRoadmap(roadmapid);

  if (!roadmap) {
    return <div className="p-6 text-red-500">Roadmap not found</div>;
  }

  const content = roadmap.content;
  // console.log("Node[0]:", content.initialNodes?.[0]);
  return (
    <div className='md:pl-20 grid grid-cols-1 md:grid-cols-3 gap-5'>
      <div className='border rounded-xl p-5'>
        <h2 className='font-bold text-2xl '>{roadmap.title}</h2>
        <p className='mt-3 text-gray-200'><strong >Description:</strong> <br />{content.description}</p>
        <h2 className='mt-5 font-medium'>Duration: {content.duration}</h2>
      </div>
      <div className='md:col-span-2 h-[80vh] w-full'>
        <RoadmapFlow initialNodes={content.initialNodes} initialEdges={content.initialEdges} />
      </div>
    </div>
  )

  //   return (
  //     <div>
  //       <h1 className="text-6xl font-bold gradient-title">{content.roadmapTitle || roadmap.title}</h1>

  //       <div className="mt-8 border p-6 rounded-lg shadow">
  //         <p className="text-gray-600 mb-2">
  //           <strong>Duration:</strong> {content.duration}
  //         </p>
  //         <p className="text-gray-700 mb-6">{content.description}</p>

  //         {Array.isArray(content.initialNodes) && content.initialNodes.length > 0 ? (
  //   <div className="space-y-4">
  //     <h2 className="text-2xl font-semibold mb-4">Topics</h2>
  //     <ul className="list-disc list-inside text-gray-800 space-y-2">
  //       {content.initialNodes.map((node, idx) => (
  //         <li key={idx}>
  //           <div className="font-semibold">{node.data?.title || `Topic ${idx + 1}`}</div>
  //           {node.data?.description && (
  //             <div className="text-sm text-gray-600">{node.data.description}</div>
  //           )}
  //           {node.data?.link && (
  //             <a
  //               href={node.data.link}
  //               target="_blank"
  //               rel="noopener noreferrer"
  //               className="text-blue-500 underline text-sm"
  //             >
  //               Learn More
  //             </a>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // ) : (
  //   <p className="text-gray-500 italic">No topics available</p>
  // )}


  //       </div>
  //     </div>
  //   );
}
