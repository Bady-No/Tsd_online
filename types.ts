import React from 'react';

export type Page = 'home' | 'course' | 'all-courses' | 'about-us' | 'contact-us';

export interface Course {
  id: number;
  title: string;
  category: string;
  duration: string;
  summary: string;
  videoUrl: string;
  instructor: Instructor;
  lessons: Lesson[];
  objectives: string[];
  isFeatured?: boolean;
  imageUrl: string;
}

export interface Instructor {
  name: string;
  title: string;
  avatarUrl: string;
}

export interface Lesson {
  id: number;
  title: string;
  duration: string;
  videoUrl?: string;
}

export interface Testimonial {
  name: string;
  course: string;
  avatarUrl: string;
  text: string;
}
