import { db } from "@/lib/prisma";
import { inngest } from "./client";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateIndustryInsights = inngest.createFunction(
  { name: "Generate Industry Insights" },
  { cron: "0 0 * * 0" }, // Run every Sunday at midnight
  async ({ event, step }) => {
    const industries = await step.run("Fetch industries", async () => {
      return await db.industryInsight.findMany({
        select: { industry: true },
      });
    });

    for (const { industry } of industries) {
      const prompt = `
          Analyze the current state of the ${industry} industry and provide insights in ONLY the following JSON format without any additional notes or explanations:
          {
            "salaryRanges": [
              { "role": "string", "min": number, "max": number, "median": number, "location": "string" }
            ],
            "growthRate": number,
            "demandLevel": "High" | "Medium" | "Low",
            "topSkills": ["skill1", "skill2"],
            "marketOutlook": "Positive" | "Neutral" | "Negative",
            "keyTrends": ["trend1", "trend2"],
            "recommendedSkills": ["skill1", "skill2"]
          }
          
          IMPORTANT: Return ONLY the JSON. No additional text, notes, or markdown formatting.
          Include at least 5 common roles for salary ranges.
          Growth rate should be a percentage.
          Include at least 5 skills and trends.
        `;

      const res = await step.ai.wrap(
        "gemini",
        async (p) => {
          return await model.generateContent(p);
        },
        prompt
      );

      const text = res.response.candidates[0].content.parts[0].text || "";
      const cleanedText = text.replace(/```(?:json)?\n?/g, "").trim();

      const insights = JSON.parse(cleanedText);

      await step.run(`Update ${industry} insights`, async () => {
        await db.industryInsight.update({
          where: { industry },
          data: {
            ...insights,
            lastUpdated: new Date(),
            nextUpdate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          },
        });
      });
    }
  }
);
export const AIRoadmapGeneratorAgent=createAgent({
    name:'AIRoadmapGeneratorAgent',
    description:'Generate Details Tree Like Flow Roadmap',
    system:`Generate a React flow tree-structured learning roadmap for user input position/skills in the following format:
• Vertical tree structure with meaningful x/y positions to form a flow
• Structure should be similar to roadmap.sh layout
• Steps should be ordered from fundamentals to advanced
• Include branching for different specializations (if applicable)
• Each node must have a title, short description, and learning resource link
• Use unique IDs for all nodes and edges
• Make it more spacious node position
• Response in JSON format

{
  roadmapTitle: "",
  description: <3–5 Lines>,
  duration: "",
  initialNodes: [
    {
      id: "1",
      type: "turbo",
      position: { x: 0, y: 0 },
      data: {
        title: "Step Title",
        description: "Short two-line explanation of what the step covers.",
        link: "Helpful link for learning this step"
      }
    },
    ...
  ],
  initialEdges: [
    {
      id: "e1-2",
      source: "1",
      target: "2"
    },
    ...
  ]
}
`,
    model:gemini({
        model:"gemini-2.0-flash",
        apiKey:process.env.GEMINI_API_KEY
    })
})

export const AIRoadmapAgent=inngest.createFunction(
    {id:'AiRoadmapAgent'},
    {event:'AIRoadmapAgent'},
    async ({event,step}) => {
        const {roadMapId,userInput,userEmail}=await event.data;
        
        const roadmapResult=await AIRoadmapGeneratorAgent.run({"UserInput":userInput})
        // save to db
    }
)
