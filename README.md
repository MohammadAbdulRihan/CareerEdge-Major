# 🚀 Career-Edge

A personalized career intelligence platform built using **Next.js**, **Prisma**, **Ingest**, **PostgreSQL**, **Tailwind CSS**, and **Clerk** for authentication. It uses **Google Gemini API** to dynamically generate actionable market insights, skill recommendations, and assist with resume and cover letter creation.

---

## ✨ Features

### 🔐 Authentication (via Clerk)
- Sign Up / Sign In with **Google** or **Email**
- Managed sessions and user roles using Clerk

### 👋 Onboarding Experience
- Users provide:
  - **Industry**
  - **Role**
  - **Specialization**
  - **Skills**
  - **Professional Bio**

### 📊 Personalized Dashboard
After onboarding, users receive an AI-powered dashboard including:
- 📈 **Market Outlook** and **Industry Growth Trends**
- 🔍 **Demand Level** of the chosen role
- 🎯 **Top Skills** in the industry
- 💰 **Salary Ranges by Role**
- 📚 **Key Industry Trends**
- 🧠 AI **Skill & Role Recommendations**

> ⚙️ Powered by **Gemini API**, the dashboard updates **weekly** using **Ingest** for scheduled regeneration.

### 🤖 AI Resume & Cover Letter Generator
- Resume generation assisted by AI
- Cover letter suggestions based on the job and user bio
- Download or copy the documents easily

---

## 🧰 Tech Stack

| Layer        | Tech                              |
|--------------|-----------------------------------|
| Frontend     | Next.js              |
| Styling      | Tailwind CSS                      |
| Backend      | API Routes / Server Components    |
| ORM          | Prisma                            |
| DB           | NeonDB                        |
| Auth         | Clerk                             |
| AI API       | Gemini API (Google)               |
| Automation   | Ingest (for weekly updates)       |

