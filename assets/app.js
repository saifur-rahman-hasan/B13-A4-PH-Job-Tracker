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

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    renderUI();
    attachEventListeners();
});

// Event Listeners
function attachEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const tabName = e.currentTarget.dataset.tab;
            switchTab(tabName);
        });
    });
}

// Switch tab functionality
function switchTab(tabName) {
    currentTab = tabName;

    // Update active tab button with proper styling - ensure only ONE tab is active
    document.querySelectorAll('.tab-btn').forEach(btn => {
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    renderUI();
}

// Render the UI
function renderUI() {
    renderJobs();
    updateCounts();
    updateTabCounts();
}

// Render jobs based on current tab
function renderJobs() {
    const container = document.getElementById('jobsContainer');
    const emptyState = document.getElementById('emptyState');

    // Filter jobs based on current tab
    let filteredJobs = jobs;
    if (currentTab !== 'all') {
        filteredJobs = jobs.filter(job => job.status === currentTab);
    }

    // Clear container
    container.innerHTML = '';

    // Show/hide empty state
    if (filteredJobs.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');

        // Render job cards
        filteredJobs.forEach(job => {
            const card = createJobCard(job);
            container.appendChild(card);
        });
    }
}

// Create a job card element matching Figma design
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'job-card';
    card.dataset.jobId = job.id;

    // Status badge
    let statusBadge = '';
    if (job.status === 'interview') {
        statusBadge = '<span class="badge badge-interview">Interview</span>';
    } else if (job.status === 'rejected') {
        statusBadge = '<span class="badge badge-rejected">Rejected</span>';
    }

    card.innerHTML = `
        <div class="job-header">
            <div class="flex justify-between items-start gap-4">
                <div>
                    <h3 class="job-position">${job.position}</h3>
                    <p class="job-company">${job.companyName}</p>
                </div>
                ${statusBadge}
            </div>
        </div>

        <div class="job-details">
            <div class="job-detail-item">
                <span class="job-detail-label">Location</span>
                <span>${job.location}</span>
            </div>
            <div class="job-detail-item">
                <span class="job-detail-label">Type</span>
                <span>${job.type}</span>
            </div>
            <div class="job-detail-item">
                <span class="job-detail-label">Salary</span>
                <span>${job.salary}</span>
            </div>
        </div>

        <p class="job-description">${job.description}</p>

        <div class="job-footer">
            <button class="btn-interview ${job.status === 'interview' ? 'active' : ''}"
                    onclick="handleInterviewClick(${job.id})"
                    type="button">
                INTERVIEW
            </button>
            <button class="btn-rejected ${job.status === 'rejected' ? 'active' : ''}"
                    onclick="handleRejectedClick(${job.id})"
                    type="button">
                REJECTED
            </button>
            <button class="btn-delete"
                    onclick="handleDelete(${job.id})"
                    type="button"
                    title="Delete this job">
                <i class="fas fa-trash-alt"></i>
            </button>
        </div>
    `;

    return card;
}

// Handle interview button click - toggle functionality
function handleInterviewClick(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = job.status === 'interview' ? 'all' : 'interview';
        renderUI();
    }
}

// Handle rejected button click - toggle functionality
function handleRejectedClick(jobId) {
    const job = jobs.find(j => j.id === jobId);
    if (job) {
        job.status = job.status === 'rejected' ? 'all' : 'rejected';
        renderUI();
    }
}

// Handle delete button click
function handleDelete(jobId) {
    jobs = jobs.filter(j => j.id !== jobId);
    renderUI();
}

// Update dashboard counts
function updateCounts() {
    const totalCount = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    document.getElementById('totalCount').textContent = totalCount;
    document.getElementById('interviewCount').textContent = interviewCount;
    document.getElementById('rejectedCount').textContent = rejectedCount;
}

// Update tab counts and display
function updateTabCounts() {
    const allCount = jobs.length;
    const interviewCount = jobs.filter(j => j.status === 'interview').length;
    const rejectedCount = jobs.filter(j => j.status === 'rejected').length;

    // Update tab count displays
    const allTab = document.querySelector('.tab-all .tab-count');
    const interviewTab = document.querySelector('.tab-interview .tab-count');
    const rejectedTab = document.querySelector('.tab-rejected .tab-count');

    if (allTab) allTab.textContent = allCount;
    if (interviewTab) interviewTab.textContent = interviewCount;
    if (rejectedTab) rejectedTab.textContent = rejectedCount;

    // Update header job count display with proper format
    const jobsCountContainer = document.getElementById('tabJobCountContainer');

    if (currentTab === 'all') {
        // "X Jobs" format for All tab
        jobsCountContainer.innerHTML = `<span class="font-semibold text-gray-900">${allCount}</span> jobs`;
    } else if (currentTab === 'interview') {
        // "X of Y Jobs" format for Interview tab
        jobsCountContainer.innerHTML = `<span class="font-semibold text-gray-900">${interviewCount} of ${allCount}</span> jobs`;
    } else if (currentTab === 'rejected') {
        // "X of Y Jobs" format for Rejected tab
        jobsCountContainer.innerHTML = `<span class="font-semibold text-gray-900">${rejectedCount} of ${allCount}</span> jobs`;
    }
}