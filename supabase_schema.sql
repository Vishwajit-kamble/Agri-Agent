
-- Enable Row Level Security (RLS) for all tables
-- This ensures users can only access their own data.

-- 1. Create Crop Diagnoses Table
CREATE TABLE IF NOT EXISTS diagnoses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  disease TEXT NOT NULL,
  severity TEXT NOT NULL,
  description TEXT,
  recommendations JSONB,
  confidence DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Market Alerts Table
CREATE TABLE IF NOT EXISTS market_alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  crop TEXT NOT NULL,
  alert_price DOUBLE PRECISION,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE diagnoses ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_alerts ENABLE ROW LEVEL SECURITY;

-- Create Security Policies
-- Diagnoses: Users can see and insert only their own data
CREATE POLICY "Users can manage their own diagnoses" ON diagnoses
  FOR ALL USING (auth.uid() = user_id);

-- Alerts: Users can see and insert only their own data
CREATE POLICY "Users can manage their own alerts" ON market_alerts
  FOR ALL USING (auth.uid() = user_id);
