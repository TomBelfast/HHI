import { NextResponse } from 'next/server';
import { mockProjects, mockAnalytics } from '@/lib/mock-data';

interface TimelineEvent {
  date: string;
  status: string;
  note: string;
  type?: string;
}

interface Complaint {
  id: string;
  status: string;
  issue: string;
  submittedDate: string;
  resolvedDate?: string;
  resolution?: string;
  customerRating?: number;
}

interface Project {
  id: string;
  customerId: string;
  title: string;
  category: string;
  status: string;
  branch: string;
  department: string;
  assignedWorker: string;
  subcontractor?: string;
  value: number;
  createdDate: string;
  measurementDate?: string;
  quoteSentDate?: string;
  contractSignedDate?: string;
  installationDate?: string;
  completionDate?: string;
  description: string;
  address: string;
  timeline?: TimelineEvent[];
  complaints?: Complaint[];
}

interface EmployeeStats {
  name: string;
  total_projects: number;
  total_value: number;
  completed_projects: number;
  project_durations: number[];
  conversion_rate: number;
  avg_project_value: number;
  branch: string;
  avg_project_duration?: number | null;
}

interface BranchMetrics {
  branch: string;
  projects_count: number;
  avg_days_phone_to_measurement: number | null;
  avg_days_complaint_wait: number | null;
  avg_days_contact_to_contract: number | null;
  avg_project_duration: number | null;
}

function parseDate(dateStr?: string): number | undefined {
  return dateStr ? new Date(dateStr).getTime() : undefined;
}

function avgTime(diffs: number[]): number | null {
  if (!diffs.length) return null;
  const avgMs = diffs.reduce((a, b) => a + b, 0) / diffs.length;
  return Math.round(avgMs / (1000 * 60 * 60 * 24) * 10) / 10; // dni z 1 miejscem po przecinku
}

function calculateEmployeePerformance(projects: Project[]) {
  const employeeStats: { [key: string]: EmployeeStats } = {};

  for (const p of projects) {
    const worker = p.assignedWorker;
    if (!worker) continue;

    if (!employeeStats[worker]) {
      employeeStats[worker] = {
        name: worker,
        total_projects: 0,
        total_value: 0,
        completed_projects: 0,
        project_durations: [],
        conversion_rate: 0,
        avg_project_value: 0,
        branch: p.branch
      };
    }

    employeeStats[worker].total_projects++;
    employeeStats[worker].total_value += p.value;

    // Sprawdź czy projekt jest zakończony
    if (p.status === 'Installation Completed' || p.status === 'Repair Completed' || p.completionDate) {
      employeeStats[worker].completed_projects++;
    }

    // Oblicz czas trwania projektu
    if (p.createdDate && p.completionDate) {
      const duration = parseDate(p.completionDate)! - parseDate(p.createdDate)!;
      if (duration > 0) {
        employeeStats[worker].project_durations.push(duration);
      }
    }
  }

  // Oblicz dodatkowe wskaźniki
  Object.values(employeeStats).forEach((emp: EmployeeStats) => {
    emp.avg_project_value = emp.total_value / emp.total_projects;
    emp.conversion_rate = emp.completed_projects / emp.total_projects * 100;
    emp.avg_project_duration = avgTime(emp.project_durations);
  });

  // Sortuj według różnych kryteriów
  const topByProjects = Object.values(employeeStats)
    .sort((a: EmployeeStats, b: EmployeeStats) => b.total_projects - a.total_projects)
    .slice(0, 5);

  const topByValue = Object.values(employeeStats)
    .sort((a: EmployeeStats, b: EmployeeStats) => b.total_value - a.total_value)
    .slice(0, 5);

  const topByConversion = Object.values(employeeStats)
    .filter((emp: EmployeeStats) => emp.total_projects >= 2) // minimum 2 projekty
    .sort((a: EmployeeStats, b: EmployeeStats) => b.conversion_rate - a.conversion_rate)
    .slice(0, 5);

  const topByEfficiency = Object.values(employeeStats)
    .filter((emp: EmployeeStats) => emp.avg_project_duration !== null)
    .sort((a: EmployeeStats, b: EmployeeStats) => (a.avg_project_duration || 0) - (b.avg_project_duration || 0))
    .slice(0, 5);

  return {
    top_by_projects: topByProjects,
    top_by_value: topByValue,
    top_by_conversion: topByConversion,
    top_by_efficiency: topByEfficiency,
    all_employees: Object.values(employeeStats)
  };
}

