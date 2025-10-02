// src/data/courses.js

// NOTE: Replace these image paths with your actual images in the assets folder.
import course1 from '../assets/course1.png';
import course2 from '../assets/course2.png';
import course3 from '../assets/course3.png';
import course4 from '../assets/course4.png';
import course5 from '../assets/course5.png';
import course6 from '../assets/course6.png';
import course7 from '../assets/course7.png';
import course8 from '../assets/course8.png';


export const recommendedCourses = [
  { id: 1, category: "Video", title: "Grow Your Video Editing Skills from Experts", rating: 4.5, reviews: 1253, price: 39, image: course1, tag: "Beginner Level" },
  { id: 2, category: "Photography", title: "Easy and Creative Food Art Ideas Decoration", rating: 4.5, reviews: 1253, price: 59, image: course2 },
  { id: 3, category: "Lifestyle", title: "Create Your Own Sustainable Fashion Style", rating: 4.5, reviews: 123, price: 29, image: course3 },
  { id: 4, category: "Marketing", title: "Grow Your Skills Fashion Marketing", rating: 4.5, reviews: 1233, price: 39, image: course4, tag: "20% OFF", tagType: 'discount' },
];

export const popularCourses = [
  { id: 5, category: "Graphic Design", title: "Digital Poster Design: Best Practices", rating: 4.5, reviews: 1253, price: 39, image: course5, tag: "Best-seller", tagType: 'bestseller' },
  { id: 6, category: "Graphic Design", title: "Create Emotional & Trendy Typography", rating: 4.5, reviews: 1233, price: 59, image: course6, tag: "Best-seller", tagType: 'bestseller' },
  { id: 7, category: "Graphic Design", title: "Create Vector Illustrations for Beginner", rating: 4.5, reviews: 123, price: 29, image: course7 },
  { id: 8, category: "Graphic Design", title: "How to Design a Creative Book Cover", rating: 4.5, reviews: 123, price: 19, image: course8, tag: "Best-seller", tagType: 'bestseller' },
];

// You can add more data for 'trendingCourses' if needed
export const trendingCourses = recommendedCourses.slice().reverse(); // Re-using for example

// src/data/courses.js
// ... (keep all the existing exported data like recommendedCourses, etc.)

export const courseDetails = {
  id: 81,
  title: "UI Design, A User-Centered Approach",
  instructor: {
    name: "Klara Weaver",
    avatar: "https://i.pravatar.cc/40?img=1", // Placeholder avatar
  },
  breadcrumbs: ["Home", "UI/UX Design"],
  rating: 4.5,
  reviewsCount: 1991,
  price: 49,
  lessonsCount: 12,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nibh dictumst vulputate odio pellentesque sit quis ac, sit ipsum. Sit rhoncus velit in sed massa arcu sit eu. Vitae et vitae eget lorem non dui. Sollicitudin ut mi adipiscing duis.",
  benefits: [
    { id: 1, text: "14 hours on-demand video" },
    { id: 2, text: "Full lifetime access" },
    { id: 3, text: "Native teacher" },
    { id: 4, text: "Certificate of complete" },
    { id: 5, text: "100% free document" },
    { id: 6, text: "24/7 support" },
  ],
  reviews: [
    { id: 1, name: "Jay Rutherford", rating: 5, date: "12:00 PM", text: "Veniam mollit et veniam ea officia nisi minim fugiat minim consequat dolor pariatur.", avatar: "https://i.pravatar.cc/40?img=2" },
    { id: 2, name: "Annie Haley", rating: 4, date: "04:00 PM", text: "Nostrud excepteur magna id est quis in aliqua consequat. Exercitation enim eiusmod elit sint laborum.", avatar: "https://i.pravatar.cc/40?img=3" },
    { id: 3, name: "Jevon Raynor", rating: 5, date: "02:30 PM", text: "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est.", avatar: "https://i.pravatar.cc/40?img=4" },
    { id: 4, name: "Emily Rowey", rating: 5, date: "12:00 PM", text: "Deserunt minim incididunt cillum nostrud do voluptate excepteur.", avatar: "https://i.pravatar.cc/40?img=5" },
  ],
  coverImage: "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&w=800&q=60" // Placeholder
};

// src/data/courses.js
// ... (keep all the existing exported data)

