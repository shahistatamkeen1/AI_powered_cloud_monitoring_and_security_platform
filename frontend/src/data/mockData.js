export const summaryData = [
  { title: 'Total VMs', value: '4', color: 'text-black' },
  { title: 'Active Alerts', value: '3', color: 'text-red-500' },
  { title: 'Critical Alerts', value: '1', color: 'text-orange-500' },
  { title: 'Average CPU', value: '68%', color: 'text-blue-500' },
]

export const recentAlerts = [
  {
    id: 1,
    vmName: 'vm-app01',
    alertName: 'High CPU Usage',
    severity: 'Critical',
    status: 'Active',
    time: '10:15 AM',
  },
  {
    id: 2,
    vmName: 'vm-db01',
    alertName: 'Memory Usage High',
    severity: 'Warning',
    status: 'Acknowledged',
    time: '10:05 AM',
  },
  {
    id: 3,
    vmName: 'vm-mon01',
    alertName: 'Disk Space Low',
    severity: 'Critical',
    status: 'Active',
    time: '09:55 AM',
  },
  {
    id: 4,
    vmName: 'vm-dc01',
    alertName: 'Failed Login Attempts',
    severity: 'Warning',
    status: 'Resolved',
    time: '09:40 AM',
  },
]

export const cpuData = [
  { time: '10:00', value: 45 },
  { time: '10:05', value: 52 },
  { time: '10:10', value: 48 },
  { time: '10:15', value: 70 },
  { time: '10:20', value: 66 },
  { time: '10:25', value: 78 },
]

export const memoryData = [
  { time: '10:00', value: 55 },
  { time: '10:05', value: 58 },
  { time: '10:10', value: 60 },
  { time: '10:15', value: 63 },
  { time: '10:20', value: 67 },
  { time: '10:25', value: 72 },
]

export const networkData = [
  { time: '10:00', value: 120 },
  { time: '10:05', value: 140 },
  { time: '10:10', value: 135 },
  { time: '10:15', value: 180 },
  { time: '10:20', value: 165 },
  { time: '10:25', value: 190 },
]

export const alertPieData = [
  { name: 'Critical', value: 2 },
  { name: 'Warning', value: 1 },
  { name: 'Normal', value: 1 },
]

export const logsData = [
  {
    id: 1,
    vm: 'vm-app01',
    severity: 'Critical',
    message: 'CPU usage exceeded threshold',
    time: '10:15 AM',
  },
  {
    id: 2,
    vm: 'vm-db01',
    severity: 'Warning',
    message: 'Memory usage high',
    time: '10:05 AM',
  },
  {
    id: 3,
    vm: 'vm-mon01',
    severity: 'Info',
    message: 'System scan completed successfully',
    time: '09:55 AM',
  },
  {
    id: 4,
    vm: 'vm-dc01',
    severity: 'Critical',
    message: 'Multiple failed login attempts detected',
    time: '09:40 AM',
  },
]

export const aiInsightsData = [
  {
    id: 1,
    title: 'High CPU Usage on vm-app01',
    explanation:
      'The application server is using too much CPU. This usually happens when too many tasks are running at the same time or a process is stuck.',
    suggestedFix:
      'Check running services, restart the overloaded application, and consider scaling the VM resources if usage stays high.',
    summary:
      'CPU usage crossed the safe limit and needs attention to prevent slowdown.',
    severity: 'Critical',
  },
  {
    id: 2,
    title: 'Memory Usage High on vm-db01',
    explanation:
      'The database server is using a large amount of memory, which may affect performance if it keeps increasing.',
    suggestedFix:
      'Review active database queries, clear unused processes, and increase memory resources if needed.',
    summary:
      'Memory usage is rising and may impact database response time.',
    severity: 'Warning',
  },
  {
    id: 3,
    title: 'Failed Login Attempts on vm-dc01',
    explanation:
      'Several unsuccessful login attempts were detected on the domain controller. This may indicate incorrect credentials or suspicious access attempts.',
    suggestedFix:
      'Review security logs, verify user activity, and temporarily lock affected accounts if needed.',
    summary:
      'Multiple failed login events were detected and should be reviewed for security risks.',
    severity: 'Critical',
  },
]

export const historyData = [
  {
    id: 1,
    event: 'High CPU Usage resolved',
    vm: 'vm-app01',
    status: 'Resolved',
    date: '2026-03-20',
  },
  {
    id: 2,
    event: 'Memory Usage warning acknowledged',
    vm: 'vm-db01',
    status: 'Acknowledged',
    date: '2026-03-21',
  },
  {
    id: 3,
    event: 'Failed login attempts detected',
    vm: 'vm-dc01',
    status: 'Critical',
    date: '2026-03-22',
  },
  {
    id: 4,
    event: 'Disk cleanup completed',
    vm: 'vm-mon01',
    status: 'Resolved',
    date: '2026-03-23',
  },
]