export interface MajorBranch {
  id: string;
  name: string;
  shortName: string;
  courseCount: number;
  description: string;
  skills: string[];
  iconName:
    | 'laptop'
    | 'heart'
    | 'briefcase'
    | 'users'
    | 'compass'
    | 'book'
    | 'megaphone'
    | 'globe'
    | 'pen'
    | 'wrench';
}

export interface Institute {
  id: string;
  name: string;
  country: string;
  countryCode: string;
  city: string;
  majorIds: string[];
  accreditation: string;
  summary: string;
}

export interface CourseModule {
  id: string;
  title: string;
  durationMinutes: number;
  summary: string;
  keyTakeaways: string[];
}

export interface QuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface Course {
  id: string;
  title: string;
  majorId: string;
  instituteId: string;
  credentialType: 'Diploma' | 'Certificate';
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  durationHours: string;
  learnersCount: number;
  likesCount: number;
  languages: string[];
  thumbnail: string;
  skills: string[];
  overview: string;
  outcomes: string[];
  modules: CourseModule[];
  quiz: QuizQuestion[];
}

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  role: string;
  majorId: string;
  quote: string;
  highlight: string;
  outcome: string;
}

export const COURSE_IMAGES = {
  campus: '/src/assets/images/hero_global_campus_1794850414670.jpg',
  health: '/src/assets/images/course_health_care_1794850413279.jpg',
  cs: '/src/assets/images/course_computer_science_1794850420808.jpg',
  business: '/src/assets/images/course_business_analytics_1794850414560.jpg',
  engineering: '/src/assets/images/course_civil_engineering_1794850415286.jpg',
};

export const MAJORS: MajorBranch[] = [
  {
    id: 'computer-science-it',
    name: 'Information Technology & Computer Science',
    shortName: 'Computer Science & IT',
    courseCount: 1324,
    description:
      'Software architecture, cloud computing, cybersecurity, and machine intelligence taught across leading technical universities worldwide.',
    skills: ['Python Programming', 'Information Systems', 'Cybersecurity', 'Cloud Architecture'],
    iconName: 'laptop',
  },
  {
    id: 'health-nursing',
    name: 'Health, Nursing & Clinical Care',
    shortName: 'Health & Nursing',
    courseCount: 1174,
    description:
      'Evidence-based patient care, epidemiology, pharmacology, and clinical safety standards united under one medical major branch.',
    skills: ['Health Care', 'Patient Safety', 'Pharmacology', 'Public Health'],
    iconName: 'heart',
  },
  {
    id: 'business-management',
    name: 'Business & Financial Strategy',
    shortName: 'Business',
    courseCount: 1826,
    description:
      'Corporate finance, contract law, global supply chains, and accounting standards from business faculties across five continents.',
    skills: ['Accounting', 'Contract Law', 'Business Management', 'Financial Analysis'],
    iconName: 'briefcase',
  },
  {
    id: 'leadership-operations',
    name: 'Management & Quality Operations',
    shortName: 'Management',
    courseCount: 1141,
    description:
      'Organizational leadership, lean manufacturing, ISO quality control, and project governance across international management schools.',
    skills: ['Quality Control', 'Project Management', 'Lean Six Sigma', 'Operations'],
    iconName: 'users',
  },
  {
    id: 'engineering-construction',
    name: 'Engineering & Sustainable Construction',
    shortName: 'Engineering & Construction',
    courseCount: 871,
    description:
      'Structural mechanics, workplace safety engineering, renewable grids, and civil infrastructure unified from global polytechnics.',
    skills: ['Structural Analysis', 'Workplace Safety', 'CAD Design', 'Sustainable Energy'],
    iconName: 'wrench',
  },
  {
    id: 'psychology-mental-health',
    name: 'Psychology & Personal Development',
    shortName: 'Personal Development',
    courseCount: 1381,
    description:
      'Behavioral psychology, cognitive resilience, mental health first aid, and executive communication across partner institutes.',
    skills: ['Mental Health', 'Cognitive Science', 'Conflict Resolution', 'Leadership Mindset'],
    iconName: 'compass',
  },
  {
    id: 'teaching-academics',
    name: 'Teaching, Pedagogy & Academics',
    shortName: 'Teaching & Academics',
    courseCount: 1702,
    description:
      'Curriculum design, inclusive classroom instruction, STEM education, and academic assessment models from global teaching colleges.',
    skills: ['Curriculum Design', 'Academic Research', 'Classroom Pedagogy', 'EdTech Tools'],
    iconName: 'book',
  },
  {
    id: 'sales-marketing',
    name: 'Sales, Brand & Digital Marketing',
    shortName: 'Sales & Marketing',
    courseCount: 456,
    description:
      'Performance analytics, ethical persuasion, search marketing, and B2B revenue strategy across international marketing institutes.',
    skills: ['Digital Marketing', 'SEO Analytics', 'B2B Sales', 'Brand Strategy'],
    iconName: 'megaphone',
  },
  {
    id: 'languages-applied',
    name: 'Global Languages & Translation',
    shortName: 'Language',
    courseCount: 319,
    description:
      'Applied linguistics, business Spanish, Japanese, French, and German proficiency tracks from accredited language faculties.',
    skills: ['Business Spanish', 'Applied Linguistics', 'Cross-Cultural Comm', 'Translation'],
    iconName: 'globe',
  },
  {
    id: 'english-communication',
    name: 'English Language & Academic Writing',
    shortName: 'English',
    courseCount: 55,
    description:
      'IELTS/TOEFL preparation, technical composition, grammar precision, and workplace rhetoric from Anglophone partner institutions.',
    skills: ['Academic Writing', 'Business English', 'Grammar Precision', 'Public Speaking'],
    iconName: 'pen',
  },
];

