import React, { useState, useEffect } from 'react';
import { Course, Instructor, Page, Testimonial } from './types';
import { translations } from './translations';
import { 
    BookOpen, Clock, PlayIcon, StarIcon, Users, ChevronDown, 
    UserGroupIcon, SparklesIcon, MailIcon, TwitterIcon, FacebookIcon, LinkedInIcon 
} from './components/Icons';

// Mock Data with real video links
const instructor1: Instructor = { name: 'Jane Doe', title: 'Lead Web Developer', avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80' };
const instructor2: Instructor = { name: 'John Smith', title: 'Senior Data Scientist', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80' };
const instructor3: Instructor = { name: 'Emily White', title: 'Lead Designer', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&q=80'};
const instructor4: Instructor = { name: 'Chris Green', title: 'Marketing Guru', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop&q=80'};
const instructor5: Instructor = { name: 'Michael Chen', title: 'Cloud Solutions Architect', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80'};
const instructor6: Instructor = { name: 'Sophia Loren', title: 'iOS Development Lead', avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&q=80'};


const courses: Course[] = [
  { id: 1, title: 'Modern React with Hooks', category: 'Web Development', duration: '8 weeks', summary: 'Master React by building real-world applications.', videoUrl: 'https://www.youtube.com/embed/bMknfKXIFA8', instructor: instructor1, lessons: [
      { id: 1, title: `Introduction to React`, duration: `15 min`, videoUrl: 'https://www.youtube.com/embed/j942wKiXFu8' },
      { id: 2, title: `Components and Props`, duration: `25 min`, videoUrl: 'https://www.youtube.com/embed/9wK4gHo1fV4' },
      { id: 3, title: `State and Lifecycle`, duration: `20 min`, videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0' }
    ], objectives: ['Understand React core concepts.', 'Build complex UIs.', 'Manage state with Hooks.', 'Connect to APIs.'], isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=225&fit=crop&q=80' },
  { id: 2, title: 'Advanced Python for Data Science', category: 'Data Science', duration: '12 weeks', summary: 'Dive deep into Python libraries like Pandas and NumPy.', videoUrl: 'https://www.youtube.com/embed/ua-i_gu_8K8', instructor: instructor2, lessons: [
      { id: 1, title: 'NumPy Arrays', duration: '30 min', videoUrl: 'https://www.youtube.com/embed/xECgODF2DEY' },
      { id: 2, title: 'Pandas DataFrames', duration: '35 min', videoUrl: 'https://www.youtube.com/embed/gtjxAH8uaP0' },
      { id: 3, title: 'Data Visualization with Matplotlib', duration: '40 min', videoUrl: 'https://www.youtube.com/embed/3u-4I4Qn_o4' }
    ], objectives: ['Perform data manipulation.', 'Create visualizations.', 'Build machine learning models.', 'Apply skills to datasets.'], isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop&q=80' },
  { id: 3, title: 'UI/UX Design Fundamentals', category: 'Design', duration: '6 weeks', summary: 'Learn user-centric design to create beautiful interfaces.', videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', instructor: instructor3, lessons: [
      { id: 1, title: 'What is UX Design?', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/55NvZjUZUo8' },
      { id: 2, title: 'Wireframing & Prototyping', duration: '25 min', videoUrl: 'https://www.youtube.com/embed/69-s_s_tP6A' },
      { id: 3, title: 'Design Thinking Process', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/64aBQA-v_1o' }
    ], objectives: ['Understand design thinking.', 'Conduct user research.', 'Prototype and wireframe.', 'Apply visual design principles.'], isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1581291518857-4e26b49126ee?w=400&h=225&fit=crop&q=80' },
  { id: 4, title: 'Digital Marketing Masterclass', category: 'Marketing', duration: '10 weeks', summary: 'Become a certified digital marketing professional.', videoUrl: 'https://www.youtube.com/embed/b4a763n9f8A', instructor: instructor4, lessons: [
      { id: 1, title: 'Intro to SEO', duration: '20 min', videoUrl: 'https://www.youtube.com/embed/0QpTO8y--v8' },
      { id: 2, title: 'Social Media Marketing', duration: '25 min', videoUrl: 'https://www.youtube.com/embed/q62rrg63tXI' }
    ], objectives: ['Master SEO and SEM.', 'Create effective social media campaigns.', 'Analyze marketing data.', 'Develop content strategy.'], isFeatured: true, imageUrl: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=400&h=225&fit=crop&q=80' },
  { id: 5, title: 'Photography for Beginners', category: 'Photography', duration: '4 weeks', summary: 'Learn the art of photography from scratch.', videoUrl: 'https://www.youtube.com/embed/FuA-N20d4vI', instructor: instructor3, lessons: [
      { id: 1, title: 'Understanding Exposure', duration: '18 min', videoUrl: 'https://www.youtube.com/embed/ixR64sl4-qM' }
    ], objectives: ['Understand camera settings.', 'Learn composition techniques.', 'Master lighting.', 'Edit photos like a pro.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1502982720700-b8f0435373b3?w=400&h=225&fit=crop&q=80' },
  { id: 6, title: 'Introduction to SQL Databases', category: 'Data Science', duration: '5 weeks', summary: 'Learn to manage and query data with SQL.', videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA', instructor: instructor2, lessons: [
      { id: 1, title: 'Basic SQL Queries', duration: '22 min', videoUrl: 'https://www.youtube.com/embed/7S_tz1z_5bA' }
    ], objectives: ['Write basic and advanced SQL queries.', 'Design relational databases.', 'Understand database administration.', 'Work with a real database.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=225&fit=crop&q=80' },
  { id: 7, title: 'Cloud Computing with AWS', category: 'Cloud', duration: '8 weeks', summary: 'Learn to build and deploy scalable applications on Amazon Web Services.', videoUrl: 'https://www.youtube.com/embed/a9__D53WsUs', instructor: instructor5, lessons: [
      { id: 1, title: 'What is AWS?', duration: '10 min', videoUrl: 'https://www.youtube.com/embed/a9__D53WsUs' }
    ], objectives: ['Understand AWS core services.', 'Deploy applications on EC2.', 'Manage data with S3 and RDS.', 'Learn about serverless architecture.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=225&fit=crop&q=80' },
  { id: 8, title: 'iOS App Development with Swift', category: 'Mobile Development', duration: '12 weeks', summary: 'Build beautiful and functional iOS applications from scratch using Swift and Xcode.', videoUrl: 'https://www.youtube.com/embed/comQ1-x2a1Q', instructor: instructor6, lessons: [
      { id: 1, title: 'SwiftUI Tutorial', duration: '30 min', videoUrl: 'https://www.youtube.com/embed/comQ1-x2a1Q' }
    ], objectives: ['Master the Swift programming language.', 'Build UIs with SwiftUI.', 'Manage app data and state.', 'Publish your app to the App Store.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=225&fit=crop&q=80' },
  { id: 9, title: 'Content Marketing Strategy', category: 'Marketing', duration: '6 weeks', summary: 'Learn how to create and distribute valuable content to attract and retain customers.', videoUrl: 'https://www.youtube.com/embed/rd5a03-sT8w', instructor: instructor4, lessons: [
       { id: 1, title: 'Developing a Strategy', duration: '15 min', videoUrl: 'https://www.youtube.com/embed/rd5a03-sT8w' }
    ], objectives: ['Develop a content marketing plan.', 'Create engaging blog posts and videos.', 'Understand SEO for content.', 'Measure content marketing ROI.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1587614203976-365c7d6297d8?w=400&h=225&fit=crop&q=80' },
  { id: 10, title: 'Advanced JavaScript Concepts', category: 'Web Development', duration: '7 weeks', summary: 'Deep dive into closures, prototypes, async/await, and other advanced JS topics.', videoUrl: 'https://www.youtube.com/embed/Bv_5Zv5c-Ts', instructor: instructor1, lessons: [
      { id: 1, title: 'Async/Await Explained', duration: '12 min', videoUrl: 'https://www.youtube.com/embed/Bv_5Zv5c-Ts' }
    ], objectives: ['Master asynchronous JavaScript.', 'Understand the `this` keyword deeply.', 'Learn about functional programming in JS.', 'Write more efficient and clean code.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=225&fit=crop&q=80' },
  { id: 11, title: 'Machine Learning Fundamentals', category: 'Data Science', duration: '10 weeks', summary: 'An introduction to the core concepts and algorithms of machine learning.', videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg', instructor: instructor2, lessons: [
      { id: 1, title: 'What is Machine Learning?', duration: '8 min', videoUrl: 'https://www.youtube.com/embed/i_LwzRVP7bg' }
    ], objectives: ['Understand supervised vs. unsupervised learning.', 'Implement linear and logistic regression.', 'Learn about decision trees and random forests.', 'Apply ML algorithms to real datasets.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400&h=225&fit=crop&q=80' },
  { id: 12, title: 'Graphic Design for Social Media', category: 'Design', duration: '5 weeks', summary: 'Create stunning visuals for social media platforms like Instagram, Facebook, and Twitter.', videoUrl: 'https://www.youtube.com/embed/5x2gYy-u3w8', instructor: instructor3, lessons: [
      { id: 1, title: 'Canva for Social Media', duration: '14 min', videoUrl: 'https://www.youtube.com/embed/5x2gYy-u3w8' }
    ], objectives: ['Learn design principles for social media.', 'Master tools like Canva or Figma.', 'Create brand-consistent graphics.', 'Design engaging ad visuals.'], isFeatured: false, imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=225&fit=crop&q=80' },
];

const testimonials: Testimonial[] = [
    { name: 'Alex Johnson', course: 'Modern React', avatarUrl: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=100&h=100&fit=crop&q=80', text: "A game-changer for my career. The instructor was clear, and the projects were incredibly helpful." },
    { name: 'Maria Garcia', course: 'Advanced Python', avatarUrl: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?w=100&h=100&fit=crop&q=80', text: "The most comprehensive data science course I've taken. Highly recommended!" },
    { name: 'Sam Lee', course: 'UI/UX Design', avatarUrl: 'https://images.unsplash.com/photo-1548142813-c348350df52b?w=100&h=100&fit=crop&q=80', text: "A fantastic introduction to UI/UX. I now feel confident designing user-friendly interfaces." }
];

type Language = 'en' | 'fr' | 'ar';

// Components
const Header = ({ setPage, language, setLanguage }: { setPage: (page: Page) => void; language: Language; setLanguage: (lang: Language) => void; }) => {
    const t = translations[language].header;
    const [isOpen, setIsOpen] = useState(false);
    const languages: { code: Language, name: string }[] = [{ code: 'en', name: 'English' }, { code: 'fr', name: 'Français' }, { code: 'ar', name: 'العربية' }];

    return (
        <header className="bg-gray-800/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="text-2xl font-bold text-orange-500">TSD Online</a>
                    <nav className="hidden md:flex items-center space-x-4">
                        <a href="#" onClick={(e) => { e.preventDefault(); setPage('home'); }} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{t.home}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setPage('all-courses'); }} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{t.courses}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setPage('about-us'); }} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{t.about}</a>
                        <a href="#" onClick={(e) => { e.preventDefault(); setPage('contact-us'); }} className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">{t.contact}</a>
                        <div className="relative">
                            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                                {languages.find(l => l.code === language)?.name}
                                <ChevronDown className={`w-5 h-5 ml-1 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
                            </button>
                            {isOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-gray-700 rounded-md shadow-lg z-10">
                                    {languages.map(lang => (
                                        <a key={lang.code} href="#" onClick={(e) => { e.preventDefault(); setLanguage(lang.code); setIsOpen(false); }} className="block px-4 py-2 text-sm text-gray-300 hover:bg-orange-500 hover:text-white">{lang.name}</a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

const Footer = ({ t }: { t: any }) => (
    <footer className="bg-gray-800 text-gray-400">
        <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-4">
                <div className="flex justify-center space-x-6">
                    <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Twitter</span><TwitterIcon className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Facebook</span><FacebookIcon className="h-6 w-6" /></a>
                    <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">LinkedIn</span><LinkedInIcon className="h-6 w-6" /></a>
                </div>
            </div>
            <p className="text-center text-sm">{t.copyright}</p>
        </div>
    </footer>
);


const CourseCard: React.FC<{ course: Course; onCourseClick: (id: number) => void }> = ({ course, onCourseClick }) => (
  <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col group cursor-pointer" onClick={() => onCourseClick(course.id)}>
    <div className="relative">
        <img className="w-full h-48 object-cover" src={course.imageUrl} alt={course.title} />
        <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">{course.category}</div>
    </div>
    <div className="p-6 flex-grow flex flex-col">
      <h3 className="text-xl font-bold text-white mb-2">{course.title}</h3>
      <p className="text-gray-400 text-sm mb-4 flex-grow">{course.summary}</p>
      <div className="flex items-center text-gray-400 text-sm mt-auto">
        <Clock className="w-4 h-4 mr-2" /> <span>{course.duration}</span>
        <span className="mx-2">|</span>
        <BookOpen className="w-4 h-4 mr-2" /> <span>{course.lessons.length} Lessons</span>
      </div>
    </div>
    <div className="w-full bg-orange-600 text-white font-bold py-3 px-4 text-center group-hover:bg-orange-500 transition-colors duration-300">
        Join Course
    </div>
  </div>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial, t: any }> = ({ testimonial, t }) => (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-2">
            {Array.from({length: 5}).map((_, i) => <StarIcon key={i} className="w-5 h-5 text-orange-400" />)}
        </div>
        <p className="text-gray-300 italic mb-4">"{testimonial.text}"</p>
        <div className="flex items-center">
            <img className="w-12 h-12 rounded-full mr-4" src={testimonial.avatarUrl} alt={testimonial.name} />
            <div>
                <h4 className="font-bold text-white">{testimonial.name}</h4>
                <span className="text-sm text-gray-400">{t.student}, {testimonial.course}</span>
            </div>
        </div>
    </div>
);

const VideoModal = ({ videoUrl, onClose }: { videoUrl: string, onClose: () => void }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50" onClick={onClose}>
            <div className="relative bg-black rounded-lg w-full max-w-4xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute -top-3 -right-3 text-white bg-gray-800 rounded-full h-10 w-10 flex items-center justify-center text-2xl z-10">&times;</button>
                <div className="aspect-video">
                     <iframe
                        src={videoUrl + "?autoplay=1"}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                     ></iframe>
                </div>
            </div>
        </div>
    );
};

const HomePage = ({ onCourseClick, onExploreClick, t }: { onCourseClick: (id: number) => void; onExploreClick: () => void; t: any }) => (
  <>
    <section className="hero bg-gray-800 text-white text-center py-20">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold mb-4">{t.hero.title}</h1>
        <p className="text-xl text-gray-300 mb-8">{t.hero.subtitle}</p>
        <button onClick={onExploreClick} className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform transform hover:scale-105">{t.hero.button}</button>
      </div>
    </section>

    <section className="featured-courses bg-gray-900 py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{t.featuredCourses.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.filter(c => c.isFeatured).map(course => (
            <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
          ))}
        </div>
      </div>
    </section>

    <section className="testimonials bg-gray-800 py-16">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-white mb-12">{t.testimonials.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map(testimonial => (
                    <TestimonialCard key={testimonial.name} testimonial={testimonial} t={t.testimonials} />
                ))}
            </div>
        </div>
    </section>
  </>
);

const CoursePage = ({ course, t, onBackClick, onVideoClick }: { course: Course, t: any, onBackClick: () => void, onVideoClick: (url: string) => void }) => {
    const [isEnrolled, setIsEnrolled] = useState(false);
    
    return (
    <div className="bg-gray-900 text-white">
        <div className="bg-gray-800 py-12">
            <div className="container mx-auto px-4">
                <button onClick={onBackClick} className="mb-8 inline-flex items-center text-orange-400 hover:text-orange-300 transition-colors">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                    {t.backToCourses}
                </button>
                <span className="text-orange-400 font-semibold">{course.category}</span>
                <h1 className="text-4xl font-bold mt-2 mb-4">{course.title}</h1>
                <p className="text-lg text-gray-300 max-w-3xl">{course.summary}</p>
                <div className="flex items-center space-x-6 mt-4 text-gray-400">
                    <span className="flex items-center"><Users className="w-5 h-5 mr-2" /> {t.createdBy} {course.instructor.name}</span>
                    <span className="flex items-center"><Clock className="w-5 h-5 mr-2" /> {course.duration}</span>
                    <span className="flex items-center"><BookOpen className="w-5 h-5 mr-2" /> {course.lessons.length} {t.lessons}</span>
                </div>
            </div>
        </div>
        <div className="container mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">{t.objectives}</h3>
                    <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {course.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
                    </ul>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">{t.courseContent}</h3>
                    <ul className="space-y-3">
                        {course.lessons.map(lesson => (
                            <li key={lesson.id} onClick={() => lesson.videoUrl && onVideoClick(lesson.videoUrl)} className="flex justify-between items-center p-3 bg-gray-700 rounded hover:bg-gray-600 cursor-pointer transition-colors">
                                <div className="flex items-center">
                                    <PlayIcon className="w-5 h-5 mr-3 text-orange-400" />
                                    <span>{lesson.title}</span>
                                </div>
                                <span className="text-sm text-gray-400">{lesson.duration}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="bg-gray-800 p-6 rounded-lg sticky top-24">
                    <div className="relative mb-4 cursor-pointer group" onClick={() => onVideoClick(course.videoUrl)}>
                        <img src={course.imageUrl} alt={course.title} className="rounded-lg w-full" />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-lg group-hover:bg-opacity-60 transition-opacity">
                            <PlayIcon className="w-16 h-16 text-white opacity-80 group-hover:opacity-100 transform group-hover:scale-110 transition-transform" />
                        </div>
                    </div>
                    <button 
                      onClick={() => setIsEnrolled(true)} 
                      disabled={isEnrolled}
                      className={`w-full font-bold py-3 rounded-lg text-lg mb-6 transition-colors ${isEnrolled ? 'bg-green-600 text-white cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 text-white'}`}
                    >
                      {isEnrolled ? t.enrolled : t.enrollNow}
                    </button>
                    <h4 className="text-xl font-bold mb-4">{t.instructor}</h4>
                    <div className="flex items-center">
                        <img src={course.instructor.avatarUrl} alt={course.instructor.name} className="w-14 h-14 rounded-full mr-4" />
                        <div>
                            <h5 className="font-bold">{course.instructor.name}</h5>
                            <p className="text-sm text-gray-400">{course.instructor.title}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
};

const AllCoursesPage = ({ onCourseClick, t }: { onCourseClick: (id: number) => void; t: any }) => (
    <div className="bg-gray-900 py-16 min-h-screen">
        <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-12">{t.courses}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} onCourseClick={onCourseClick} />
                ))}
            </div>
        </div>
    </div>
);

const AboutUsPage = ({ t }: { t: any }) => (
    <div className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
                <p className="text-lg text-gray-300 max-w-3xl mx-auto">{t.intro}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 my-16 text-center">
                <div className="bg-gray-800 p-8 rounded-lg">
                    <SparklesIcon className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t.feature1.title}</h3>
                    <p className="text-gray-400">{t.feature1.description}</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-lg">
                    <UserGroupIcon className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t.feature2.title}</h3>
                    <p className="text-gray-400">{t.feature2.description}</p>
                </div>
                <div className="bg-gray-800 p-8 rounded-lg">
                    <BookOpen className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">{t.feature3.title}</h3>
                    <p className="text-gray-400">{t.feature3.description}</p>
                </div>
            </div>
        </div>
    </div>
);


const ContactUsPage = ({ t }: { t: any }) => (
    <div className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto px-4">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">{t.intro}</p>
            </div>
            <div className="max-w-4xl mx-auto mt-12 grid md:grid-cols-2 gap-8 bg-gray-800 rounded-lg shadow-lg p-8">
                <div>
                    <h2 className="text-2xl font-bold mb-4">{t.form.title}</h2>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-300 mb-2">{t.form.name}</label>
                            <input type="text" id="name" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-300 mb-2">{t.form.email}</label>
                            <input type="email" id="email" className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="message" className="block text-gray-300 mb-2">{t.form.message}</label>
                            <textarea id="message" rows={4} className="w-full bg-gray-700 border border-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500"></textarea>
                        </div>
                        <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg">{t.form.submit}</button>
                    </form>
                </div>
                <div className="flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-4">{t.info.title}</h3>
                    <div className="space-y-4">
                        <p className="flex items-center"><MailIcon className="w-6 h-6 mr-3 text-orange-400" /> contact@tsdonline.com</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);


export default function App() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [modalVideoUrl, setModalVideoUrl] = useState<string | null>(null);


  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);
  
  const handleOpenVideo = (url: string) => {
    setModalVideoUrl(url);
  };
  
  const handleCloseVideo = () => {
    setModalVideoUrl(null);
  };

  const t = translations[language];
  
  const handleCourseClick = (id: number) => {
    setSelectedCourseId(id);
    setPage('course');
  };
  
  const handleSetPage = (newPage: Page) => {
      setSelectedCourseId(null);
      setPage(newPage);
  }

  const renderPage = () => {
    switch (page) {
      case 'course':
        const course = courses.find(c => c.id === selectedCourseId);
        return course ? <CoursePage course={course} t={t.course} onBackClick={() => handleSetPage('all-courses')} onVideoClick={handleOpenVideo} /> : <HomePage onCourseClick={handleCourseClick} onExploreClick={() => handleSetPage('all-courses')} t={t} />;
      case 'all-courses':
        return <AllCoursesPage onCourseClick={handleCourseClick} t={t.header} />;
      case 'about-us':
        return <AboutUsPage t={t.aboutUs} />;
      case 'contact-us':
        return <ContactUsPage t={t.contactUs} />;
      case 'home':
      default:
        return <HomePage onCourseClick={handleCourseClick} onExploreClick={() => handleSetPage('all-courses')} t={t} />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      <Header setPage={handleSetPage} language={language} setLanguage={setLanguage} />
      <main>
        {renderPage()}
      </main>
      <Footer t={t.footer}/>
      {modalVideoUrl && <VideoModal videoUrl={modalVideoUrl} onClose={handleCloseVideo} />}
    </div>
  );
}