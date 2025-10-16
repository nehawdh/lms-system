-- USERS & ROLES
create table users (
  id uuid primary key default gen_random_uuid(),
  email varchar(255) unique not null,
  password_hash varchar(255) not null,
  full_name varchar(255) not null,
  role varchar(20) not null, -- ADMIN|INSTRUCTOR|STUDENT
  created_at timestamptz not null default now()
);

-- COURSES / LESSONS
create table courses (
  id uuid primary key default gen_random_uuid(),
  title varchar(255) not null,
  slug varchar(255) unique not null,
  description text,
  thumbnail_url text,
  created_by uuid not null references users(id),
  is_published boolean not null default false,
  created_at timestamptz not null default now()
);

create table lessons (
  id uuid primary key default gen_random_uuid(),
  course_id uuid not null references courses(id) on delete cascade,
  title varchar(255) not null,
  position int not null,
  video_url text,
  content_md text
);

-- ENROLLMENTS / PROGRESS
create table enrollments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id),
  course_id uuid not null references courses(id),
  created_at timestamptz not null default now(),
  unique(user_id, course_id)
);

create table lesson_progress (
  id uuid primary key default gen_random_uuid(),
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  lesson_id uuid not null references lessons(id) on delete cascade,
  is_completed boolean not null default false,
  completed_at timestamptz
);
