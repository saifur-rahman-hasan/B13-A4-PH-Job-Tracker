// Job Application Tracker - Vanilla JavaScript

// Job Data
const jobsData = [
    {
        id: 1,
        companyName: "TechCorp Solutions",
        position: "Senior Frontend Developer",
        location: "San Francisco, CA",
        type: "Full-time",
        salary: "$120,000 - $150,000",
        description: "We are looking for an experienced frontend developer with expertise in React and modern web technologies to join our dynamic team.",
        status: "all"
    },
    {
        id: 2,
        companyName: "Digital Innovations Ltd",
        position: "UX/UI Designer",
        location: "New York, NY",
        type: "Full-time",
        salary: "$100,000 - $130,000",
        description: "Join our design team to create beautiful and functional user interfaces for our web and mobile applications.",
        status: "all"
    },
    {
        id: 3,
        companyName: "CloudBase Systems",
        position: "Backend Engineer",
        location: "Remote",
        type: "Full-time",
        salary: "$110,000 - $140,000",
        description: "Build scalable backend systems using Node.js and cloud technologies. Experience with AWS or GCP is preferred.",
        status: "all"
    },
    {
        id: 4,
        companyName: "DataViz Pro",
        position: "Data Analyst",
        location: "Boston, MA",
        type: "Full-time",
        salary: "$80,000 - $110,000",
        description: "Analyze complex datasets and create insightful visualizations using Python and Tableau for our analytics team.",
        status: "all"
    },
    {
        id: 5,
        companyName: "SecureNet Solutions",
        position: "DevOps Engineer",
        location: "Austin, TX",
        type: "Full-time",
        salary: "$115,000 - $145,000",
        description: "Maintain and improve our infrastructure using Docker, Kubernetes, and CI/CD pipelines to support our development teams.",
        status: "all"
    },
    {
        id: 6,
        companyName: "MobileFirst Apps",
        position: "React Native Developer",
        location: "Los Angeles, CA",
        type: "Contract",
        salary: "$90,000 - $120,000",
        description: "Develop cross-platform mobile applications using React Native for iOS and Android platforms.",
        status: "all"
    },
    {
        id: 7,
        companyName: "AI Innovations",
        position: "Machine Learning Engineer",
        location: "Seattle, WA",
        type: "Full-time",
        salary: "$130,000 - $170,000",
        description: "Work on cutting-edge machine learning models and AI solutions using Python, TensorFlow, and PyTorch.",
        status: "all"
    },
    {
        id: 8,
        companyName: "Creative Agency Plus",
        position: "Fullstack Developer",
        location: "Denver, CO",
        type: "Full-time",
        salary: "$95,000 - $125,000",
        description: "Build modern web applications with React and Node.js. Join a creative team that values innovation and collaboration.",
        status: "all"
    }
];

// State Management
let jobs = JSON.parse(JSON.stringify(jobsData));
let currentTab = 'all';