export const INSTITUTES: Institute[] = [
  // Computer Science & IT Branch across 5 countries
  {
    id: 'stanford-online',
    name: 'Stanford Open Computing',
    country: 'United States',
    countryCode: 'US',
    city: 'Stanford, CA',
    majorIds: ['computer-science-it', 'business-management'],
    accreditation: 'CPD & Academic Credit Equivalent',
    summary: 'Algorithmic foundations, distributed systems, and applied machine intelligence.',
  },
  {
    id: 'cambridge-digital',
    name: 'University of Cambridge Continuing Ed',
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'Cambridge',
    majorIds: ['computer-science-it', 'english-communication', 'teaching-academics'],
    accreditation: 'UK Quality Assured Curriculum',
    summary: 'Formal software verification, cybersecurity governance, and academic rhetoric.',
  },
  {
    id: 'tum-munich',
    name: 'Technical University of Munich (TUM)',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Munich',
    majorIds: ['computer-science-it', 'engineering-construction'],
    accreditation: 'European Bologna ECTS Aligned',
    summary: 'Industrial software engineering, embedded IoT, and structural robotics.',
  },
  {
    id: 'nus-singapore',
    name: 'National University of Singapore (NUS)',
    country: 'Singapore',
    countryCode: 'SG',
    city: 'Singapore',
    majorIds: ['computer-science-it', 'sales-marketing'],
    accreditation: 'SkillsFuture Partner Framework',
    summary: 'Enterprise information systems, cloud DevOps, and APAC digital commerce.',
  },
  {
    id: 'tokyo-ocw',
    name: 'University of Tokyo OpenCourseWare',
    country: 'Japan',
    countryCode: 'JP',
    city: 'Tokyo',
    majorIds: ['computer-science-it', 'engineering-construction'],
    accreditation: 'Japan Open Education Consortium',
    summary: 'Quantum-ready algorithms, precision robotics, and resilient smart infrastructure.',
  },

  // Health & Nursing Branch across 5 countries
  {
    id: 'johns-hopkins-health',
    name: 'Johns Hopkins Public Health Open',
    country: 'United States',
    countryCode: 'US',
    city: 'Baltimore, MD',
    majorIds: ['health-nursing'],
    accreditation: 'Global Public Health Consortium',
    summary: 'Clinical epidemiology, medication administration, and community care protocols.',
  },
  {
    id: 'kings-college-health',
    name: "King's College London Health",
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    majorIds: ['health-nursing', 'psychology-mental-health'],
    accreditation: 'NHS Aligned Clinical Standards',
    summary: 'Acute nursing practice, geriatric dignity, and community mental health pathways.',
  },
  {
    id: 'toronto-clinical',
    name: 'University of Toronto Clinical Hub',
    country: 'Canada',
    countryCode: 'CA',
    city: 'Toronto',
    majorIds: ['health-nursing', 'psychology-mental-health'],
    accreditation: 'Canadian Allied Health Framework',
    summary: 'Interdisciplinary patient care, safe manual handling, and rehabilitation science.',
  },
  {
    id: 'melbourne-medical',
    name: 'University of Melbourne Medical',
    country: 'Australia',
    countryCode: 'AU',
    city: 'Melbourne',
    majorIds: ['health-nursing'],
    accreditation: 'ANZ Clinical Practice Board',
    summary: 'Pharmacology safety, infection control, and rural emergency triage.',
  },
  {
    id: 'karolinska-global',
    name: 'Karolinska Global Health Institute',
    country: 'Sweden',
    countryCode: 'SE',
    city: 'Stockholm',
    majorIds: ['health-nursing'],
    accreditation: 'Nordic Health Sciences Standard',
    summary: 'Preventive healthcare systems, maternal care, and food safety epidemiology.',
  },

  // Business & Management Branch across 5 countries
  {
    id: 'mit-sloan',
    name: 'MIT Sloan Open Learning',
    country: 'United States',
    countryCode: 'US',
    city: 'Cambridge, MA',
    majorIds: ['business-management', 'leadership-operations'],
    accreditation: 'AACSB Open Curriculum',
    summary: 'Quantitative financial modeling, system dynamics, and operations research.',
  },
  {
    id: 'lse-london',
    name: 'London School of Economics Open',
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    majorIds: ['business-management'],
    accreditation: 'UK Higher Education Standard',
    summary: 'International contract law, macroeconomic policy, and corporate governance.',
  },
  {
    id: 'insead-france',
    name: 'INSEAD Global Business Studio',
    country: 'France',
    countryCode: 'FR',
    city: 'Fontainebleau',
    majorIds: ['business-management', 'leadership-operations', 'sales-marketing'],
    accreditation: 'EQUIS International Benchmark',
    summary: 'Cross-border leadership, strategic negotiations, and global brand expansion.',
  },
  {
    id: 'bocconi-milan',
    name: 'Bocconi Management Faculty',
    country: 'Italy',
    countryCode: 'IT',
    city: 'Milan',
    majorIds: ['business-management', 'sales-marketing'],
    accreditation: 'European Business Accreditation',
    summary: 'Financial accounting, luxury brand management, and European trade compliance.',
  },
  {
    id: 'hkust-business',
    name: 'HKUST Business Academy',
    country: 'Hong Kong',
    countryCode: 'HK',
    city: 'Hong Kong',
    majorIds: ['business-management', 'leadership-operations'],
    accreditation: 'Asia-Pacific Management Standard',
    summary: 'Supply chain resilience, FinTech compliance, and ISO quality control.',
  },

  // Engineering & Construction across 4 countries
  {
    id: 'eth-zurich',
    name: 'ETH Zurich Open Engineering',
    country: 'Switzerland',
    countryCode: 'CH',
    city: 'Zurich',
    majorIds: ['engineering-construction'],
    accreditation: 'Swiss Federal Engineering Standard',
    summary: 'Bridge mechanics, sustainable concrete design, and alpine structural safety.',
  },
  {
    id: 'tu-delft',
    name: 'Delft University of Technology',
    country: 'Netherlands',
    countryCode: 'NL',
    city: 'Delft',
    majorIds: ['engineering-construction', 'leadership-operations'],
    accreditation: 'European Engineering Council',
    summary: 'Coastal civil engineering, circular construction, and industrial safety.',
  },
  {
    id: 'imperial-london',
    name: 'Imperial College Engineering Lab',
    country: 'United Kingdom',
    countryCode: 'UK',
    city: 'London',
    majorIds: ['engineering-construction'],
    accreditation: 'UK Chartered Engineering Track',
    summary: 'Workplace hazard engineering, smart grids, and urban infrastructure.',
  },
  {
    id: 'kaist-korea',
    name: 'KAIST Structural & Energy Lab',
    country: 'South Korea',
    countryCode: 'KR',
    city: 'Daejeon',
    majorIds: ['engineering-construction', 'computer-science-it'],
    accreditation: 'Korean Engineering Accreditation',
    summary: 'Modular prefab construction, seismic retrofitting, and automation.',
  },

  // Psychology, Teaching, Languages, English across countries
  {
    id: 'yale-psych',
    name: 'Yale Open Behavioural Science',
    country: 'United States',
    countryCode: 'US',
    city: 'New Haven, CT',
    majorIds: ['psychology-mental-health'],
    accreditation: 'APA Open Resource Standard',
    summary: 'Cognitive behavioral foundations, workplace well-being, and stress resilience.',
  },
  {
    id: 'leiden-psych',
    name: 'Leiden Behavioural Institute',
    country: 'Netherlands',
    countryCode: 'NL',
    city: 'Leiden',
    majorIds: ['psychology-mental-health', 'teaching-academics'],
    accreditation: 'European Psychology Framework',
    summary: 'Trauma-informed support, domestic abuse awareness, and developmental care.',
  },
  {
    id: 'helsinki-pedagogy',
    name: 'University of Helsinki Pedagogy',
    country: 'Finland',
    countryCode: 'FI',
    city: 'Helsinki',
    majorIds: ['teaching-academics'],
    accreditation: 'Finnish National Education Model',
    summary: 'Student-centered curriculum architecture and formative assessment methods.',
  },
  {
    id: 'harvard-ed-open',
    name: 'Harvard Graduate Ed Open',
    country: 'United States',
    countryCode: 'US',
    city: 'Cambridge, MA',
    majorIds: ['teaching-academics', 'english-communication'],
    accreditation: 'US Academic Continuing Ed',
    summary: 'Instructional leadership, literacy interventions, and higher-ed rhetoric.',
  },
  {
    id: 'cervantes-madrid',
    name: 'Instituto Cervantes Open Lab',
    country: 'Spain',
    countryCode: 'ES',
    city: 'Madrid',
    majorIds: ['languages-applied'],
    accreditation: 'DELE / CEFR Aligned',
    summary: 'Professional Spanish communication for healthcare, trade, and diplomacy.',
  },
  {
    id: 'goethe-berlin',
    name: 'Goethe Applied Linguistics Berlin',
    country: 'Germany',
    countryCode: 'DE',
    city: 'Berlin',
    majorIds: ['languages-applied'],
    accreditation: 'CEFR B1-C1 Framework',
    summary: 'Technical German for engineering teams and cross-border translation.',
  },
  {
    id: 'trinity-dublin',
    name: 'Trinity College English Hub',
    country: 'Ireland',
    countryCode: 'IE',
    city: 'Dublin',
    majorIds: ['english-communication', 'teaching-academics'],
    accreditation: 'QQI & CEFR Aligned',
    summary: 'Academic composition, executive grammar precision, and TEFL pedagogy.',
  },
];

