-- db/seed/demo-data.sql
-- Demo data for HHI Client Notification Dashboard

-- Insert Project Stages
INSERT INTO project_stages (stage_number, stage_name, folder_name, auto_advance, reminder_days) VALUES
(1, 'Client to Measure', '01_Client_to_Measure', false, null),
(2, 'Measurement Complete', '02_Measurement_Complete', false, null),
(3, 'Quote Complete', '03_Quote_Complete', false, null),
(4, 'Contract for Approval', '04_Contract_for_Approval', false, null),
(5, 'Material Ordered', '05_Material_Ordered', false, null),
(6, 'Material Arrived', '06_Material_Arrived', false, null),
(7, 'Installation Scheduled', '07_Installation_Scheduled', false, null),
(8, 'Client Confirmed Date', '08_Client_Confirmed_Date', false, null),
(9, 'Pre Installation Reminder', '09_Pre_Installation_Reminder', true, 3),
(10, 'Invoice Sent', '10_Invoice_Sent', true, 0),
(11, 'Feedback Requested', '11_Feedback_Requested', true, 2),
(12, 'Project Complete', '12_Project_Complete', false, null);

-- Insert Demo Projects (London Branch)
INSERT INTO projects (
  organization_id, client_name, client_email, client_phone, client_address, 
  service_type, project_value, current_stage, branch_location,
  assigned_installer_id, contract_file_name, measurement_date,
  installation_date, created_at, updated_at
) VALUES 
(
  'org_demo_hhi', 'Sarah Johnson', 'sarah.johnson@email.com', '+44 20 7123 4567', 
  '123 Victoria Street, London SW1E 6DE', 'kitchen', 8500.00, 7, 'london',
  'installer_mike_thompson', 'Sarah_Johnson_Kitchen.pdf', 
  '2025-01-16 10:00:00', '2025-01-25 09:00:00',
  '2025-01-10 09:00:00', '2025-01-20 14:30:00'
),
(
  'org_demo_hhi', 'David Wilson', 'd.wilson@outlook.com', '+44 20 7234 5678',
  '456 Baker Street, London NW1 6XE', 'bathroom', 12300.00, 4, 'london',
  'installer_emma_davies', 'David_Wilson_Bathroom.pdf',
  '2025-01-15 14:00:00', null,
  '2025-01-12 11:15:00', '2025-01-18 16:45:00'
),
(
  'org_demo_hhi', 'Lisa Chen', 'lisa.chen.home@gmail.com', '+44 20 7345 6789',
  '789 Oxford Street, London W1C 1DX', 'kitchen', 15750.00, 2, 'london',
  'installer_mike_thompson', 'Lisa_Chen_Kitchen.pdf',
  '2025-01-16 11:30:00', null,
  '2025-01-14 08:20:00', '2025-01-17 10:15:00'
),
(
  'org_demo_hhi', 'James Patterson', 'j.patterson@homeowner.co.uk', '+44 20 7456 7890',
  '321 Regent Street, London W1B 3HH', 'bathroom', 9800.00, 3, 'london',
  'installer_emma_davies', 'James_Patterson_Bathroom.pdf',
  '2025-01-14 09:00:00', null,
  '2025-01-11 13:45:00', '2025-01-16 12:30:00'
);

-- Insert Demo Projects (Manchester Branch)
INSERT INTO projects (
  organization_id, client_name, client_email, client_phone, client_address,
  service_type, project_value, current_stage, branch_location,
  assigned_installer_id, contract_file_name, installation_date,
  created_at, updated_at
) VALUES
(
  'org_demo_hhi', 'Robert Taylor', 'rob.taylor@company.co.uk', '+44 161 123 4567',
  '321 Deansgate, Manchester M3 4LY', 'kitchen', 9200.00, 9, 'manchester',
  'installer_james_mitchell', 'Robert_Taylor_Kitchen.pdf', '2025-01-22 09:00:00',
  '2025-01-08 14:20:00', '2025-01-19 11:15:00'
),
(
  'org_demo_hhi', 'Helen Parker', 'helen.parker123@yahoo.com', '+44 161 234 5678',
  '654 King Street, Manchester M2 4WU', 'bathroom', 7800.00, 5, 'manchester',
  'installer_sophie_clark', 'Helen_Parker_Bathroom.pdf', null,
  '2025-01-13 16:30:00', '2025-01-19 09:45:00'
),
(
  'org_demo_hhi', 'Tom Anderson', 'tom.anderson@email.com', '+44 161 345 6789',
  '987 Albert Square, Manchester M2 5DB', 'kitchen', 11400.00, 1, 'manchester',
  'installer_james_mitchell', 'Tom_Anderson_Kitchen.pdf', null,
  '2025-01-19 10:15:00', '2025-01-20 08:30:00'
),
(
  'org_demo_hhi', 'Emma Thompson', 'emma.t@residential.com', '+44 161 456 7890',
  '159 Portland Street, Manchester M1 3DF', 'kitchen', 13200.00, 6, 'manchester',
  'installer_sophie_clark', 'Emma_Thompson_Kitchen.pdf', null,
  '2025-01-09 12:00:00', '2025-01-20 15:20:00'
);

-- Insert Demo Projects (Birmingham Branch)
INSERT INTO projects (
  organization_id, client_name, client_email, client_phone, client_address,
  service_type, project_value, current_stage, branch_location,
  assigned_installer_id, contract_file_name, completion_date,
  created_at, updated_at
) VALUES
(
  'org_demo_hhi', 'Maria Garcia', 'maria.garcia@homemail.com', '+44 121 123 4567',
  '159 New Street, Birmingham B2 4JY', 'kitchen', 13600.00, 10, 'birmingham',
  'installer_alex_roberts', 'Maria_Garcia_Kitchen.pdf', '2025-01-19 16:00:00',
  '2025-01-05 11:30:00', '2025-01-19 17:15:00'
),
(
  'org_demo_hhi', 'John Stevens', 'j.stevens@business.com', '+44 121 234 5678',
  '753 Corporation Street, Birmingham B4 6RG', 'bathroom', 6900.00, 6, 'birmingham',
  'installer_rachel_green', 'John_Stevens_Bathroom.pdf', null,
  '2025-01-15 09:45:00', '2025-01-20 13:10:00'
),
(
  'org_demo_hhi', 'Patricia Williams', 'patricia.w@family.net', '+44 121 345 6789',
  '428 High Street, Birmingham B4 7SL', 'bathroom', 8400.00, 11, 'birmingham',
  'installer_alex_roberts', 'Patricia_Williams_Bathroom.pdf', '2025-01-18 14:30:00',
  '2025-01-07 15:20:00', '2025-01-18 16:45:00'
);

-- Insert Email Templates
INSERT INTO email_templates (
  organization_id, template_name, stage_id, subject, body, variables, is_default, is_active
) VALUES
(
  'org_demo_hhi', 'Measurement Complete Notification', 2,
  'Your Quote is Being Prepared - Premium Home Installations',
  '<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote Preparation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px;">Premium Home Installations</h1>
        <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Quality installations, exceptional service</p>
    </div>
    
    <div style="background: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <h2 style="color: #2c3e50; margin-bottom: 20px;">Thank you for meeting with us!</h2>
        
        <p>Dear [CLIENT_NAME],</p>