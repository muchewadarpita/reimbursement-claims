import dotenv from 'dotenv';
import { connectDatabase } from '../config/database';
import { Code } from '../models/Code';

dotenv.config();

const seedData = [
  {
    code: '36903',
    description: 'Dialysis circuit intervention with stent placement',
    category: 'Vascular Access',
    payments: {
      IPPS: 12485,
      HOPD: 11639,
      ASC: 7650,
      OBL: 3845,
    },
    drg: '263',
    apc: '5192',
  },
  {
    code: '37236',
    description: 'Transcatheter placement of intravascular stent(s), open or percutaneous',
    category: 'Vascular Interventions',
    payments: {
      IPPS: 15230,
      HOPD: 13845,
      ASC: 9120,
      OBL: 4567,
    },
    apc: '5193',
  },
  {
    code: '33361',
    description: 'Transcatheter aortic valve replacement (TAVR)',
    category: 'Cardiac Procedures',
    payments: {
      IPPS: 42890,
      HOPD: 39456,
      ASC: 0,
      OBL: 0,
    },
    drg: '266',
  },
  {
    code: '92928',
    description: 'Percutaneous transcatheter placement of intracoronary stent(s)',
    category: 'Cardiac Interventions',
    payments: {
      IPPS: 18765,
      HOPD: 16234,
      ASC: 11450,
      OBL: 5678,
    },
    drg: '247',
    apc: '5194',
  },
  {
    code: '43235',
    description: 'Esophagogastroduodenoscopy with biopsy',
    category: 'Endoscopy',
    payments: {
      IPPS: 3456,
      HOPD: 2987,
      ASC: 1890,
      OBL: 987,
    },
    apc: '5301',
  },
  {
    code: '27447',
    description: 'Total knee arthroplasty',
    category: 'Orthopedic',
    payments: {
      IPPS: 16543,
      HOPD: 14789,
      ASC: 12345,
      OBL: 0,
    },
    drg: '470',
  },
];

async function seed() {
  try {
    await connectDatabase();

    // Clear existing codes
    await Code.deleteMany({});
    console.log('🗑️  Cleared existing codes');

    // Insert seed data
    await Code.insertMany(seedData);
    console.log(`✅ Seeded ${seedData.length} codes`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error);
    process.exit(1);
  }
}

seed();

