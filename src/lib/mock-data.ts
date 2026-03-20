// Temporary mock data — replace with Prisma queries once DATABASE_URL is configured on Vercel

export type MockCompany = {
  id: string;
  name: string;
  slug: string;
  logo: string | null;
  website: string | null;
  description: string | null;
};

export type MockJob = {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: string;
  location: string;
  experience: string | null;
  isRemote: boolean;
  salaryMin: number | null;
  salaryMax: number | null;
  description: string;
  requirements: string | null;
  featured: boolean;
  active: boolean;
  createdAt: Date;
  expiresAt: Date | null;
  companyId: string;
  company: MockCompany;
};

const COMPANIES: MockCompany[] = [
  {
    id: "1",
    name: "Equinix",
    slug: "equinix",
    logo: null,
    website: "https://equinix.com",
    description: "The world's digital infrastructure company, operating 240+ data centers across 70 metros.",
  },
  {
    id: "2",
    name: "CoreWeave",
    slug: "coreweave",
    logo: null,
    website: "https://coreweave.com",
    description: "Specialized cloud provider focused on GPU compute for AI and machine learning workloads.",
  },
  {
    id: "3",
    name: "Digital Realty",
    slug: "digital-realty",
    logo: null,
    website: "https://digitalrealty.com",
    description: "Global data center, colocation and interconnection solutions provider.",
  },
  {
    id: "4",
    name: "Compass Datacenters",
    slug: "compass-datacenters",
    logo: null,
    website: "https://compassdatacenters.com",
    description: "Hyperscale data center solutions built for the world's largest enterprises.",
  },
];

