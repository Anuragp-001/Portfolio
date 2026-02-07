import { Icons } from "@/components/icons";
import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
  name: "Anurag Pandey",
  initials: "AI",
  url: "https://github.com/Anuragp-001",
  location: "U.P, India",
  locationLink: "https://www.google.com/maps/place/Uttar+Pradesh/",
  description:
    "AI/ML Developer from NIT Raipur | Specialist in RAG, LLM Agents, and Scalable Full-Stack Solutions.",
  summary:
    "I'm a final year btech undergrad at NIT Raipur, deeply passionate about [Artificial Intelligence and Machine Learning](#skills). I specialize in building intelligent, scalable systems like [Jeev Veda](#projects), an AI-powered cancer detection platform , and [BankDataLens](#projects), a RAG-powered banking explorer. My experience spans developing automated ETL pipelines , fine-tuning neural networks , and conducting impactful research at [AIIMS Raipur](#education). I am a recipient of the DST-NIDHI TBI grant and have led technical teams to success in national robotics competitions. Always eager to push boundaries, I am actively seeking impactful opportunities to apply my expertise in Generative AI and Data Science to solve real-world healthcare and financial challenges.",
  avatarUrl: "/anurag.jpeg",

  skills: ["Python", "SQL", "TensorFlow", "PyTorch", "Scikit-learn", "LangChain", "CrewAI", "RAG", "LLM Fine-Tuning", "Hugging Face", "Pinecone", "FAISS", "ChromaDB", "CNN", "Transformers", "NLP", "Pandas", "NumPy", "Docker", "AWS", "MongoDB", "FastAPI", "Langraph", "n8n"],

  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],

  contact: {
    email: "air735599@gmail.com",
    tel: "+91 7355997891",
    social: {
      GitHub: {
        name: "GitHub",
        url: "https://github.com/Anuragp-001",
        icon: Icons.github,
        navbar: true,
      },
      LinkedIn: {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/anuragpandey001/",
        icon: Icons.linkedin,
        navbar: true,
      },
      email: {
        name: "Send Email",
        url: "mailto:air735599@gmail.com",
        icon: Icons.email,
        navbar: true,
      },
    },
  },

  work: [
    {
      company: "Euron",
      href: "https://www.linkedin.com/in/anuragpandey001/overlay/1767156810859/single-media-viewer/?profileId=ACoAAD-H0g0BTDFQerRfyyBd8-X6qr6oj6x46Z0",
      title: "AI/ML Intern",
      location: "Remote",
      logoUrl: "/euron.png",
      start: "Dec 2025",
      end: "Jan 2026",
      description:
        "Built RAG-powered banking data explorer using LangChain and Pinecone vector database for semantic search. Developed NLP query system with transformer embeddings and anomaly detection for real-time financial insights",
    },
    {
      company: "The Logicgen",
      href: "https://thelogigen.com/",
      title: "AI Agent Developer",
      location: "Remote",
      logoUrl: "/tl.png", // use your logo or placeholder
      start: "Jan 2024",
      end: "Present",
      description:
        "Developed AI agents for customer support and sales using LangChain and Pinecone vector database for semantic search. Developed NLP query system with transformer embeddings and anomaly detection for real-time financial insights.",
    },
    {
      company: "AIIMS Raipur",
      href: "https://drive.google.com/file/d/1vdWRg_Alzx0qOEcUMRcAmz7AJSiGVKtn/view",
      title: "Research Intern",
      location: "Raipur, Chhattisgarh",
      logoUrl: "/aiims.png",
      start: "May 2024",
      end: "June 2024",
      description:
        "Analyzed patient datasets across 6 departments using Python and SQL, improving data accessibility by 30%. Proposed statistical workflow optimizations and reviewed 50+ genomic papers to support predictive diagnostic models, reducing patient wait times by 15%.",
    },
  ],

  education: [
    {
      school: "National Institute of Technology, Raipur",
      degree: "Bachelor of Technology, Biotechnology Engineering",
      logoUrl: "/nitrr.png",
      start: "2022",
      end: "2026",
    },
    {
      school: "MTS Public School, Mirzapur",
      degree: "12th CBSE - 87.6%",
      logoUrl: "/mts.png",
      start: "2020",
      end: "2021",
    },
    {
      school: "MTS Public School, Mirzapur",
      degree: "10th CBSE - 89.6%",
      logoUrl: "/mts.png",
      start: "2018",
      end: "2019",
    },
  ],

  projects: [
    {
      title: "Jeev Veda",
      href: "https://github.com/immohitsen/JeevVeda",
      dates: "October 2025",
      active: true,
      description:
        "JeevVeda is an AI-powered early cancer screening suite with a medical chatbot, blood report analyzer (Gemini API), MRI scan analyzer (ResNet50), and DICOM viewer.",
      technologies: ["NextJs", "Tailwind", "Resnet50", "FastAPI", "Gemini API"],
      links: [],
      image: "/jv.png",
      video: "",
    },
    {
      title: "BankDataLens",
      href: "https://github.com/Anuragp-001/BankingApp",
      dates: "June 2025",
      active: true,
      description:
        "Built RAG-powered conversational analytics using LangChain and Pinecone vector database for financial data exploration. Developed automated ETL pipeline with ML-based anomaly detection and interactive Plotly visualizations for insights.",
      technologies: ["Next.js", "LangChain", "Pinecone", "Plotly"],
      links: [],
      image: "/bank.png",
      video: "",
    },
    {
      title: "MedBuddy",
      href: "https://github.com/Anuragp-001/MedBuddy",
      dates: "June 2025",
      active: true,
      description:
        "Built intelligent medical chatbot using RAG architecture with FAISS vector database for semantic document search. Developed PDF processing pipeline with recursive chunking and HuggingFace embeddings for context-aware Q&A responses.",
      technologies: ["Python", "Streamlit", "FAISS", "HuggingFace", "Langchain"],
      links: [],
      image: "/med.png",
      video: "",
    }
  ],

  hackathons: [
    {
      title: "Border Patrolling UGV",
      dates: "March 2023",
      location: "IIT BHU",
      description:
        "Secured First Runner-Up at Technex'23 (IIT BHU). Our project, a surveillance bot built for unmanned operations in high-risk border zones, was remotely controlled from a central hub to protect soldiers'lives. The innovation was also featured at IIT Roorkee and spotlighted on their official platforms.",
      image: "/technex.png",
      links: [
        {
          title: "Source",
          icon: <Icons.linkedin className="h-4 w-4" />,
          href: "https://www.linkedin.com/posts/immohitsen_aavartan-startup-nitrr-activity-7033212784867688448-bBz1"
        }
      ],
    },
    {
      title: "Border Patrolling UGV",
      dates: "Feb 2023",
      location: "NIT Raipur",
      description:
        "Secured First Position at National Science Exhibition 2023 (NIT Raipur) at Vigyaan — the National Science Exhibition under Aavartan'23, Central India's largest tech fest hosted by NIT Raipur. Our project is a remotely operated surveillance bot built using Arduino, a motor shield, an ultrasound detector, and Bluetooth communication, enabling unmanned deployment in high-risk border zones to protect soldiers' lives. ",
      image: "/aavarten.jpg",
      links: [
        {
          title: "Source",
          icon: <Icons.linkedin className="h-4 w-4" />,
          href: "https://www.linkedin.com/posts/immohitsen_aavartan-startup-nitrr-activity-7033212784867688448-bBz1"
        }
      ],
    }
  ],
} as const;
