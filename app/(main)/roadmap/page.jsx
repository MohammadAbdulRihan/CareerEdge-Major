import { getUserRoadmaps } from "@/actions/roadmap";
import RoadmapClient from "./_components/roadmap-client";

export default async function RoadmapPage() {
  const roadmaps = await getUserRoadmaps();

  return <RoadmapClient initialRoadmaps={roadmaps} />;
}
