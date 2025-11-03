// Schools and their departments structure
export const MEKELLE_UNIVERSITY_SCHOOLS = {
  "School of Business and Economics": [
    "Accounting",
    "Economics",
    "Management",
    "Finance",
    "Marketing"
  ],
  "School of Agriculture and Natural Resources": [
    "Agriculture",
    "Natural Resources Management",
    "Dryland Agriculture",
    "Environmental Science"
  ],
  "School of Law and Governance": [
    "Law",
    "Public Administration",
    "Political Science",
    "International Relations"
  ],
  "School of Social Sciences and Languages": [
    "Sociology",
    "Psychology",
    "Linguistics",
    "Anthropology",
    "History",
  ],
  "School of Natural and Computational Sciences": [
    "Medical Radiologic Technology",
    "Physiotherapy",
    "Medical Laboratory Sciences",
    "Biotechnology",
    "Pediatrics and Child Health",
    "Natural Resource Economics and Management",
    "Wildlife and Eco-tourism Management",  
    "Enviromental Health",  
    "Food Science and Post Harvest Technology",    
    "Horticulture",  
    "Information Science" , 
    "Water Resources and Irrigation Management",  
    "Forest and Nature Conservation",  
    "Soil Resources and Watershed Management",  
    "Applied Geology",  
    "Rural Development and Agricultural Extension",    
    "Animal Production and Technology",  
    "Plant Science",  
    "Petroleum Engineering",  
    "Sport Science",  
    "Educational Planning and Managment",  
    "Biology",  
    "Mathematics",   
    "Physics",  
    "Chemistry" , 
    "Statistics",  
    "Comprehensive Nursing",  
    "Midwifery",  
    "Agricultural Economics",           
    "Health Informatics",  
    "Biology Laboratory Technology",  
    "Surgical Nursing",   
    "Emergency & Critical Care Nursing",  
    "Psychiatry",  
    "VETERINARY LABORATORY TECHNOLOGY",  
    "Veterinary Pharmacy",  
    "Veterinary Science"  
  ],
  "School of EiTm": [
  "Computer Science",
  "Software Engineering",
  "Information Systems",
  "Information Technology",
  "Civil Engineering",
  "Electrical Engineering",
  "Mechanical Engineering",
  "Architecture",
  "Urban Planning and Design",
  "Environmental Engineering",
  "Manufacturing Engineering",
  "Industrial Engineering",
  "Water Resource and Irrigation Engineering",
  "Land and Real Property Valuation",
  "Construction Technology and Management",
  "Garment Engineering"
],
  "School of Health Sciences": [
    "Medicine",
    "Nursing",
    "Public Health",
    "Pharmacy",
    "Biomedical Sciences"
  ],
  "School of Veterinary Science": [
    "Veterinary Medicine",
    "Veterinary Public Health",
    "Animal Science"
  ]
} as const;

export type School = keyof typeof MEKELLE_UNIVERSITY_SCHOOLS;
export type Department = typeof MEKELLE_UNIVERSITY_SCHOOLS[School][number]; 
