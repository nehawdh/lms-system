package com.skillverse.web;

import com.skillverse.domain.Course;
import com.skillverse.repo.CourseRepo;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {
  private final CourseRepo repo;
  public CourseController(CourseRepo repo){ this.repo = repo; }

  @GetMapping public List<Course> all(){ return repo.findAll(); }
  @GetMapping("/{slug}") public Course bySlug(@PathVariable String slug){
    return repo.findBySlug(slug).orElseThrow();
  }
}
