-- Enable UUID generation for IDs
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-------------------------------
-- 👤 Users (Admin + Students)
-------------------------------
DO $$
BEGIN
  -- Admin user
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'admin@skillverse.io') THEN
    INSERT INTO users (email, password_hash, full_name, role)
    VALUES ('admin@skillverse.io', 'dev-hash', 'Admin User', 'ADMIN');
  END IF;

  -- Student 1
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'john.doe@skillverse.io') THEN
    INSERT INTO users (email, password_hash, full_name, role)
    VALUES ('john.doe@skillverse.io', 'dev-hash', 'John Doe', 'STUDENT');
  END IF;

  -- Student 2
  IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'jane.smith@skillverse.io') THEN
    INSERT INTO users (email, password_hash, full_name, role)
    VALUES ('jane.smith@skillverse.io', 'dev-hash', 'Jane Smith', 'STUDENT');
  END IF;
END$$;

-------------------------------
-- 📘 Courses (3 demos)
-------------------------------
DO $$
DECLARE
  admin_id UUID;
BEGIN
  SELECT id INTO admin_id FROM users WHERE email = 'admin@skillverse.io';

  -- Course 1
  IF NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'ai-for-quality-managers') THEN
    INSERT INTO courses (title, slug, description, thumbnail_url, created_by, is_published)
    VALUES (
      'AI for Quality Managers',
      'ai-for-quality-managers',
      'Learn practical AI techniques for QA, auditing, and CSAT.',
      'https://picsum.photos/seed/aiqa/1200/675',
      admin_id,
      true
    );
  END IF;

  -- Course 2
  IF NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'data-driven-decision-making') THEN
    INSERT INTO courses (title, slug, description, thumbnail_url, created_by, is_published)
    VALUES (
      'Data-Driven Decision Making',
      'data-driven-decision-making',
      'Master the art of using analytics to make smarter business decisions.',
      'https://picsum.photos/seed/datadriven/1200/675',
      admin_id,
      true
    );
  END IF;

  -- Course 3
  IF NOT EXISTS (SELECT 1 FROM courses WHERE slug = 'leadership-in-the-ai-era') THEN
    INSERT INTO courses (title, slug, description, thumbnail_url, created_by, is_published)
    VALUES (
      'Leadership in the AI Era',
      'leadership-in-the-ai-era',
      'Build leadership skills for managing teams and technology in the age of AI.',
      'https://picsum.photos/seed/aileadership/1200/675',
      admin_id,
      true
    );
  END IF;
END$$;

-------------------------------
-- ✅ Verification output
-------------------------------
SELECT 
  COUNT(*) FILTER (WHERE role = 'ADMIN') AS admin_users,
  COUNT(*) FILTER (WHERE role = 'STUDENT') AS student_users,
  COUNT(*) AS total_users
FROM users;

SELECT title, slug FROM courses;
