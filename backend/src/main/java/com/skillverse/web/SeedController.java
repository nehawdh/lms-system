package com.skillverse.web;

import com.skillverse.domain.Course;
import com.skillverse.repo.CourseRepo;
import org.springframework.web.bind.annotation.*;
import java.util.UUID;

@RestController
@RequestMapping("/api/seed")
@CrossOrigin(origins = "*")
public class SeedController {
  private final CourseRepo courses;
  public SeedController(CourseRepo courses){ this.courses = courses; }

  @PostMapping("/course")
  public Course seed(){
    Course c = new Course();
    c.setTitle("AI for Quality Managers");
    c.setSlug("ai-for-quality-managers");
    c.setDescription("Learn practical AI techniques for QA, auditing, and CSAT.");
    c.setThumbnailUrl("https://picsum.photos/seed/quality/1200/675");
    //c.setCreatedBy(java.util.UUID.randomUUID());
    c.setCreatedBy(UUID.fromString("9a3fb73b-74b6-4f98-ad5d-b0b386db754"));
    c.setPublished(true);
    return courses.save(c);
  }
}
