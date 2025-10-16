package com.skillverse.domain;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "courses")
public class Course {
  @Id @GeneratedValue
  private UUID id;

  @Column(nullable = false) private String title;
  @Column(nullable = false, unique = true) private String slug;
  @Column(columnDefinition = "text") private String description;
  private String thumbnailUrl;
  @Column(nullable = false) private UUID createdBy;
  @Column(nullable = false) private boolean isPublished = false;

  // getters/setters
  public String getTitle() { return title; }
  public void setTitle(String title) { this.title = title; }
  public String getSlug() { return slug; }
  public void setSlug(String slug) { this.slug = slug; }
  public String getDescription() { return description; }
  public void setDescription(String description) { this.description = description; }
  public String getThumbnailUrl() { return thumbnailUrl; }
  public void setThumbnailUrl(String thumbnailUrl) { this.thumbnailUrl = thumbnailUrl; }
  public UUID getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UUID createdBy) {
        this.createdBy = createdBy;
    }

    public boolean isPublished() {
        return isPublished;
    }

    public void setPublished(boolean published) {
        isPublished = published;
    }
  
}
