'use server';

import { db } from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { GoogleGenerativeAI } from '@google/generative-ai';
import slugify from 'slugify';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

export async function saveRoadmap({ slug, title, content }) {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error('User not found');

  try {
    const roadmap = await db.roadmap.upsert({
      where: {
        slug_userId: {
          slug,
          userId: user.id,
        },
      },
      update: {
        title,
        content,
      },
      create: {
        slug,
        title,
        content,
        userId: user.id,
      },
    });

    revalidatePath('/roadmaps');
    return roadmap;
  } catch (error) {
    console.error('Error saving roadmap:', error);
    throw new Error('Failed to save roadmap');
  }
}

export async function getUserRoadmaps() {
  const { userId } = await auth();
  if (!userId) throw new Error('Unauthorized');

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error('User not found');

  const roadmaps = await db.roadmap.findMany({
    where: { userId: user.id },
    orderBy: { title: 'asc' },
    select: {
      slug: true,
      title: true,
    },
  });

  return roadmaps.map((roadmap) => ({
    id: roadmap.slug,     // use slug as id
    name: roadmap.title,  // use title as name
  }));
}

export async function generateAIRoadmap({ userInput }) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const skill = userInput.trim();
  const skillTitle = skill
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  const prompt = `
You are an expert roadmap generator.

Generate a tree-structured React flow roadmap for the skill: **${skillTitle}**

Requirements:
- Vertical layout (like roadmap.sh)
- Roadmap should be titled "${skillTitle} Roadmap"
- Include 3–5 line description and duration estimate
- Start from fundamentals and go to advanced
- Include branching (if applicable)
- Each node must contain:
  • "id": unique string
  • "type": "turbo"
  • "position": { "x": number, "y": number }
  • "data": {
      "title": string,
      "description": short 2-line string,
      "link": helpful learning resource
    }

Respond only in valid JSON format:

{
  "roadmapTitle": "${skillTitle} Roadmap",
  "description": "3–5 lines",
  "duration": "e.g. 3 months",
  "initialNodes": [...],
  "initialEdges": [...]
}
`;
//   console.log(skillTitle);
  
  try {
   const result  = await model.generateContent([prompt]);
const rawText = result.response.text().trim();

// ── clean the output ─────────────────────────────────────────
const cleaned = rawText
  .replace(/^```json/i, '')   // remove opening ```json
  .replace(/^```/, '')        // remove opening ``` (fallback)
  .replace(/```$/, '')        // remove closing ```
  .replace(/^[^\{]*/, '')     // cut anything before first “{”
  .trim();

// keep only the JSON block

const slug = slugify(skillTitle.toLowerCase(), { lower: true });
const open  = cleaned.indexOf('{');
const close = cleaned.lastIndexOf('}');
const json  = JSON.parse(cleaned.slice(open, close + 1));
console.log(slug);

    const roadmap = await db.roadmap.upsert({
  where: {
    slug_userId: {
      slug,
      userId: user.id,
    },
  },
  update: {
    title: json.roadmapTitle || `${skillTitle} Roadmap`,
    content: json,
  },
  create: {
    title: json.roadmapTitle || `${skillTitle} Roadmap`,
    slug,
    content: json,
    userId: user.id,
  },
});


    revalidatePath("/roadmap");
    return {
  success: true,
  message: "Roadmap saved successfully",
  data: {
    slug: roadmap.slug,
    title: roadmap.title,
  },
};
  } catch (err) {
    return {success:false,message:err.message}
    console.error("AI generation/parsing failed =>", err);
    // throw new Error("Failed to generate AI roadmap");
  }
}

export async function getRoadmap(slug) {
  const { userId } = await auth()
  if (!userId) throw new Error('Unauthorized')

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  })
  if (!user) throw new Error('User not found')

  const roadmap = await db.roadmap.findUnique({
    where: {
      slug_userId: {
        slug,
        userId: user.id,
      },
    },
  })

  if (!roadmap) throw new Error('Roadmap not found')

  return roadmap
}