export const MOCK_JOBS: MockJob[] = [
  {
    id: "1",
    slug: "senior-data-center-technician-equinix",
    title: "Senior Data Center Technician",
    category: "DATA_CENTER_OPERATIONS",
    type: "FULL_TIME",
    location: "Ashburn, VA",
    experience: "5+ years",
    isRemote: false,
    salaryMin: 80000,
    salaryMax: 110000,
    description: `We are looking for an experienced Senior Data Center Technician to join our IBX team in Ashburn, VA — one of the busiest data center hubs in the world.\n\nYou will be responsible for maintaining critical infrastructure, performing hardware installations, and ensuring 24/7 uptime for our colocation customers.\n\nKey responsibilities:\n- Perform smart hands tasks including server rack installations, cable management, and hardware replacements\n- Monitor environmental systems (power, cooling, humidity) and respond to alerts\n- Conduct preventive maintenance on critical infrastructure\n- Support customers during scheduled maintenance windows\n- Document all work performed in ticketing system`,
    requirements: `- 5+ years of experience in data center operations\n- Strong knowledge of power distribution, UPS systems, and cooling infrastructure\n- Experience with DCIM tools\n- CompTIA Data+, CDCP, or equivalent certification preferred\n- Ability to work rotating shifts including nights and weekends`,
    featured: true,
    active: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "1",
    company: COMPANIES[0],
  },
  {
    id: "2",
    slug: "gpu-cluster-infrastructure-engineer-coreweave",
    title: "GPU Cluster Infrastructure Engineer",
    category: "AI_ML_INFRASTRUCTURE",
    type: "FULL_TIME",
    location: "New York, NY",
    experience: "3+ years",
    isRemote: true,
    salaryMin: 160000,
    salaryMax: 220000,
    description: `CoreWeave is building the world's leading GPU cloud for AI workloads. We're hiring an Infrastructure Engineer to design, deploy, and scale GPU clusters supporting the next generation of foundation model training.\n\nYou'll work closely with our hardware, networking, and software teams to ensure our clusters deliver maximum utilization and reliability.\n\nKey responsibilities:\n- Design and deploy large-scale GPU clusters (H100, A100)\n- Automate provisioning and configuration management with Ansible/Terraform\n- Optimize network fabric for low-latency, high-bandwidth AI training workloads\n- Troubleshoot hardware failures and coordinate RMA processes\n- Build runbooks and contribute to infrastructure documentation`,
    requirements: `- 3+ years in HPC or large-scale infrastructure engineering\n- Deep understanding of InfiniBand or RoCE networking\n- Experience with Linux system administration at scale\n- Proficiency with Kubernetes and container infrastructure\n- Python scripting skills required`,
    featured: true,
    active: true,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "2",
    company: COMPANIES[1],
  },
  {
    id: "3",
    slug: "data-center-construction-manager-digital-realty",
    title: "Data Center Construction Manager",
    category: "DATA_CENTER_CONSTRUCTION",
    type: "FULL_TIME",
    location: "Chicago, IL",
    experience: "7+ years",
    isRemote: false,
    salaryMin: 130000,
    salaryMax: 175000,
    description: `Digital Realty is seeking an experienced Data Center Construction Manager to oversee ground-up hyperscale campus development in the Chicago metro area.\n\nYou will manage GC relationships, ensure on-budget delivery, and coordinate between design, MEP, and commissioning teams throughout the full project lifecycle.\n\nKey responsibilities:\n- Manage $50M+ construction projects from permitting through commissioning\n- Coordinate with architects, MEP engineers, and equipment vendors\n- Track milestones and manage project schedules in Procore\n- Ensure compliance with NEC, ASHRAE, and Uptime Institute Tier standards\n- Lead weekly owner-architect-contractor meetings`,
    requirements: `- 7+ years of construction management experience, minimum 3 in mission-critical facilities\n- PMP or CCM certification preferred\n- Deep knowledge of electrical and mechanical systems for data centers\n- Experience managing projects exceeding $30M\n- Proficiency with Procore, Bluebeam, and MS Project`,
    featured: false,
    active: true,
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "3",
    company: COMPANIES[2],
  },
  {
    id: "4",
    slug: "network-engineer-colocation-digital-realty",
    title: "Network Engineer — Colocation",
    category: "NETWORK_ENGINEERING",
    type: "FULL_TIME",
    location: "Dallas, TX",
    experience: "4+ years",
    isRemote: false,
    salaryMin: 100000,
    salaryMax: 140000,
    description: `Join Digital Realty's network engineering team supporting colocation customers at our Dallas campus. You will design and maintain the physical and logical network infrastructure that interconnects hundreds of enterprise and cloud customers.\n\nKey responsibilities:\n- Configure and maintain Juniper and Cisco core and distribution switches\n- Support cross-connect provisioning and troubleshooting\n- Implement BGP routing policies for customer peering\n- Respond to network incidents within SLA windows\n- Perform capacity planning and rack space audits`,
    requirements: `- 4+ years of network engineering experience\n- CCNP or JNCIP certification required\n- Hands-on experience with BGP, OSPF, MPLS\n- Familiarity with DCIM and NOC tooling\n- Experience supporting colocation or carrier environments preferred`,
    featured: false,
    active: true,
    createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "3",
    company: COMPANIES[2],
  },
  {
    id: "5",
    slug: "critical-facilities-engineer-compass",
    title: "Critical Facilities Engineer",
    category: "POWER_SYSTEMS",
    type: "FULL_TIME",
    location: "Phoenix, AZ",
    experience: "3+ years",
    isRemote: false,
    salaryMin: 90000,
    salaryMax: 120000,
    description: `Compass Datacenters is hiring a Critical Facilities Engineer to manage electrical and mechanical systems at our Phoenix hyperscale campus.\n\nKey responsibilities:\n- Operate and maintain 480V switchgear, PDUs, UPS, and generator systems\n- Coordinate with utility providers on planned and emergency outages\n- Perform and document preventive maintenance per vendor and NFPA standards\n- Support commissioning activities for new infrastructure build-outs\n- Participate in on-call rotation`,
    requirements: `- 3+ years operating critical electrical or mechanical systems\n- Journeyman electrician license or equivalent experience preferred\n- Familiarity with NFPA 70E electrical safety standards\n- CDCDP or equivalent data center certification a plus\n- Must be able to work rotating shifts`,
    featured: false,
    active: true,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "4",
    company: COMPANIES[3],
  },
  {
    id: "6",
    slug: "site-reliability-engineer-ai-infra-coreweave",
    title: "Site Reliability Engineer — AI Infrastructure",
    category: "SITE_RELIABILITY",
    type: "FULL_TIME",
    location: "Remote",
    experience: "4+ years",
    isRemote: true,
    salaryMin: 170000,
    salaryMax: 230000,
    description: `CoreWeave SRE team is responsible for the reliability and performance of infrastructure supporting some of the largest AI training runs in the world.\n\nYou will own reliability for GPU clusters, storage systems, and the control plane services that orchestrate them.\n\nKey responsibilities:\n- Define and track SLOs for compute and storage services\n- Build automated remediation for common failure modes\n- Conduct blameless post-mortems and drive reliability improvements\n- Participate in on-call rotation with strong escalation support\n- Collaborate with infra engineering on capacity and resilience design`,
    requirements: `- 4+ years of SRE or DevOps experience at scale\n- Strong Python or Go programming skills\n- Experience with Prometheus, Grafana, and distributed tracing\n- Kubernetes administration experience required\n- Experience with bare-metal infrastructure is a strong plus`,
    featured: false,
    active: true,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    expiresAt: null,
    companyId: "2",
    company: COMPANIES[1],
  },
];

export function getMockJobs(filters: {
  category?: string;
  type?: string;
  remote?: string;
  q?: string;
  page?: string;
}) {
  const pageSize = 20;
  const page = Math.max(1, parseInt(filters.page ?? "1", 10));

  let jobs = MOCK_JOBS.filter((j) => j.active);

  if (filters.category) jobs = jobs.filter((j) => j.category === filters.category);
  if (filters.type) jobs = jobs.filter((j) => j.type === filters.type);
  if (filters.remote === "true") jobs = jobs.filter((j) => j.isRemote);
  if (filters.q) {
    const q = filters.q.toLowerCase();
    jobs = jobs.filter(
      (j) =>
        j.title.toLowerCase().includes(q) ||
        j.description.toLowerCase().includes(q) ||
        j.company.name.toLowerCase().includes(q),
    );
  }

  // Featured first
  jobs.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  const total = jobs.length;
  const paginated = jobs.slice((page - 1) * pageSize, page * pageSize);

  return { jobs: paginated, total, page, totalPages: Math.ceil(total / pageSize) };
}

export function getMockJobBySlug(slug: string) {
  return MOCK_JOBS.find((j) => j.slug === slug && j.active) ?? null;
}
