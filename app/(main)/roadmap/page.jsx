import { getUserRoadmaps } from "@/actions/roadmap";
import RoadmapClient from "./_components/roadmap-client";

export default async function RoadmapPage() {
  const roadmaps = await getUserRoadmaps(); // ✅ safe server-side call

  return <RoadmapClient initialRoadmaps={roadmaps} />;
}