function calculateBranchMetrics(projects: Project[], branch: string): BranchMetrics {
  const branchProjects = projects.filter(p => p.branch === branch);
  
  const phoneToMeasurement: number[] = [];
  const complaintWait: number[] = [];
  const contactToContract: number[] = [];
  const projectDuration: number[] = [];

  for (const p of branchProjects) {
    if (p.timeline) {
      const phone = p.timeline.find((e: TimelineEvent) => e.type === 'phone_call');
      const measurement = p.timeline.find((e: TimelineEvent) => e.type === 'measurement');
      if (phone && measurement) {
        const diff = parseDate(measurement.date)! - parseDate(phone.date)!;
        if (diff > 0) phoneToMeasurement.push(diff);
      }
      
      const contact = p.timeline.find((e: TimelineEvent) => e.type === 'phone_call');
      const contract = p.timeline.find((e: TimelineEvent) => e.type === 'contract_signed');
      if (contact && contract) {
        const diff = parseDate(contract.date)! - parseDate(contact.date)!;
        if (diff > 0) contactToContract.push(diff);
      }
      
      const complaintSub = p.timeline.find((e: TimelineEvent) => e.type === 'complaint_submitted');
      const complaintRes = p.timeline.find((e: TimelineEvent) => e.type === 'complaint_resolved');
      if (complaintSub && complaintRes) {
        const diff = parseDate(complaintRes.date)! - parseDate(complaintSub.date)!;
        if (diff > 0) complaintWait.push(diff);
      }
    }
    
    if (p.complaints && p.complaints.length) {
      for (const c of p.complaints) {
        if (c.submittedDate && c.resolvedDate) {
          const diff = parseDate(c.resolvedDate)! - parseDate(c.submittedDate)!;
          if (diff > 0) complaintWait.push(diff);
        }
      }
    }
    
    // Czas trwania projektu (od utworzenia do zakończenia)
    if (p.createdDate && p.completionDate) {
      const diff = parseDate(p.completionDate)! - parseDate(p.createdDate)!;
      if (diff > 0) projectDuration.push(diff);
    }
  }

  return {
    branch,
    projects_count: branchProjects.length,
    avg_days_phone_to_measurement: avgTime(phoneToMeasurement),
    avg_days_complaint_wait: avgTime(complaintWait),
    avg_days_contact_to_contract: avgTime(contactToContract),
    avg_project_duration: avgTime(projectDuration)
  };
}

export async function GET() {
  // 1. Czas od telefonu do pomiaru
  const phoneToMeasurement: number[] = [];
  // 2. Czas oczekiwania na reklamację
  const complaintWait: number[] = [];
  // 3. Czas od kontaktu do podpisania kontraktu
  const contactToContract: number[] = [];

  for (const p of mockProjects) {
    if (p.timeline) {
      const phone = p.timeline.find((e: TimelineEvent) => e.type === 'phone_call');
      const measurement = p.timeline.find((e: TimelineEvent) => e.type === 'measurement');
      if (phone && measurement) {
        const diff = parseDate(measurement.date)! - parseDate(phone.date)!;
        if (diff > 0) phoneToMeasurement.push(diff);
      }
      const contact = p.timeline.find((e: TimelineEvent) => e.type === 'phone_call');
      const contract = p.timeline.find((e: TimelineEvent) => e.type === 'contract_signed');
      if (contact && contract) {
        const diff = parseDate(contract.date)! - parseDate(contact.date)!;
        if (diff > 0) contactToContract.push(diff);
      }
      const complaintSub = p.timeline.find((e: TimelineEvent) => e.type === 'complaint_submitted');
      const complaintRes = p.timeline.find((e: TimelineEvent) => e.type === 'complaint_resolved');
      if (complaintSub && complaintRes) {
        const diff = parseDate(complaintRes.date)! - parseDate(complaintSub.date)!;
        if (diff > 0) complaintWait.push(diff);
      }
    }
    if (p.complaints && p.complaints.length) {
      for (const c of p.complaints) {
        if (c.submittedDate && c.resolvedDate) {
          const diff = parseDate(c.resolvedDate)! - parseDate(c.submittedDate)!;
          if (diff > 0) complaintWait.push(diff);
        }
      }
    }
  }

  // Analizy według oddziałów
  const branches = ['Belfast', 'Lisburn', 'Newtownabbey', 'Bangor', 'Coleraine'];
  const branchAnalytics = branches.map(branch => calculateBranchMetrics(mockProjects, branch));

  // Analiza pracowników
  const employeeAnalytics = calculateEmployeePerformance(mockProjects);

  // Użyj mockAnalytics zamiast starego pliku analytics.json
  return NextResponse.json({
    ...mockAnalytics,
    avg_days_phone_to_measurement: avgTime(phoneToMeasurement),
    avg_days_complaint_wait: avgTime(complaintWait),
    avg_days_contact_to_contract: avgTime(contactToContract),
    branch_performance_metrics: branchAnalytics,
    employee_performance: employeeAnalytics
  });
} 