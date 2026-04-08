-- Migration: Update specialities icons from flaticon to Font Awesome
-- Run this in your Supabase SQL editor to update existing records

UPDATE specialities SET icon = 'fa fa-users' WHERE icon = 'fi flaticon-parents';
UPDATE specialities SET icon = 'fa fa-heartbeat' WHERE icon = 'fi flaticon-wounded';
UPDATE specialities SET icon = 'fa fa-briefcase' WHERE icon = 'fi flaticon-employee';
UPDATE specialities SET icon = 'fa fa-gavel' WHERE icon = 'fi flaticon-thief';
UPDATE specialities SET icon = 'fa fa-graduation-cap' WHERE icon = 'fi flaticon-university-graduate-hat';
UPDATE specialities SET icon = 'fa fa-building' WHERE icon = 'fi flaticon-house';
UPDATE specialities SET icon = 'fa fa-balance-scale' WHERE icon = 'fi flaticon-scale';
UPDATE specialities SET icon = 'fa fa-university' WHERE icon = 'fi flaticon-network';
UPDATE specialities SET icon = 'fa fa-handshake-o' WHERE icon = 'fi flaticon-lawyer';
