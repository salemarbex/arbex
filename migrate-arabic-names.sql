-- Migration: Add Arabic name column to accreditation_logos and client_logos tables
-- Run this in your Supabase SQL editor

ALTER TABLE public.accreditation_logos ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255);
ALTER TABLE public.client_logos ADD COLUMN IF NOT EXISTS name_ar VARCHAR(255);