export const COURSES: Course[] = [
  // Health & Nursing across UK, Canada, US, Sweden
  {
    id: 'diploma-health-social-care',
    title: 'Diploma in Health and Social Care',
    majorId: 'health-nursing',
    instituteId: 'kings-college-health',
    credentialType: 'Diploma',
    level: 'Advanced',
    durationHours: '10-15 hrs',
    learnersCount: 101760,
    likesCount: 2849,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.health,
    skills: ['Health Care', 'Patient Safety'],
    overview:
      'Master holistic care planning, safeguarding legislation, and multidisciplinary clinical coordination aligned with modern health services.',
    outcomes: [
      'Design person-centered care plans for acute and community settings',
      'Apply safeguarding and ethical confidentiality protocols',
      'Coordinate multi-agency social care and family support teams',
    ],
    modules: [
      {
        id: 'hsc-1',
        title: 'Module 1: Principles of Person-Centered Care',
        durationMinutes: 45,
        summary: 'Foundations of dignity, autonomy, and individualized care assessment.',
        keyTakeaways: [
          'Conduct baseline holistic needs evaluations with patients and families',
          'Document informed consent and care preferences clearly',
          'Balance clinical safety with personal independence',
        ],
      },
      {
        id: 'hsc-2',
        title: 'Module 2: Safeguarding & Clinical Governance',
        durationMinutes: 50,
        summary: 'Identifying vulnerability indicators and escalating clinical risk properly.',
        keyTakeaways: [
          'Recognize physical, emotional, and institutional risk signals early',
          'Follow mandatory reporting chains without breaching confidentiality',
          'Audit care environments against statutory safety checklists',
        ],
      },
      {
        id: 'hsc-3',
        title: 'Module 3: Multidisciplinary Care Coordination',
        durationMinutes: 40,
        summary: 'Working seamlessly across nursing, social work, and pharmacy teams.',
        keyTakeaways: [
          'Structure SBAR handovers for zero-gap clinical communication',
          'Manage discharge planning and home-care transitions',
          'Measure long-term patient quality-of-life outcomes',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is the primary goal of person-centered care planning?',
        options: [
          'Standardizing identical schedules for every ward resident',
          'Tailoring support around the individual’s dignity, preferences, and clinical needs',
          'Minimizing family involvement during discharge',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Which communication framework is widely used for structured clinical handovers?',
        options: ['FIFO', 'SBAR', 'SWOT'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'When a safeguarding concern arises, what is the clinician’s immediate duty?',
        options: [
          'Wait 30 days to see if the concern resolves',
          'Document factually and escalate through the designated safeguarding officer',
          'Discuss the details on public social channels',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'diploma-mental-health',
    title: 'Diploma in Mental Health',
    majorId: 'psychology-mental-health',
    instituteId: 'yale-psych',
    credentialType: 'Diploma',
    level: 'Beginner',
    durationHours: '10-15 hrs',
    learnersCount: 289790,
    likesCount: 3789,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.campus,
    skills: ['Mental Health', 'Cognitive Science'],
    overview:
      'Understand mood disorders, neurobiology of stress, evidence-based therapeutic frameworks, and supportive workplace intervention.',
    outcomes: [
      'Differentiate common anxiety, mood, and trauma-related conditions',
      'Apply active listening and psychological first-aid techniques',
      'Design preventive well-being programs for schools and workplaces',
    ],
    modules: [
      {
        id: 'mh-1',
        title: 'Module 1: Biopsychosocial Model of Mental Health',
        durationMinutes: 40,
        summary: 'How biological, cognitive, and social environments interact in mental well-being.',
        keyTakeaways: [
          'Explain why single-cause diagnoses overlook environmental stressors',
          'Identify protective resilience factors in daily routines',
        ],
      },
      {
        id: 'mh-2',
        title: 'Module 2: Anxiety, Burnout & Depressive Patterns',
        durationMinutes: 45,
        summary: 'Recognizing early behavioral shifts and evidence-backed support pathways.',
        keyTakeaways: [
          'Distinguish chronic stress burnout from clinical depressive episodes',
          'Understand CBT thought-reframing foundations',
        ],
      },
      {
        id: 'mh-3',
        title: 'Module 3: Crisis De-escalation & Referral',
        durationMinutes: 35,
        summary: 'Practical, non-judgmental conversation guides and referral boundaries.',
        keyTakeaways: [
          'Use calm, validating language during acute distress',
          'Connect individuals safely to licensed clinical resources',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What does the biopsychosocial model emphasize?',
        options: [
          'Only genetic inheritance determines mental health',
          'Biological, psychological, and social factors interact continuously',
          'Physical exercise replaces all clinical interventions',
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Which approach focuses on identifying and reframing unhelpful thought patterns?',
        options: ['Cognitive Behavioral Therapy (CBT)', 'Phlebotomy', 'Structural Mechanics'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'What is the role of a non-clinical mental health first responder?',
        options: [
          'Prescribe psychiatric medication',
          'Listen without judgment and connect the person to professional care',
          'Issue formal psychiatric diagnoses',
        ],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'diploma-workplace-safety',
    title: 'Diploma in Workplace Safety and Health',
    majorId: 'engineering-construction',
    instituteId: 'imperial-london',
    credentialType: 'Diploma',
    level: 'Beginner',
    durationHours: '6-10 hrs',
    learnersCount: 207362,
    likesCount: 3918,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.engineering,
    skills: ['Workplace Safety', 'Quality Control'],
    overview:
      'Industrial hazard identification, ergonomic design, chemical containment, and ISO 45001 occupational safety compliance.',
    outcomes: [
      'Execute 5-step risk assessments across construction and factory sites',
      'Apply the Hierarchy of Controls to eliminate mechanical hazards',
      'Lead root-cause incident investigations without blame bias',
    ],
    modules: [
      {
        id: 'ws-1',
        title: 'Module 1: Hierarchy of Hazard Controls',
        durationMinutes: 35,
        summary: 'Prioritizing elimination and engineering controls above PPE.',
        keyTakeaways: [
          'Rank Elimination, Substitution, Engineering, Administrative, and PPE',
          'Redesign workstations to prevent repetitive strain',
        ],
      },
      {
        id: 'ws-2',
        title: 'Module 2: Construction & Site Risk Audits',
        durationMinutes: 45,
        summary: 'Working at height, lockout-tagout, and electrical isolation standards.',
        keyTakeaways: [
          'Verify lockout-tagout procedures before equipment servicing',
          'Inspect scaffolding and fall-arrest anchor ratings',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which level sits at the top (most effective) of the Hierarchy of Controls?',
        options: ['Personal Protective Equipment', 'Elimination of the hazard', 'Warning signage'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What is Lockout-Tagout (LOTO) designed to prevent?',
        options: [
          'Unauthorized software downloads',
          'Unexpected energization of machinery during maintenance',
          'Delayed payroll processing',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'A thorough incident investigation focuses primarily on:',
        options: [
          'Finding systemic root causes to prevent recurrence',
          'Assigning personal blame as quickly as possible',
          'Deleting inspection logs',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'diploma-nursing-patient-care',
    title: 'Diploma in Nursing and Patient Care',
    majorId: 'health-nursing',
    instituteId: 'toronto-clinical',
    credentialType: 'Diploma',
    level: 'Beginner',
    durationHours: '10-15 hrs',
    learnersCount: 360252,
    likesCount: 4420,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.health,
    skills: ['Health Care', 'Patient Safety'],
    overview:
      'Core clinical nursing skills covering vital signs interpretation, sterile wound care, infection prevention, and compassionate bedside communication.',
    outcomes: [
      'Measure and interpret blood pressure, SpO2, pulse, and temperature trends',
      'Maintain aseptic technique during clinical procedures',
      'Support mobility and pressure-ulcer prevention protocols',
    ],
    modules: [
      {
        id: 'npc-1',
        title: 'Module 1: Vital Signs & Early Warning Scores',
        durationMinutes: 45,
        summary: 'Tracking physiological baselines and detecting clinical deterioration.',
        keyTakeaways: [
          'Interpret NEWS2 early warning thresholds accurately',
          'Document observations systematically in patient charts',
        ],
      },
      {
        id: 'npc-2',
        title: 'Module 2: Infection Control & Asepsis',
        durationMinutes: 40,
        summary: 'Breaking the chain of infection in inpatient and outpatient wards.',
        keyTakeaways: [
          'Apply WHO 5 Moments for Hand Hygiene consistently',
          'Manage sterile fields and biomedical waste safely',
        ],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Why are Early Warning Scores (such as NEWS2) used in wards?',
        options: [
          'To detect subtle patient deterioration before an emergency occurs',
          'To calculate hospital cafeteria inventory',
          'To replace physician prescriptions',
        ],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'What is the single most effective measure to break cross-infection in care?',
        options: ['Double-blanketing beds', 'Proper hand hygiene at the 5 clinical moments', 'Turning off ward lighting'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Aseptic technique is required primarily to:',
        options: [
          'Speed up discharge paperwork',
          'Prevent pathogenic microorganisms from entering sterile body sites',
          'Lower room humidity',
        ],
        correctIndex: 1,
      },
    ],
  },

  // Top Certificates
  {
    id: 'cert-safe-manual-handling',
    title: 'Essential Safe Manual Handling Skills',
    majorId: 'health-nursing',
    instituteId: 'melbourne-medical',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '2-3 hrs',
    learnersCount: 43676,
    likesCount: 1498,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.health,
    skills: ['Health Care', 'Workplace Safety'],
    overview:
      'Spine biomechanics, patient transfer hoists, and load-balancing techniques to eliminate musculoskeletal injuries in care and logistics.',
    outcomes: [
      'Assess load weight, center of gravity, and travel path prior to lifting',
      'Operate mechanical transfer slings safely with two-person teams',
    ],
    modules: [
      {
        id: 'mh-mod-1',
        title: 'Module 1: Spine Biomechanics & Safe Posture',
        durationMinutes: 30,
        summary: 'Protecting lumbar discs using neutral spine alignment and leg drive.',
        keyTakeaways: ['Keep loads close to the body center of mass', 'Avoid twisting under load'],
      },
      {
        id: 'mh-mod-2',
        title: 'Module 2: Assisted Patient Transfers',
        durationMinutes: 35,
        summary: 'Slide sheets, transfer belts, and ceiling hoist protocols.',
        keyTakeaways: ['Communicate countdown cues with the patient', 'Check sling clip integrity'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Where should a load be held relative to your body when lifting?',
        options: ['As far out in front as possible', 'Close to your waist and center of gravity', 'Above shoulder height'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'When changing direction while carrying a load, you should:',
        options: ['Twist at the waist', 'Move your feet to turn your whole body', 'Lean backward'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Before operating a patient hoist, a caregiver must verify:',
        options: ['Sling rating, clip engagement, and clear floor path', 'Room paint color', 'Hospital cafeteria hours'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-domestic-abuse-awareness',
    title: 'Domestic Violence and Abuse Awareness',
    majorId: 'psychology-mental-health',
    instituteId: 'leiden-psych',
    credentialType: 'Certificate',
    level: 'Beginner',
    durationHours: '4-5 hrs',
    learnersCount: 22442,
    likesCount: 1555,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.campus,
    skills: ['Mental Health', 'Health Care'],
    overview:
      'Trauma-informed training for educators, HR leads, and healthcare staff to recognize coercive control and safely connect survivors with support.',
    outcomes: [
      'Identify non-physical patterns of coercive and financial control',
      'Respond safely without increasing risk to the survivor',
    ],
    modules: [
      {
        id: 'dv-1',
        title: 'Module 1: Recognizing Coercive Control',
        durationMinutes: 40,
        summary: 'Understanding isolation, financial control, and digital surveillance patterns.',
        keyTakeaways: ['Look beyond visible signs to behavioral isolation', 'Respect survivor autonomy'],
      },
      {
        id: 'dv-2',
        title: 'Module 2: Safe Disclosure & Support Pathways',
        durationMinutes: 40,
        summary: 'Creating private, supportive environments for disclosure and safety planning.',
        keyTakeaways: ['Validate without pressuring immediate decisions', 'Provide discreet hotline resources'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Coercive control often includes which of the following?',
        options: ['Financial restriction and social isolation', 'Encouraging independent friendships', 'Transparent shared budgets'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'When someone discloses abuse, the most supportive first response is:',
        options: [
          'Question why they did not leave sooner',
          'Listen calmly, affirm their safety matters, and offer confidential resources',
          'Confront the alleged perpetrator directly',
        ],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Safety planning should always be led by:',
        options: ['The survivor’s assessment of their immediate risks', 'Public social polls', 'Automated email blasts'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-medication-management',
    title: 'Medication Management and Administration',
    majorId: 'health-nursing',
    instituteId: 'johns-hopkins-health',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '2-3 hrs',
    learnersCount: 106127,
    likesCount: 4995,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.health,
    skills: ['Health Care', 'Pharmacology'],
    overview:
      'Master the Seven Rights of medication safety, dosage verification, storage temperatures, and adverse drug reaction reporting.',
    outcomes: [
      'Apply the 7 Rights before every medication administration event',
      'Spot high-alert drug interactions and documentation errors',
    ],
    modules: [
      {
        id: 'med-1',
        title: 'Module 1: The Seven Rights of Medication Safety',
        durationMinutes: 35,
        summary: 'Right patient, drug, dose, route, time, documentation, and response.',
        keyTakeaways: ['Use two independent patient identifiers every time', 'Never pre-pour unmarked doses'],
      },
      {
        id: 'med-2',
        title: 'Module 2: Cold-Chain Storage & Adverse Reactions',
        durationMinutes: 35,
        summary: 'Managing controlled substances, temperature logs, and anaphylaxis response.',
        keyTakeaways: ['Maintain 2°C–8°C vaccine cold chain logs', 'Report medication errors transparently'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'How many independent patient identifiers should be checked before giving medication?',
        options: ['Zero if you recognize the room', 'At least two (e.g., full name and date of birth)', 'Only bed number'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'Standard cold-chain vaccine storage typically requires:',
        options: ['2°C to 8°C', '25°C to 30°C', '-40°C'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'When should medication administration be recorded on the chart?',
        options: ['At the end of the week', 'Immediately after confirming the patient received the dose', 'Two hours before administering'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'cert-haccp-food-safety',
    title: 'HACCP Essentials and Catering Food Safety',
    majorId: 'health-nursing',
    instituteId: 'karolinska-global',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '4-5 hrs',
    learnersCount: 33298,
    likesCount: 1998,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.business,
    skills: ['Health Care', 'Quality Control'],
    overview:
      'Hazard Analysis Critical Control Point (HACCP) systems for hospitality, hospital kitchens, and food production compliance.',
    outcomes: [
      'Map the 7 HACCP principles across commercial kitchen workflows',
      'Control cross-contamination, allergen labeling, and temperature danger zones',
    ],
    modules: [
      {
        id: 'haccp-1',
        title: 'Module 1: The 7 Principles of HACCP',
        durationMinutes: 45,
        summary: 'Identifying biological, chemical, and physical Critical Control Points.',
        keyTakeaways: ['Define critical limits for cooking and chilling', 'Maintain corrective action logs'],
      },
      {
        id: 'haccp-2',
        title: 'Module 2: Allergen Control & Temperature Logs',
        durationMinutes: 40,
        summary: 'Preventing cross-contact in high-volume kitchens.',
        keyTakeaways: ['Keep food out of the 5°C–60°C danger zone', 'Color-code prep boards'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is the temperature "danger zone" where foodborne bacteria multiply rapidly?',
        options: ['0°C to 4°C', '5°C to 60°C', '80°C to 100°C'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        prompt: 'What does CCP stand for in food safety management?',
        options: ['Critical Control Point', 'Culinary Catering Plan', 'Central Cleaning Protocol'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Which practice prevents allergen cross-contact?',
        options: ['Using separate sanitized utensils and dedicated prep surfaces', 'Wiping a knife with a dry towel', 'Serving without ingredient labels'],
        correctIndex: 0,
      },
    ],
  },

  // Computer Science & IT across US, UK, Germany, Singapore, Japan (SAME MAJOR BRANCH!)
  {
    id: 'diploma-python-applied-ai',
    title: 'Diploma in Python Programming & Applied AI',
    majorId: 'computer-science-it',
    instituteId: 'stanford-online',
    credentialType: 'Diploma',
    level: 'Intermediate',
    durationHours: '12-16 hrs',
    learnersCount: 194500,
    likesCount: 5120,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.cs,
    skills: ['Python Programming', 'Information Systems'],
    overview:
      'Build production Python pipelines, data structures, REST integrations, and supervised machine learning models from first principles.',
    outcomes: [
      'Write clean modular Python with type annotations and unit tests',
      'Train and evaluate regression and classification workflows',
    ],
    modules: [
      {
        id: 'py-1',
        title: 'Module 1: Pythonic Data Structures & Complexity',
        durationMinutes: 50,
        summary: 'Dictionaries, generators, comprehensions, and Big-O efficiency.',
        keyTakeaways: ['Choose O(1) hash lookups for large datasets', 'Stream data with generators'],
      },
      {
        id: 'py-2',
        title: 'Module 2: Supervised Machine Learning Pipelines',
        durationMinutes: 55,
        summary: 'Train/test splitting, feature scaling, and avoiding overfitting.',
        keyTakeaways: ['Evaluate models with precision, recall, and F1', 'Separate validation splits strictly'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is the average time complexity of a Python dictionary key lookup?',
        options: ['O(1)', 'O(n log n)', 'O(n²)'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Why must you split data into training and test sets before fitting scalers?',
        options: ['To prevent data leakage from the test distribution', 'To double file size', 'To slow down execution'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Which metric balances precision and recall for imbalanced classes?',
        options: ['F1 Score', 'Line Count', 'CPU Clock Speed'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-cambridge-cybersecurity',
    title: 'Cybersecurity Governance & Zero-Trust Systems',
    majorId: 'computer-science-it',
    instituteId: 'cambridge-digital',
    credentialType: 'Certificate',
    level: 'Advanced',
    durationHours: '5-7 hrs',
    learnersCount: 78420,
    likesCount: 2310,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.cs,
    skills: ['Information Systems', 'Cybersecurity'],
    overview:
      'Threat modeling, cryptographic authentication, IAM least-privilege policies, and incident response frameworks.',
    outcomes: [
      'Design zero-trust network boundaries and role-based access controls',
      'Conduct STRIDE threat models on modern web applications',
    ],
    modules: [
      {
        id: 'sec-1',
        title: 'Module 1: Zero-Trust & Least Privilege',
        durationMinutes: 45,
        summary: 'Eliminating implicit network trust through continuous verification.',
        keyTakeaways: ['Enforce short-lived tokens and MFA', 'Verify identity at every service boundary'],
      },
      {
        id: 'sec-2',
        title: 'Module 2: Threat Modeling with STRIDE',
        durationMinutes: 40,
        summary: 'Systematic review of Spoofing, Tampering, Repudiation, and Elevation risks.',
        keyTakeaways: ['Audit API endpoints for authorization bypasses', 'Log immutable security events'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is the core principle of Zero-Trust architecture?',
        options: ['Never trust implicitly; verify every request regardless of network location', 'Disable firewalls inside offices', 'Share one root password'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'In STRIDE threat modeling, what does the "E" stand for?',
        options: ['Encryption', 'Elevation of Privilege', 'Email Routing'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Least privilege means granting a user:',
        options: ['Full admin rights by default', 'Only the minimum permissions required for their task', 'Read access to every database'],
        correctIndex: 1,
      },
    ],
  },
  {
    id: 'diploma-tum-distributed-systems',
    title: 'Diploma in Industrial Software & Cloud Architecture',
    majorId: 'computer-science-it',
    instituteId: 'tum-munich',
    credentialType: 'Diploma',
    level: 'Intermediate',
    durationHours: '10-12 hrs',
    learnersCount: 64210,
    likesCount: 1890,
    languages: ['English', 'German'],
    thumbnail: COURSE_IMAGES.cs,
    skills: ['Information Systems', 'Cloud Architecture'],
    overview:
      'Containerized microservices, fault-tolerant message queues, CI/CD pipelines, and observability from Munich engineering faculty.',
    outcomes: [
      'Architect stateless services with health checks and graceful degradation',
      'Eliminate single points of failure across distributed storage',
    ],
    modules: [
      {
        id: 'tum-1',
        title: 'Module 1: Resilient Service Design',
        durationMinutes: 45,
        summary: 'Circuit breakers, idempotency keys, and horizontal autoscaling.',
        keyTakeaways: ['Make payment and enrollment writes idempotent', 'Use exponential backoff with jitter'],
      },
      {
        id: 'tum-2',
        title: 'Module 2: Observability & Automated CI/CD',
        durationMinutes: 45,
        summary: 'Structured logging, latency percentiles, and zero-downtime rollouts.',
        keyTakeaways: ['Track p95 and p99 latency rather than averages alone', 'Automate canary verification'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Why are idempotency keys critical in distributed APIs?',
        options: ['They ensure retried requests do not duplicate side effects', 'They compress JPEG images', 'They replace TLS certificates'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'What pattern stops a service from repeatedly calling a failing downstream dependency?',
        options: ['Circuit Breaker', 'Infinite Loop', 'Plaintext Polling'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Why monitor p99 latency alongside average latency?',
        options: ['Averages hide tail-latency failures affecting real users', 'p99 is always smaller than p50', 'It reduces memory usage'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-nus-enterprise-systems',
    title: 'Enterprise Information Systems & Cloud DevOps',
    majorId: 'computer-science-it',
    instituteId: 'nus-singapore',
    credentialType: 'Certificate',
    level: 'Beginner',
    durationHours: '4-6 hrs',
    learnersCount: 52180,
    likesCount: 1640,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.cs,
    skills: ['Information Systems', 'Python Programming'],
    overview:
      'Bridge business operations and cloud infrastructure through ERP integration, API contracts, and automated deployment pipelines.',
    outcomes: [
      'Map organizational workflows into clean relational and document schemas',
      'Manage cloud environments using Infrastructure-as-Code principles',
    ],
    modules: [
      {
        id: 'nus-1',
        title: 'Module 1: Enterprise Data Integration',
        durationMinutes: 40,
        summary: 'Connecting CRM, inventory, and analytics stores reliably.',
        keyTakeaways: ['Version API contracts cleanly', 'Validate schemas at ingestion boundaries'],
      },
      {
        id: 'nus-2',
        title: 'Module 2: Infrastructure as Code Basics',
        durationMinutes: 35,
        summary: 'Reproducible staging and production deployments.',
        keyTakeaways: ['Keep secrets out of version control', 'Automate rollback triggers'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What is a key benefit of Infrastructure as Code (IaC)?',
        options: ['Repeatable, version-controlled environment provisioning', 'Manual point-and-click configuration drift', 'Hardcoding API keys'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Where should production database credentials be stored?',
        options: ['In public GitHub README files', 'In a secure secrets manager / runtime environment variables', 'Inside frontend HTML'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        prompt: 'Validating incoming payloads at API boundaries prevents:',
        options: ['Corrupted or malformed records entering downstream systems', 'Network fiber breakage', 'Browser font rendering'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-tokyo-algorithms',
    title: 'Applied Algorithms & Edge Intelligence',
    majorId: 'computer-science-it',
    instituteId: 'tokyo-ocw',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '5-6 hrs',
    learnersCount: 41900,
    likesCount: 1520,
    languages: ['English', 'Japanese'],
    thumbnail: COURSE_IMAGES.cs,
    skills: ['Python Programming', 'Information Systems'],
    overview:
      'Graph traversal, dynamic programming, and low-latency inference techniques for robotics and smart-city telemetry.',
    outcomes: [
      'Solve shortest-path and resource-scheduling problems with graph algorithms',
      'Optimize numerical computation for constrained edge hardware',
    ],
    modules: [
      {
        id: 'tok-1',
        title: 'Module 1: Graph Search & Routing',
        durationMinutes: 45,
        summary: 'BFS, Dijkstra, and A* pathfinding in real-world spatial networks.',
        keyTakeaways: ['Choose admissible heuristics for A*', 'Model sparse graphs with adjacency lists'],
      },
      {
        id: 'tok-2',
        title: 'Module 2: Dynamic Programming Foundations',
        durationMinutes: 45,
        summary: 'Memoization and tabulation for overlapping subproblems.',
        keyTakeaways: ['Identify optimal substructure before coding', 'Compress state tables when possible'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which algorithm finds shortest paths in graphs with non-negative edge weights?',
        options: ["Dijkstra's Algorithm", 'Bubble Sort', 'Depth-First Search alone'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Dynamic programming requires which two problem properties?',
        options: ['Optimal substructure and overlapping subproblems', 'Random hashing and recursion depth 1', 'Binary trees only'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'For sparse graphs with many vertices and few edges, which representation saves memory?',
        options: ['Adjacency List', 'Dense Adjacency Matrix', '3D Voxel Array'],
        correctIndex: 0,
      },
    ],
  },

  // Business & Management across US, UK, France, Italy, Hong Kong
  {
    id: 'diploma-mit-business-management',
    title: 'Diploma in Business Management & Analytics',
    majorId: 'business-management',
    instituteId: 'mit-sloan',
    credentialType: 'Diploma',
    level: 'Intermediate',
    durationHours: '10-14 hrs',
    learnersCount: 158400,
    likesCount: 4100,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.business,
    skills: ['Business Management', 'Accounting'],
    overview:
      'Unit economics, capital allocation, competitive strategy, and data-driven executive decision making.',
    outcomes: [
      'Build three-statement financial models and unit-economics dashboards',
      'Evaluate market entry and pricing elasticity decisions quantitatively',
    ],
    modules: [
      {
        id: 'mit-1',
        title: 'Module 1: Unit Economics & Cash Flow',
        durationMinutes: 50,
        summary: 'LTV, CAC, contribution margin, and working capital cycles.',
        keyTakeaways: ['Calculate payback periods accurately', 'Distinguish EBITDA from free cash flow'],
      },
      {
        id: 'mit-2',
        title: 'Module 2: Strategic Competitive Advantage',
        durationMinutes: 45,
        summary: 'Operational moats, switching costs, and network effects.',
        keyTakeaways: ['Map value-chain levers', 'Avoid commoditized price wars'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What does a healthy LTV-to-CAC ratio indicate?',
        options: [
          'Customer lifetime value exceeds acquisition cost sustainably',
          'The company has zero employees',
          'Inventory is never sold',
        ],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Contribution margin equals:',
        options: ['Revenue minus variable costs', 'Total assets plus liabilities', 'Fixed rent divided by staff'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Why is Free Cash Flow tracked separately from Net Income?',
        options: [
          'Net income includes non-cash items and omits capital expenditures',
          'Cash flow ignores customer receipts',
          'They are legally identical',
        ],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-lse-contract-law',
    title: 'International Contract Law & Commercial Agreements',
    majorId: 'business-management',
    instituteId: 'lse-london',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '4-5 hrs',
    learnersCount: 63200,
    likesCount: 2150,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.business,
    skills: ['Contract Law', 'Business Management'],
    overview:
      'Offer, acceptance, consideration, indemnity clauses, breach remedies, and cross-border arbitration principles.',
    outcomes: [
      'Review commercial vendor agreements for liability caps and IP ownership',
      'Recognize conditions that render a contract void or voidable',
    ],
    modules: [
      {
        id: 'lse-1',
        title: 'Module 1: Formation & Enforceability',
        durationMinutes: 40,
        summary: 'Essential elements of binding commercial agreements.',
        keyTakeaways: ['Differentiate invitations to treat from binding offers', 'Verify consideration'],
      },
      {
        id: 'lse-2',
        title: 'Module 2: Risk Allocation & Remedies',
        durationMinutes: 45,
        summary: 'Limitation of liability, force majeure, and liquidated damages.',
        keyTakeaways: ['Draft clear SLA remedies', 'Avoid unenforceable penalty clauses'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which element is essential for a valid contract under common law?',
        options: ['Offer, acceptance, consideration, and intention to create legal relations', 'Handwritten wax seal only', 'Notarized video'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'A Force Majeure clause addresses:',
        options: ['Extraordinary unforeseeable events preventing performance', 'Routine office supply orders', 'Annual salary bonuses'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Limitation of liability clauses typically:',
        options: ['Cap financial exposure to an agreed ceiling', 'Eliminate all legal obligations to deliver', 'Double tax rates'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-bocconi-accounting',
    title: 'Financial Accounting & IFRS Reporting Essentials',
    majorId: 'business-management',
    instituteId: 'bocconi-milan',
    credentialType: 'Certificate',
    level: 'Beginner',
    durationHours: '5-6 hrs',
    learnersCount: 84900,
    likesCount: 2430,
    languages: ['English', 'Italian'],
    thumbnail: COURSE_IMAGES.business,
    skills: ['Accounting', 'Business Management'],
    overview:
      'Double-entry bookkeeping, balance sheets, accrual revenue recognition, and ratio analysis under international IFRS standards.',
    outcomes: [
      'Read and reconcile income statements, balance sheets, and cash flow statements',
      'Compute liquidity, solvency, and profitability ratios accurately',
    ],
    modules: [
      {
        id: 'boc-1',
        title: 'Module 1: The Accounting Equation & Accruals',
        durationMinutes: 45,
        summary: 'Assets = Liabilities + Equity and matching principle mechanics.',
        keyTakeaways: ['Record deferred revenue properly', 'Reconcile trial balances'],
      },
      {
        id: 'boc-2',
        title: 'Module 2: Financial Ratio Diagnostics',
        durationMinutes: 40,
        summary: 'Current ratio, debt-to-equity, and return on invested capital.',
        keyTakeaways: ['Spot working-capital bottlenecks early', 'Benchmark peers consistently'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which equation forms the foundation of the balance sheet?',
        options: ['Assets = Liabilities + Equity', 'Revenue = Expenses + Cash', 'Profit = Debt × Tax'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Under accrual accounting, revenue is recognized when:',
        options: ['Earned through delivery of goods or services', 'A marketing email is opened', 'The bank opens on Monday'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'The Current Ratio measures:',
        options: ['Short-term liquidity to cover obligations due within one year', 'Employee commute distance', 'Long-term patent count'],
        correctIndex: 0,
      },
    ],
  },

  // Leadership & Operations (HKUST, Delft, INSEAD)
  {
    id: 'diploma-hkust-quality-control',
    title: 'Diploma in Quality Control & Lean Six Sigma',
    majorId: 'leadership-operations',
    instituteId: 'hkust-business',
    credentialType: 'Diploma',
    level: 'Intermediate',
    durationHours: '8-10 hrs',
    learnersCount: 71300,
    likesCount: 2040,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.engineering,
    skills: ['Quality Control', 'Lean Six Sigma'],
    overview:
      'Statistical process control (SPC), DMAIC defect reduction, and ISO 9001 operational auditing for manufacturing and service teams.',
    outcomes: [
      'Lead DMAIC improvement cycles from baseline measurement to control plans',
      'Construct control charts to distinguish common-cause from special-cause variation',
    ],
    modules: [
      {
        id: 'qc-1',
        title: 'Module 1: DMAIC & Root Cause Analysis',
        durationMinutes: 45,
        summary: 'Define, Measure, Analyze, Improve, Control using 5-Whys and Fishbone diagrams.',
        keyTakeaways: ['Quantify defect rates in DPMO', 'Eliminate non-value-adding process waste'],
      },
      {
        id: 'qc-2',
        title: 'Module 2: Statistical Process Control',
        durationMinutes: 45,
        summary: 'Control limits versus specification limits and capability indices.',
        keyTakeaways: ['Interpret Cp and Cpk capability metrics', 'Sustain gains with standard work'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'What does DMAIC stand for in Six Sigma?',
        options: [
          'Define, Measure, Analyze, Improve, Control',
          'Design, Market, Advertise, Invoice, Close',
          'Deploy, Monitor, Archive, Ignore, Cancel',
        ],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'A Fishbone (Ishikawa) diagram is primarily used to:',
        options: ['Categorize potential root causes of a quality defect', 'Calculate quarterly tax', 'Schedule vacation days'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Special-cause variation on a control chart indicates:',
        options: ['An unusual external factor requiring investigation', 'Normal baseline stability', 'Zero defects'],
        correctIndex: 0,
      },
    ],
  },

  // Engineering across Switzerland, Netherlands, South Korea
  {
    id: 'diploma-eth-structural-engineering',
    title: 'Diploma in Structural Mechanics & Bridge Design',
    majorId: 'engineering-construction',
    instituteId: 'eth-zurich',
    credentialType: 'Diploma',
    level: 'Advanced',
    durationHours: '12-15 hrs',
    learnersCount: 48200,
    likesCount: 1930,
    languages: ['English', 'German'],
    thumbnail: COURSE_IMAGES.engineering,
    skills: ['Structural Analysis', 'Sustainable Energy'],
    overview:
      'Statics, bending moment diagrams, prestressed concrete, and low-carbon bridge construction principles from ETH Zurich.',
    outcomes: [
      'Compute shear force and bending moment envelopes for determinate spans',
      'Evaluate lifecycle carbon trade-offs across steel, timber, and concrete',
    ],
    modules: [
      {
        id: 'eth-1',
        title: 'Module 1: Load Paths & Bending Moments',
        durationMinutes: 50,
        summary: 'Dead loads, live traffic loads, wind shear, and equilibrium checks.',
        keyTakeaways: ['Draw accurate shear and moment diagrams', 'Apply partial safety factors'],
      },
      {
        id: 'eth-2',
        title: 'Module 2: Low-Carbon Structural Materials',
        durationMinutes: 45,
        summary: 'Engineered mass timber and supplementary cementitious mixes.',
        keyTakeaways: ['Calculate embodied carbon per span meter', 'Design durable moisture barriers'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Where does maximum bending moment typically occur on a simply supported beam under uniform load?',
        options: ['At mid-span', 'At the free overhang only', 'Zero everywhere'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Embodied carbon in construction refers to:',
        options: [
          'Emissions from material extraction, manufacturing, and transport',
          'Building thermostat settings only',
          'Landscape grass mowing',
        ],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Why are partial safety factors applied in structural codes?',
        options: ['To account for uncertainties in loads and material strength', 'To reduce blueprint font size', 'To speed up concrete curing'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-delft-circular-construction',
    title: 'Circular Construction & Coastal Infrastructure',
    majorId: 'engineering-construction',
    instituteId: 'tu-delft',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '4-5 hrs',
    learnersCount: 31500,
    likesCount: 1120,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.engineering,
    skills: ['Structural Analysis', 'Workplace Safety'],
    overview:
      'Modular design for disassembly, flood-resilient urban civil works, and lifecycle material passports.',
    outcomes: [
      'Design reversible structural joints for building material reuse',
      'Assess nature-based coastal flood protection strategies',
    ],
    modules: [
      {
        id: 'del-1',
        title: 'Module 1: Design for Disassembly',
        durationMinutes: 40,
        summary: 'Reversible fasteners and digital material passports.',
        keyTakeaways: ['Avoid permanent composite adhesives where bolted joints work', 'Catalog structural grades'],
      },
      {
        id: 'del-2',
        title: 'Module 2: Resilient Water & Coastal Works',
        durationMinutes: 40,
        summary: 'Dikes, permeable pavements, and urban retention basins.',
        keyTakeaways: ['Combine grey infrastructure with wetland buffers', 'Model 100-year storm surges'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Design for Disassembly enables:',
        options: ['Recovery and reuse of structural components at end-of-life', 'Single-use demolition', 'Heavier foundations'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Permeable urban paving helps cities primarily by:',
        options: ['Absorbing stormwater runoff and reducing flash flooding', 'Increasing tire wear', 'Blocking groundwater recharge'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'A Material Passport documents:',
        options: ['Composition, dimensions, and reuse history of building elements', 'Visitor entry badges', 'Utility electricity bills'],
        correctIndex: 0,
      },
    ],
  },

  // Sales & Marketing (INSEAD, NUS)
  {
    id: 'cert-insead-digital-marketing',
    title: 'Digital Marketing, SEO & Growth Analytics',
    majorId: 'sales-marketing',
    instituteId: 'insead-france',
    credentialType: 'Certificate',
    level: 'Beginner',
    durationHours: '4-6 hrs',
    learnersCount: 95400,
    likesCount: 2780,
    languages: ['English', 'French', 'Spanish'],
    thumbnail: COURSE_IMAGES.business,
    skills: ['Digital Marketing', 'SEO Analytics'],
    overview:
      'Search intent architecture, conversion attribution, ethical retention loops, and paid acquisition testing.',
    outcomes: [
      'Audit technical SEO and content-intent alignment across funnels',
      'Run statistically valid A/B experiments on landing pages',
    ],
    modules: [
      {
        id: 'mkt-1',
        title: 'Module 1: Search Intent & Content Architecture',
        durationMinutes: 40,
        summary: 'Mapping informational, commercial, and transactional queries.',
        keyTakeaways: ['Structure semantic topic clusters', 'Eliminate cannibalized keywords'],
      },
      {
        id: 'mkt-2',
        title: 'Module 2: Funnel Attribution & Experimentation',
        durationMinutes: 40,
        summary: 'Cohort retention analysis and statistically powered A/B tests.',
        keyTakeaways: ['Define clear primary conversion hypotheses', 'Calculate minimum sample sizes'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Why should an A/B test reach its pre-calculated sample size before stopping?',
        options: ['To avoid false positives from early random variance', 'To double server costs', 'To hide results'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Informational search queries typically indicate a user is:',
        options: ['Researching concepts before comparing specific vendors', 'Entering credit card details', 'Resetting a password'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Cohort retention tracking measures:',
        options: ['How well users from a given signup period stay active over time', 'Total page word count', 'Server fan speed'],
        correctIndex: 0,
      },
    ],
  },

  // Teaching & Academics (Helsinki, Harvard Ed)
  {
    id: 'diploma-helsinki-pedagogy',
    title: 'Diploma in Modern Pedagogy & Curriculum Design',
    majorId: 'teaching-academics',
    instituteId: 'helsinki-pedagogy',
    credentialType: 'Diploma',
    level: 'Intermediate',
    durationHours: '8-11 hrs',
    learnersCount: 54120,
    likesCount: 1950,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.campus,
    skills: ['Curriculum Design', 'Classroom Pedagogy'],
    overview:
      'Phenomenon-based learning, formative feedback loops, and Universal Design for Learning (UDL) from Finnish education researchers.',
    outcomes: [
      'Construct backward-design unit plans tied to clear mastery rubrics',
      'Use low-stakes formative checks to personalize classroom pacing',
    ],
    modules: [
      {
        id: 'hel-1',
        title: 'Module 1: Backward Design & Learning Rubrics',
        durationMinutes: 45,
        summary: 'Starting from enduring understandings and authentic assessments.',
        keyTakeaways: ['Align activities directly to mastery criteria', 'Publish transparent rubrics'],
      },
      {
        id: 'hel-2',
        title: 'Module 2: Universal Design for Learning (UDL)',
        durationMinutes: 45,
        summary: 'Multiple means of representation, expression, and engagement.',
        keyTakeaways: ['Remove unnecessary sensory barriers', 'Scaffold executive function'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'In Backward Design, what does the educator define first?',
        options: ['Desired learning outcomes and evidence of mastery', 'Final exam font', 'Seating chart'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'Formative assessment is primarily used to:',
        options: ['Adjust instruction during learning based on student progress', 'Rank schools nationally', 'Replace all classroom discussion'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Universal Design for Learning encourages offering:',
        options: ['Multiple pathways to access material and demonstrate knowledge', 'One rigid lecture format only', 'Zero feedback'],
        correctIndex: 0,
      },
    ],
  },

  // Languages & English (Cervantes, Goethe, Trinity)
  {
    id: 'cert-cervantes-business-spanish',
    title: 'Professional Spanish for Global Workplaces',
    majorId: 'languages-applied',
    instituteId: 'cervantes-madrid',
    credentialType: 'Certificate',
    level: 'Beginner',
    durationHours: '5-6 hrs',
    learnersCount: 68900,
    likesCount: 1840,
    languages: ['English', 'Spanish'],
    thumbnail: COURSE_IMAGES.campus,
    skills: ['Business Spanish', 'Cross-Cultural Comm'],
    overview:
      'Essential workplace Spanish for client onboarding, healthcare triage, scheduling, and formal correspondence.',
    outcomes: [
      'Conduct polite client greetings, scheduling, and follow-ups in Spanish',
      'Navigate formal usted vs informal tú registers accurately',
    ],
    modules: [
      {
        id: 'esp-1',
        title: 'Module 1: Formal Registers & Introductions',
        durationMinutes: 35,
        summary: 'Using usted professionally across Latin America and Spain.',
        keyTakeaways: ['Master formal email openings and closings', 'Confirm meeting times clearly'],
      },
      {
        id: 'esp-2',
        title: 'Module 2: Client & Patient Triage Phrases',
        durationMinutes: 40,
        summary: 'Practical dialogue templates for service and clinical teams.',
        keyTakeaways: ['Ask clarifying questions politely', 'Summarize next steps accurately'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which pronoun is standard for formal business introductions in Spanish?',
        options: ['Usted', 'Vosotros', 'Ellos'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'How do you politely say "Nice to meet you" in a formal meeting?',
        options: ['Mucho gusto en conocerle', 'Hasta luego', 'Buenos días ayer'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Which phrase confirms an appointment time?',
        options: ['¿Confirmamos la cita para las diez?', '¿Dónde está el libro?', 'Muchas gracias por nada'],
        correctIndex: 0,
      },
    ],
  },
  {
    id: 'cert-trinity-academic-english',
    title: 'Academic English & Executive Writing Precision',
    majorId: 'english-communication',
    instituteId: 'trinity-dublin',
    credentialType: 'Certificate',
    level: 'Intermediate',
    durationHours: '4-5 hrs',
    learnersCount: 49300,
    likesCount: 1620,
    languages: ['English'],
    thumbnail: COURSE_IMAGES.campus,
    skills: ['Academic Writing', 'Business English'],
    overview:
      'Clarity-first sentence structure, cohesive paragraph transitions, active voice mastery, and executive brief editing.',
    outcomes: [
      'Eliminate nominalizations and bloated passive constructions',
      'Structure persuasive analytical arguments for international readers',
    ],
    modules: [
      {
        id: 'eng-1',
        title: 'Module 1: Clarity & Active Syntax',
        durationMinutes: 35,
        summary: 'Putting concrete actors in grammatical subject positions.',
        keyTakeaways: ['Cut redundant prepositional chains', 'Prefer crisp verbs over noun phrases'],
      },
      {
        id: 'eng-2',
        title: 'Module 2: Cohesion & Executive Summaries',
        durationMinutes: 40,
        summary: 'Known-new information chaining and pyramid-principle openings.',
        keyTakeaways: ['Lead with the core conclusion first', 'Use parallel structure in lists'],
      },
    ],
    quiz: [
      {
        id: 'q1',
        prompt: 'Which sentence demonstrates clearer, active business writing?',
        options: [
          'The engineering team deployed the update on Tuesday.',
          'An update deployment was undertaken on Tuesday by the team.',
          'There was a deployment of an update occurring.',
        ],
        correctIndex: 0,
      },
      {
        id: 'q2',
        prompt: 'In an executive brief, the Pyramid Principle recommends placing the key takeaway:',
        options: ['At the very beginning', 'Only in Appendix D', 'In a footnote'],
        correctIndex: 0,
      },
      {
        id: 'q3',
        prompt: 'Parallel structure in bulleted lists means:',
        options: ['Starting each item with the same grammatical form', 'Alternating fonts every line', 'Using different tenses in each bullet'],
        correctIndex: 0,
      },
    ],
  },
];

export const POPULAR_SKILLS = [
  'Information Systems',
  'Health Care',
  'Business Management',
  'Contract Law',
  'Accounting',
  'Quality Control',
  'Digital Marketing',
  'Python Programming',
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Omobolanle Akinlabi',
    country: 'Nigeria',
    role: 'Legal Practitioner',
    majorId: 'business-management',
    quote: 'With AMii, you want to take a new course everytime.',
    highlight: 'everytime',
    outcome: 'Completed 4 commercial law certificates and expanded corporate advisory practice in Lagos.',
  },
  {
    id: 't2',
    name: 'Sophia Gomez',
    country: 'United States',
    role: 'Chemical Engineer',
    majorId: 'engineering-construction',
    quote: "AMii's helped me find my purpose.",
    highlight: 'me',
    outcome: 'Transitioned into sustainable plant safety auditing after completing the Workplace Safety Diploma.',
  },
  {
    id: 't3',
    name: 'Adams Jepherson Ledix',
    country: 'Mexico',
    role: 'Civil Engineer',
    majorId: 'engineering-construction',
    quote: 'I am employed because of AMii.',
    highlight: 'employed',
    outcome: 'Earned structural mechanics credentials across ETH Zurich & Delft modules within the same branch.',
  },
  {
    id: 't4',
    name: 'Priya Subramanian',
    country: 'Singapore',
    role: 'Cloud Systems Analyst',
    majorId: 'computer-science-it',
    quote: 'Having Stanford, TUM, and NUS inside one Computer Science branch saved me months of searching.',
    highlight: 'one Computer Science branch',
    outcome: 'Promoted to Senior Infrastructure Analyst after completing 3 cross-border IT diplomas.',
  },
  {
    id: 't5',
    name: 'Claire Lindqvist',
    country: 'Sweden',
    role: 'Community Nurse Lead',
    majorId: 'health-nursing',
    quote: 'Comparing clinical protocols from London, Toronto, and Stockholm in one major branch is transformative.',
    highlight: 'transformative',
    outcome: 'Standardized patient handover checklists across a 140-bed regional clinic.',
  },
  {
    id: 't6',
    name: 'Daniel Osei',
    country: 'United Kingdom',
    role: 'Secondary STEM Educator',
    majorId: 'teaching-academics',
    quote: 'The Helsinki pedagogy modules completely reshaped how I structure classroom rubrics.',
    highlight: 'reshaped',
    outcome: 'Raised student mastery pass rates by 28% over two academic terms.',
  },
];

export const COUNTRIES_LIST = [
  'United States',
  'United Kingdom',
  'Canada',
  'Germany',
  'Singapore',
  'Japan',
  'Australia',
  'Switzerland',
  'Sweden',
  'France',
  'Italy',
  'Netherlands',
  'South Korea',
  'Finland',
  'Ireland',
  'Spain',
  'Nigeria',
  'Mexico',
  'India',
  'Brazil',
];
