INSERT INTO vms (vm_name, role, ip_address, status)
VALUES
('vm-dc01', 'Domain Controller', '10.0.1.4', 'Running'),
('vm-app01', 'Application Server', '10.0.2.4', 'Running'),
('vm-db01', 'Database Server', '10.0.3.4', 'Running'),
('vm-mon01', 'Monitoring Server', '10.0.4.4', 'Running');

INSERT INTO metrics (vm_id, cpu_usage, memory_usage, disk_usage, network_in, network_out)
VALUES
(2, 68.00, 72.00, 55.00, 180.00, 150.00),
(3, 54.00, 74.00, 60.00, 140.00, 130.00),
(4, 49.00, 58.00, 45.00, 120.00, 110.00);

INSERT INTO logs (vm_id, severity, message)
VALUES
(2, 'Critical', 'CPU usage exceeded threshold'),
(3, 'Warning', 'Memory usage high'),
(4, 'Info', 'System scan completed successfully'),
(1, 'Critical', 'Multiple failed login attempts detected');

INSERT INTO alerts (vm_id, alert_name, severity, status, description)
VALUES
(2, 'High CPU Usage', 'Critical', 'Active', 'CPU usage crossed safe threshold'),
(3, 'Memory Usage High', 'Warning', 'Acknowledged', 'Memory usage is increasing'),
(4, 'Disk Space Low', 'Critical', 'Active', 'Disk space below recommended level'),
(1, 'Failed Login Attempts', 'Warning', 'Resolved', 'Several failed authentication attempts were detected');

INSERT INTO ai_insights (alert_id, explanation, suggested_fix, summary)
VALUES
(1, 'The application server is under heavy load.', 'Restart heavy services or scale the VM.', 'CPU usage is too high and needs attention.'),
(2, 'The database server memory usage is increasing.', 'Check running queries and increase memory if needed.', 'Memory pressure may slow database performance.');