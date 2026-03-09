import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { ModuleType } from "../src/generated/prisma/enums";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

const modules = [
  // ─── Level 1: AI Aware ──────────────────────────────────────────
  {
    level: 1,
    order: 1,
    title: "AI Is Already in Your Pocket",
    description: "Discover AI tools you use every day without realising it",
    theme: "The Algorithm Has Been Watching You",
    type: ModuleType.VIDEO,
    estimatedMinutes: 12,
    content: {
      videoUrl: "https://www.youtube.com/watch?v=mJeNghZXtMo",
      summary:
        "From TikTok recommendations to phone face unlock — AI is everywhere in your daily life. Every time your phone suggests the next word in a text, recognises your face to unlock, or curates your social media feed, artificial intelligence is working behind the scenes. These systems learn from billions of data points to predict what you want before you even ask.",
      conceptChecks: [
        {
          question: "Which of these uses AI?",
          options: [
            "Spotify Discover Weekly",
            "A calculator",
            "A light switch",
          ],
          answer: 0,
        },
        {
          question: "What does AI need to learn?",
          options: [
            "Electricity only",
            "Data and patterns",
            "Human supervision 24/7",
          ],
          answer: 1,
        },
      ],
    },
  },
  {
    level: 1,
    order: 2,
    title: "How Netflix Knows What You Want",
    description: "Understanding recommendation systems and pattern matching",
    theme: "The Algorithm Has Been Watching You",
    type: ModuleType.READING,
    estimatedMinutes: 10,
    content: {
      sections: [
        {
          heading: "What Is a Recommendation?",
          body: "When Netflix suggests a show, it uses your watch history to find patterns. Think of it like a friend who knows exactly what kind of movies you enjoy — except this friend has watched millions of movies and remembers every single one.\n\nRecommendation engines analyse three things:\n\n1. What you've watched before (your personal history)\n2. What similar users enjoyed (collaborative filtering)\n3. Properties of the content itself (genre, actors, mood)\n\nThe magic happens when the system combines all three signals to predict a show you'll probably love but haven't discovered yet.",
        },
        {
          heading: "Pattern Matching",
          body: "AI finds users similar to you and recommends what they enjoyed. This is called collaborative filtering, and it works surprisingly well.\n\nImagine a massive spreadsheet where rows are users and columns are movies. Each cell contains a rating. The AI finds users whose row looks like yours and suggests movies they rated highly that you haven't seen.\n\nBut here's where it gets interesting: modern systems go beyond simple matching. They use deep learning to understand subtle patterns — like the fact that you prefer sci-fi movies with strong female leads that came out after 2015. Patterns you might not even notice about yourself.",
        },
        {
          heading: "The Filter Bubble Effect",
          body: "There's a downside to recommendations being too good. When algorithms only show you content similar to what you've already watched, you end up in a 'filter bubble' — a cosy echo chamber where you never discover something truly different.\n\nThis is why Netflix intentionally adds some variety to its suggestions. About 20% of recommendations are designed to surprise you and help you discover new genres you might enjoy.",
        },
      ],
    },
  },
  {
    level: 1,
    order: 3,
    title: "Spot the AI Challenge",
    description:
      "Test your knowledge — can you identify AI in everyday scenarios?",
    theme: "The Algorithm Has Been Watching You",
    type: ModuleType.QUIZ,
    estimatedMinutes: 8,
    content: {
      questions: [
        {
          question: "Is autocorrect on your phone powered by AI?",
          options: ["Yes", "No"],
          answer: 0,
          explanation:
            "Autocorrect uses machine learning models trained on language patterns. Modern phones use neural networks that learn from billions of text messages to predict what you're trying to type.",
        },
        {
          question: "Is a traditional thermostat AI?",
          options: ["Yes", "No"],
          answer: 1,
          explanation:
            "A basic thermostat follows fixed rules — 'if temperature drops below 20°C, turn on heating.' No learning involved. However, smart thermostats like Nest DO use AI to learn your preferences over time.",
        },
        {
          question: "Does Snapchat use AI for face filters?",
          options: ["Yes", "No"],
          answer: 0,
          explanation:
            "Face filters use computer vision (a type of AI) to detect and track 68+ facial landmarks in real-time. The AI maps your face geometry 30 times per second to keep the filter aligned as you move.",
        },
        {
          question: "Does Google Maps use AI to predict travel times?",
          options: ["Yes", "No"],
          answer: 0,
          explanation:
            "Google Maps uses machine learning to analyse historical traffic patterns, current conditions from millions of phones, and even factors like weather and events to predict your arrival time with remarkable accuracy.",
        },
      ],
    },
  },
  {
    level: 1,
    order: 4,
    title: "AI vs Human: Who Does It Better?",
    description: "Explore what AI excels at and where humans still win",
    theme: "The Algorithm Has Been Watching You",
    type: ModuleType.VIDEO,
    estimatedMinutes: 15,
    content: {
      videoUrl: "https://www.youtube.com/watch?v=csaXsm4Maqc",
      summary:
        "AI beats humans at chess, Go, and image recognition, but struggles with creativity, empathy, and common-sense reasoning. The key insight is that AI and humans have complementary strengths — the best results come when they work together. AI can process millions of data points in seconds, while humans can understand context, emotion, and nuance that machines still struggle with.",
      conceptChecks: [
        {
          question: "What is AI better at than humans?",
          options: [
            "Writing poetry",
            "Sorting millions of images",
            "Understanding sarcasm",
          ],
          answer: 1,
        },
        {
          question: "What is a current limitation of AI?",
          options: [
            "Processing speed",
            "Memory capacity",
            "Understanding context and common sense",
          ],
          answer: 2,
        },
      ],
    },
  },
  {
    level: 1,
    order: 5,
    title: "Your AI Impact Map",
    description: "Create a visual map of AI in your daily routine",
    theme: "The Algorithm Has Been Watching You",
    type: ModuleType.CODING,
    estimatedMinutes: 20,
    content: {
      starterCode: `# My AI Impact Map
# List activities where AI plays a role

my_day = {
    'morning': [],
    'school': [],
    'evening': [],
}

# Add at least 2 AI-powered activities to each time period
# Example: my_day['morning'].append('Face unlock on phone')

# YOUR CODE HERE - Add your AI activities!


# Display your AI Impact Map
print("=" * 40)
print("   MY AI IMPACT MAP")
print("=" * 40)

for time_of_day, activities in my_day.items():
    print(f"\\n{time_of_day.upper()}")
    print("-" * 20)
    if activities:
        for i, activity in enumerate(activities, 1):
            print(f"  {i}. {activity}")
    else:
        print("  (add some activities!)")

total = sum(len(a) for a in my_day.values())
print(f"\\nTotal AI interactions: {total}")
print(f"AI touches {'many' if total >= 6 else 'some'} parts of your day!")
`,
      instructions:
        "Fill in the dictionary with AI-powered activities from your daily routine. Think about apps, devices, and services you use that rely on AI. Run the code to see your AI Impact Map!",
    },
  },

  // ─── Level 2: AI Explorer ───────────────────────────────────────
  {
    level: 2,
    order: 1,
    title: "How Minecraft Explains Machine Learning",
    description: "Learn ML concepts through game mechanics you already know",
    theme: "How Minecraft Explains ML",
    type: ModuleType.VIDEO,
    estimatedMinutes: 15,
    content: {
      videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
      summary:
        "Machine learning is like teaching a Minecraft mob to navigate terrain — it tries things, gets feedback, and gradually improves. Neural networks, the building blocks of modern AI, work in layers just like crafting recipes: raw inputs go in, and refined outputs come out. This video breaks down the fundamentals of how neural networks learn from data.",
      conceptChecks: [
        {
          question: "What does 'training' mean in ML?",
          options: [
            "Teaching a robot to walk",
            "Feeding data to a model so it learns patterns",
            "Running code faster",
          ],
          answer: 1,
        },
        {
          question: "What are the building blocks of neural networks?",
          options: ["Pixels", "Neurons (nodes)", "Databases"],
          answer: 1,
        },
      ],
    },
  },
  {
    level: 2,
    order: 2,
    title: "Data: The Fuel of AI",
    description: "Why data quality matters more than algorithm complexity",
    theme: "How Minecraft Explains ML",
    type: ModuleType.READING,
    estimatedMinutes: 12,
    content: {
      sections: [
        {
          heading: "Garbage In, Garbage Out",
          body: "If you train an AI on bad data, it makes bad predictions. This principle, known as 'Garbage In, Garbage Out' (GIGO), is one of the most important concepts in machine learning.\n\nImagine training a food recommendation AI on data from only Italian restaurants. It would never suggest sushi, Thai food, or tacos — not because those are bad, but because it literally doesn't know they exist.\n\nData quality matters in several ways:\n- Completeness: Does it cover all cases?\n- Accuracy: Is the data labelled correctly?\n- Recency: Is it up to date?\n- Representativeness: Does it reflect the real world?",
        },
        {
          heading: "Bias in Data",
          body: "AI can inherit human biases from the data it learns from. This is one of the biggest challenges in modern AI development.\n\nReal-world examples of bias:\n\n- A hiring AI trained on past decisions learned to prefer male candidates because historical data reflected old biases\n- Facial recognition systems performed poorly on darker skin tones because training data was predominantly light-skinned faces\n- Language models associated certain professions with specific genders\n\nThe solution isn't just technical — it requires diverse teams, careful data curation, and ongoing monitoring after deployment.",
        },
        {
          heading: "How Much Data Does AI Need?",
          body: "The amount of data required depends on the task complexity:\n\n- Simple classification (cat vs dog): ~1,000 images per class\n- Speech recognition: ~10,000 hours of audio\n- Language understanding (GPT-4): trillions of words from the internet\n\nMore data generally leads to better performance, but there are diminishing returns. Going from 100 to 1,000 examples makes a huge difference. Going from 1 million to 10 million? Often barely noticeable.\n\nThis is why techniques like data augmentation (creating variations of existing data) and transfer learning (reusing knowledge from one task for another) are so valuable.",
        },
      ],
    },
  },
  {
    level: 2,
    order: 3,
    title: "Train Your First Model (No Code!)",
    description: "Use Teachable Machine to train an image classifier",
    theme: "How Minecraft Explains ML",
    type: ModuleType.CODING,
    estimatedMinutes: 25,
    externalUrl: "https://teachablemachine.withgoogle.com/",
    content: {
      starterCode: `# After using Teachable Machine, answer these:

my_model = {
    'what_i_trained': '',      # e.g., 'rock paper scissors'
    'num_classes': 0,           # how many categories
    'num_samples': 0,           # how many images per class
    'accuracy': '',             # how well did it work? (great/ok/poor)
    'surprise': '',             # what surprised you?
    'failure_case': '',         # when did it get confused?
}

# Display your results
print("MY FIRST ML MODEL")
print("=" * 40)
for key, value in my_model.items():
    label = key.replace('_', ' ').title()
    print(f"  {label}: {value}")

# Reflection
if my_model['num_samples'] > 0:
    print(f"\\nYou trained a model with {my_model['num_classes']} classes!")
    print("Remember: more samples = better accuracy")
`,
      instructions:
        "Go to Teachable Machine (link below), train an image model with your webcam, then record your results in the code. Try training it to recognise different hand gestures or objects on your desk!",
      externalUrl: "https://teachablemachine.withgoogle.com/",
    },
  },
  {
    level: 2,
    order: 4,
    title: "Supervised vs Unsupervised Learning",
    description: "The two main ways machines learn from data",
    theme: "How Minecraft Explains ML",
    type: ModuleType.QUIZ,
    estimatedMinutes: 10,
    content: {
      questions: [
        {
          question: "In supervised learning, the training data has:",
          options: ["No labels", "Labels/answers", "Only images"],
          answer: 1,
          explanation:
            "Supervised learning uses labelled data — the model learns the correct answer for each input. Like a teacher grading homework, it knows what 'right' looks like.",
        },
        {
          question: "Clustering similar songs is an example of:",
          options: [
            "Supervised learning",
            "Unsupervised learning",
            "Neither",
          ],
          answer: 1,
          explanation:
            "Grouping without labels is unsupervised learning. The model finds natural patterns in the data without being told what groups to create.",
        },
        {
          question:
            "Spam detection (spam vs not spam) is an example of:",
          options: [
            "Supervised learning",
            "Unsupervised learning",
            "Reinforcement learning",
          ],
          answer: 0,
          explanation:
            "Spam detection uses labelled examples (spam/not spam) to learn the difference. This is classic supervised learning — the model trains on emails that humans have already categorised.",
        },
        {
          question:
            "A self-driving car learning from trial and error uses:",
          options: [
            "Supervised learning",
            "Unsupervised learning",
            "Reinforcement learning",
          ],
          answer: 2,
          explanation:
            "Reinforcement learning involves an agent taking actions and receiving rewards or penalties. The car learns to drive by being 'rewarded' for good driving and 'penalised' for mistakes.",
        },
      ],
    },
  },
  {
    level: 2,
    order: 5,
    title: "Build a Recommendation Engine",
    description: "Create a simple content recommendation system in Python",
    theme: "How Minecraft Explains ML",
    type: ModuleType.CODING,
    estimatedMinutes: 30,
    content: {
      starterCode: `# Simple Recommendation Engine
# Match users to content based on interests

users = {
    'Alex': ['gaming', 'music', 'coding'],
    'Jordan': ['art', 'music', 'reading'],
    'Sam': ['gaming', 'coding', 'science'],
}

content = {
    'AI Music Generator': ['music', 'coding'],
    'Game AI Tutorial': ['gaming', 'coding'],
    'Digital Art with AI': ['art', 'coding'],
    'ML for Science': ['science', 'coding'],
}

def recommend(user_name):
    """Recommend content based on matching interests."""
    user_interests = users[user_name]
    scores = {}
    for title, tags in content.items():
        # Count matching interests
        score = len(set(user_interests) & set(tags))
        if score > 0:
            scores[title] = score
    # Sort by score (highest first)
    return sorted(scores.items(), key=lambda x: x[1], reverse=True)

# Try it!
for name in users:
    recs = recommend(name)
    print(f"\\n{name}'s recommendations:")
    for title, score in recs:
        stars = '*' * score
        print(f"  {stars} {title}")

# CHALLENGE: Add yourself as a user and new content!
# users['YourName'] = ['your', 'interests', 'here']
# content['New Content'] = ['matching', 'tags']
`,
      instructions:
        "Run the code to see recommendations for each user. Then add yourself as a user with your interests, and create new content items. Notice how the recommendations change as you modify the data!",
    },
  },
];

async function main() {
  console.log("Seeding database...");

  // Clear existing modules (cascades to progress)
  await prisma.module.deleteMany();

  // Seed modules
  for (const mod of modules) {
    await prisma.module.create({ data: mod });
  }

  console.log(`Seeded ${modules.length} modules (Level 1: 5, Level 2: 5)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
