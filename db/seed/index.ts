// db/seed/index.ts
import { db } from '../../src/libs/DB';
import { 
  projects, 
  projectStages, 
  emailTemplates,
  projectActivities,
  notifications,
  userPreferences,
  onedriveIntegration 
} from '../../src/models/DashboardSchema';

async function seedDatabase() {
  console.log('🌱 Starting database seeding...');

  try {
    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await db.delete(notifications);
    await db.delete(projectActivities);
    await db.delete(projects);
    await db.delete(emailTemplates);
    await db.delete(projectStages);
    await db.delete(userPreferences);
    await db.delete(onedriveIntegration);

    // Seed project stages
    console.log('📋 Seeding project stages...');
    await db.insert(projectStages).values([
      { stageNumber: 1, stageName: 'Client to Measure', folderName: '01_Client_to_Measure', autoAdvance: false, reminderDays: null },
      { stageNumber: 2, stageName: 'Measurement Complete', folderName: '02_Measurement_Complete', autoAdvance: false, reminderDays: null },
      { stageNumber: 3, stageName: 'Quote Complete', folderName: '03_Quote_Complete', autoAdvance: false, reminderDays: null },
      { stageNumber: 4, stageName: 'Contract for Approval', folderName: '04_Contract_for_Approval', autoAdvance: false, reminderDays: null },
      { stageNumber: 5, stageName: 'Material Ordered', folderName: '05_Material_Ordered', autoAdvance: false, reminderDays: null },
      { stageNumber: 6, stageName: 'Material Arrived', folderName: '06_Material_Arrived', autoAdvance: false, reminderDays: null },
      { stageNumber: 7, stageName: 'Installation Scheduled', folderName: '07_Installation_Scheduled', autoAdvance: false, reminderDays: null },
      { stageNumber: 8, stageName: 'Client Confirmed Date', folderName: '08_Client_Confirmed_Date', autoAdvance: false, reminderDays: null },
      { stageNumber: 9, stageName: 'Pre Installation Reminder', folderName: '09_Pre_Installation_Reminder', autoAdvance: true, reminderDays: 3 },
      { stageNumber: 10, stageName: 'Invoice Sent', folderName: '10_Invoice_Sent', autoAdvance: true, reminderDays: 0 },
      { stageNumber: 11, stageName: 'Feedback Requested', folderName: '11_Feedback_Requested', autoAdvance: true, reminderDays: 2 },
      { stageNumber: 12, stageName: 'Project Complete', folderName: '12_Project_Complete', autoAdvance: false, reminderDays: null },
    ]);

    // Seed demo projects
    console.log('🏠 Seeding demo projects...');
    const demoProjects = [
      // London Branch
      {
        organizationId: 'org_demo_hhi',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah.johnson@email.com',
        clientPhone: '+44 20 7123 4567',
        clientAddress: '123 Victoria Street, London SW1E 6DE',
        serviceType: 'kitchen',
        projectValue: '8500.00',
        currentStage: 7,
        branchLocation: 'london',
        assignedInstallerId: 'installer_mike_thompson',
        contractFileName: 'Sarah_Johnson_Kitchen.pdf',
        measurementDate: new Date('2025-01-16T10:00:00'),
        installationDate: new Date('2025-01-25T09:00:00'),
        createdAt: new Date('2025-01-10T09:00:00'),
        updatedAt: new Date('2025-01-20T14:30:00'),
      }
    ];

    // Insert projects
    await db.insert(projects).values(demoProjects);
    
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  seedDatabase();
}
