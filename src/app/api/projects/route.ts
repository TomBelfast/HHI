// src/app/api/projects/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { ProjectService } from '@/libs/ProjectService';

export async function GET() {
  try {
    // For demo purposes - return static data
    const demoOrgId = 'org_demo_hhi';

    const projects = [
      {
        id: 'bbad0552-883c-4d56-942f-3c2736fe7728',
        organizationId: 'org_demo_hhi',
        clientName: 'Sarah Johnson',
        clientEmail: 'sarah.johnson@email.com',
        clientPhone: '+44 28 9024 1234',
        clientAddress: '12 Donegall Square North, Belfast BT1 5GB',
        serviceType: 'kitchen',
        projectValue: 8500.00,
        currentStage: 7,
        installationDate: '2025-01-25T09:00:00.000Z',
        branchLocation: 'belfast',
        assignedInstallerId: 'installer_mike_thompson',
        contractFileName: 'Sarah_Johnson_Kitchen.pdf',
        createdAt: '2025-01-10T09:00:00.000Z',
        updatedAt: '2025-01-20T14:30:00.000Z',
      },
      {
        id: 'ba5fb419-83ad-4815-bc05-8d9a16265ae4',
        organizationId: 'org_demo_hhi',
        clientName: 'David Wilson',
        clientEmail: 'd.wilson@outlook.com',
        clientPhone: '+44 28 9024 5678',
        clientAddress: '45 Royal Avenue, Belfast BT1 1DA',
        serviceType: 'bathroom',
        projectValue: 12300.00,
        currentStage: 4,
        measurementDate: '2025-01-15T14:00:00.000Z',
        branchLocation: 'belfast',
        assignedInstallerId: 'installer_emma_davies',
        contractFileName: 'David_Wilson_Bathroom.pdf',
        createdAt: '2025-01-12T11:15:00.000Z',
        updatedAt: '2025-01-18T16:45:00.000Z',
      },
      {
        id: '0220a2df-d777-4a4f-abb0-1c53c0a75abf',
        organizationId: 'org_demo_hhi',
        clientName: 'Lisa Chen',
        clientEmail: 'lisa.chen.home@gmail.com',
        clientPhone: '+44 28 9024 9012',
        clientAddress: '78 Castle Street, Belfast BT1 1HH',
        serviceType: 'kitchen',
        projectValue: 15750.00,
        currentStage: 2,
        measurementDate: '2025-01-16T11:30:00.000Z',
        branchLocation: 'belfast',
        assignedInstallerId: 'installer_mike_thompson',
        contractFileName: 'Lisa_Chen_Kitchen.pdf',
        createdAt: '2025-01-14T08:20:00.000Z',
        updatedAt: '2025-01-17T10:15:00.000Z',
      },
      {
        id: '71c9f199-4785-4779-894e-c7ce2530472a',
        organizationId: 'org_demo_hhi',
        clientName: 'James Patterson',
        clientEmail: 'j.patterson@homeowner.co.uk',
        clientPhone: '+44 28 9024 3456',
        clientAddress: '23 Great Victoria Street, Belfast BT2 7BQ',
        serviceType: 'bathroom',
        projectValue: 9800.00,
        currentStage: 3,
        measurementDate: '2025-01-14T09:00:00.000Z',
        branchLocation: 'belfast',
        assignedInstallerId: 'installer_emma_davies',
        contractFileName: 'James_Patterson_Bathroom.pdf',
        createdAt: '2025-01-11T13:45:00.000Z',
        updatedAt: '2025-01-16T12:30:00.000Z',
      },
      {
        id: 'd1a0ef66-3db8-4896-bd91-a169446429b0',
        organizationId: 'org_demo_hhi',
        clientName: 'Emma Thompson',
        clientEmail: 'emma.t@residential.com',
        clientPhone: '+44 28 9267 3456',
        clientAddress: '34 Hillsborough Road, Lisburn BT28 1JN',
        serviceType: 'kitchen',
        projectValue: 13200.00,
        currentStage: 6,
        branchLocation: 'lisburn',
        assignedInstallerId: 'installer_sophie_clark',
        contractFileName: 'Emma_Thompson_Kitchen.pdf',
        createdAt: '2025-01-09T12:00:00.000Z',
        updatedAt: '2025-01-20T15:20:00.000Z',
      },
      {
        id: 'ea97e3c2-b651-4491-a3f8-b57b9e06bea6',
        organizationId: 'org_demo_hhi',
        clientName: 'Robert Taylor',
        clientEmail: 'rob.taylor@company.co.uk',
        clientPhone: '+44 28 9267 1234',
        clientAddress: '15 Bow Street, Lisburn BT28 1BN',
        serviceType: 'kitchen',
        projectValue: 9200.00,
        currentStage: 9,
        installationDate: '2025-01-22T09:00:00.000Z',
        branchLocation: 'lisburn',
        assignedInstallerId: 'installer_james_mitchell',
        contractFileName: 'Robert_Taylor_Kitchen.pdf',
        createdAt: '2025-01-08T14:20:00.000Z',
        updatedAt: '2025-01-19T11:15:00.000Z',
      },
      {
        id: 'f3c70edc-733a-4a78-aaae-efc0bd4695a3',
        organizationId: 'org_demo_hhi',
        clientName: 'Helen Parker',
        clientEmail: 'helen.parker123@yahoo.com',
        clientPhone: '+44 28 9267 5678',
        clientAddress: '67 Market Square, Lisburn BT28 1AG',
        serviceType: 'bathroom',
        projectValue: 7800.00,
        currentStage: 5,
        branchLocation: 'lisburn',
        assignedInstallerId: 'installer_sophie_clark',
        contractFileName: 'Helen_Parker_Bathroom.pdf',
        createdAt: '2025-01-13T16:30:00.000Z',
        updatedAt: '2025-01-19T09:45:00.000Z',
      },
      {
        id: '6fc5d521-01e8-450b-b2c0-6b464ef2d06e',
        organizationId: 'org_demo_hhi',
        clientName: 'Tom Anderson',
        clientEmail: 'tom.anderson@email.com',
        clientPhone: '+44 28 9267 9012',
        clientAddress: '89 Castle Gardens, Lisburn BT27 4XE',
        serviceType: 'kitchen',
        projectValue: 11400.00,
        currentStage: 1,
        branchLocation: 'lisburn',
        assignedInstallerId: 'installer_james_mitchell',
        contractFileName: 'Tom_Anderson_Kitchen.pdf',
        createdAt: '2025-01-19T10:15:00.000Z',
        updatedAt: '2025-01-20T08:30:00.000Z',
      },
      {
        id: 'ea4e1617-00e4-412d-b6c9-e382b4f34c22',
        organizationId: 'org_demo_hhi',
        clientName: 'Maria Garcia',
        clientEmail: 'maria.garcia@homemail.com',
        clientPhone: '+44 28 9147 1234',
        clientAddress: '56 Main Street, Bangor BT20 4AG',
        serviceType: 'kitchen',
        projectValue: 13600.00,
        currentStage: 10,
        completionDate: '2025-01-19T16:00:00.000Z',
        branchLocation: 'bangor',
        assignedInstallerId: 'installer_alex_roberts',
        contractFileName: 'Maria_Garcia_Kitchen.pdf',
        createdAt: '2025-01-05T11:30:00.000Z',
        updatedAt: '2025-01-19T17:15:00.000Z',
      },
      {
        id: 'ef0b6391-42d5-4a19-b9a3-f216fa08c772',
        organizationId: 'org_demo_hhi',
        clientName: 'Patricia Williams',
        clientEmail: 'patricia.w@family.net',
        clientPhone: '+44 28 9147 9012',
        clientAddress: '78 Castle Park Avenue, Bangor BT20 4TD',
        serviceType: 'bathroom',
        projectValue: 8400.00,
        currentStage: 11,
        completionDate: '2025-01-18T14:30:00.000Z',
        branchLocation: 'bangor',
        assignedInstallerId: 'installer_alex_roberts',
        contractFileName: 'Patricia_Williams_Bathroom.pdf',
        createdAt: '2025-01-07T15:20:00.000Z',
        updatedAt: '2025-01-18T16:45:00.000Z',
      },
      {
        id: '3af38a81-599b-4ac1-8122-39ecfd0458f0',
        organizationId: 'org_demo_hhi',
        clientName: 'John Stevens',
        clientEmail: 'j.stevens@business.com',
        clientPhone: '+44 28 9147 5678',
        clientAddress: '12 High Street, Bangor BT20 5AY',
        serviceType: 'bathroom',
        projectValue: 6900.00,
        currentStage: 6,
        branchLocation: 'bangor',
        assignedInstallerId: 'installer_rachel_green',
        contractFileName: 'John_Stevens_Bathroom.pdf',
        createdAt: '2025-01-15T09:45:00.000Z',
        updatedAt: '2025-01-20T13:10:00.000Z',
      },
      {
        id: 'b39f9971-06e5-4d5f-9c3c-b90ebdf67b6a',
        organizationId: 'org_demo_hhi',
        clientName: 'Michael O\'Connor',
        clientEmail: 'michael.oconnor@email.com',
        clientPhone: '+44 28 9085 1234',
        clientAddress: '45 Abbey Centre, Newtownabbey BT37 9UH',
        serviceType: 'kitchen',
        projectValue: 14200.00,
        currentStage: 3,
        branchLocation: 'newtownabbey',
        assignedInstallerId: 'installer_mike_thompson',
        contractFileName: 'Michael_OConnor_Kitchen.pdf',
        createdAt: '2025-07-09T12:06:34.179Z',
        updatedAt: '2025-07-12T12:06:34.179Z',
      },
      {
        id: 'aa344a8c-6710-4947-8b95-b1c7f7c0955e',
        organizationId: 'org_demo_hhi',
        clientName: 'Aoife Murphy',
        clientEmail: 'aoife.murphy@homemail.com',
        clientPhone: '+44 28 9085 5678',
        clientAddress: '23 Carnmoney Road, Newtownabbey BT36 6HX',
        serviceType: 'bathroom',
        projectValue: 8900.00,
        currentStage: 8,
        branchLocation: 'newtownabbey',
        assignedInstallerId: 'installer_emma_davies',
        contractFileName: 'Aoife_Murphy_Bathroom.pdf',
        createdAt: '2025-07-06T12:06:34.179Z',
        updatedAt: '2025-07-13T12:06:34.179Z',
      },
      {
        id: '8359d52d-8027-4996-a0f8-a547745440db',
        organizationId: 'org_demo_hhi',
        clientName: 'Seamus Kelly',
        clientEmail: 'seamus.kelly@business.co.uk',
        clientPhone: '+44 28 7034 1234',
        clientAddress: '12 The Diamond, Coleraine BT52 1QD',
        serviceType: 'kitchen',
        projectValue: 11800.00,
        currentStage: 5,
        branchLocation: 'coleraine',
        assignedInstallerId: 'installer_james_mitchell',
        contractFileName: 'Seamus_Kelly_Kitchen.pdf',
        createdAt: '2025-07-08T12:06:34.179Z',
        updatedAt: '2025-07-11T12:06:34.179Z',
      },
      {
        id: 'f69635de-bca7-4c25-8354-4b4be3d50970',
        organizationId: 'org_demo_hhi',
        clientName: 'Ciara Donnelly',
        clientEmail: 'ciara.donnelly@family.net',
        clientPhone: '+44 28 7034 5678',
        clientAddress: '67 Causeway Street, Coleraine BT51 3AD',
        serviceType: 'bathroom',
        projectValue: 7600.00,
        currentStage: 1,
        branchLocation: 'coleraine',
        assignedInstallerId: 'installer_sophie_clark',
        contractFileName: 'Ciara_Donnelly_Bathroom.pdf',
        createdAt: '2025-07-12T12:06:34.179Z',
        updatedAt: '2025-07-13T12:06:34.179Z',
      }
    ];

    return NextResponse.json({ 
      projects,
      total: projects.length,
      organizationId: demoOrgId
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // For demo purposes - skip auth and use demo data
    const demoOrgId = 'org_demo_hhi';

    const projectData = await request.json();
    
    // Validate required fields
    const requiredFields = ['clientName', 'clientEmail', 'serviceType'];
    for (const field of requiredFields) {
      if (!projectData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new project
    const projectService = new ProjectService();
    const newProject = await projectService.createProject({
      ...projectData,
      organizationId: demoOrgId,
    });

    return NextResponse.json({ 
      project: newProject,
      message: 'Project created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