export const teacherProfile = {
  name: "Klara Weaver",
  title: "Senior UI/UX Designer",
  location: "New York - 09:30 AM",
  avatar: "https://i.pravatar.cc/80?img=1", // Placeholder
  tags: ["Teacher", "Designer"],
  overview: "Adipisicing ipsum commodo cupidatat Lorem id velit laborum laborum proident. Nulla voluptate deserunt ipsum dolor nostrud dolor eu anim elit aliqua excepteur dolor velit voluptato mollit aliqua no.",
  stats: {
    rating: 4.8,
    reviews: "1000+",
    courses: 12,
    students: "1000+",
  },
  courses: [
    {
      id: 101,
      title: "UI Design, A User-Centered Approach",
      date: "May 2021",
      rating: 5,
      price: 49,
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=800&q=60", // Placeholder
      tag: "Free Document",
    },
    {
      id: 102,
      title: "How to Set Up a Design System",
      date: "May 2021",
      rating: 5,
      price: 79,
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=800&q=60", // Placeholder
    },
  ],
  ratingSummary: {
    average: 4.8,
    reviews: "1000+",
    distribution: [
      { stars: 5, percentage: 90 },
      { stars: 4, percentage: 8 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 0 },
      { stars: 1, percentage: 0 },
    ],
  },
  certificates: ["Google UX Design Professional"],
};

// src/data/courses.js
// ... (keep all existing exported data)

export const cartData = {
  items: [
    {
      id: 201,
      title: "UI Design, A User Approach",
      author: "Klara Weaver",
      price: 49,
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=400&q=60",
    },
    {
      id: 202,
      title: "Set Up a Design System",
      author: "Klara Weaver",
      price: 79,
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=400&q=60",
    },
    {
      id: 203,
      title: "Storytelling: Creative Food Art",
      author: "Ansley",
      price: 35,
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=60",
    },
  ],
  subtotal: 163,
  discount: 15,
  fee: 0,
  total: 148,
};

// src/data/courses.js
// ... (keep all existing exported data)

export const coursePlayerData = {
  courseTitle: "UI Design, A User - Centered Approach",
  completedLessons: 3,
  totalLessons: 12,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Placeholder video
  discussions: [
    { id: 1, name: "Anna", time: "12:03 PM", avatar: "https://i.pravatar.cc/40?img=6", text: "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est laborum labore. Mollit commodo in do dolor ut in mollit est sint esse nostrud ipsum laboris incididunt nulla officia sunt minim." },
    { id: 2, name: "John", time: "08:10 AM", avatar: "https://i.pravatar.cc/40?img=7", text: "Id ullamco qui tempor consectetur fugiat magna officia eiusmod ad fugiat laboris et culpa nostrud non veniam.", likes: 12 },
    { id: 3, name: "Klara Weaver", time: "06:20 AM", avatar: "https://i.pravatar.cc/40?img=1", text: "Deserunt minim incididunt cillum nostrud do voluptate excepteur excepteur minim ex minim est laborum labore.", isInstructor: true },
  ],
  lessons: [
    { id: 1, title: "01. Consectetur adipiscing elit", isCompleted: true },
    { id: 2, title: "02. Mollit voluptate adipisicing", isCompleted: true },
    { id: 3, title: "03. Officia pariatur Lorem sit", isCompleted: true },
    { id: 4, title: "04. Avoluptate adipisicing", isCompleted: false },
    { id: 5, title: "05. Exercitation elit incididunt esse", isCompleted: false },
    { id: 6, title: "06. Deserunt pariatur eiusm", isCompleted: false },
  ]
};

// src/data/courses.js
// ... (keep all existing exported data)

export const userDashboard = {
  inProgressCourses: [
    {
      id: 301,
      title: "UI Design, A User-Centered Approach",
      author: "Klara Weaver",
      progress: 60,
      image: "https://images.unsplash.com/photo-1512295767273-ac109ac3acfa?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 302,
      title: "How to Set Up a Design System",
      author: "Klara Weaver",
      progress: 25,
      image: "https://images.unsplash.com/photo-1555212697-194d092e3b8f?auto=format&fit=crop&w=600&q=60",
    },
    {
      id: 303,
      title: "Grow Your Video Editing Skills from Experts",
      author: "John Doe",
      progress: 90,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=60",
    },
  ],
  stats: {
    coursesInProgress: 3,
    coursesCompleted: 5,
    certificatesEarned: 2,
  },
};