package com.skillverse.repo;

import com.skillverse.domain.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.UUID;

public interface CourseRepo extends JpaRepository<Course, UUID> {
  Optional<Course> findBySlug(String slug);
}
