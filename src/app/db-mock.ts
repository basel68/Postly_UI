import { BlogImage } from "./shared/models/BlogImage";
import { BlogPost } from "./features/blog-posts/models/blogpost-model";
import { Category } from "./features/categories/models/Category.model";

export const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Technology',
    urlHandle: 'technology',
  },
  {
    id: '2',
    name: 'Health',
    urlHandle: 'health',
  },
  {
    id: '3',
    name: 'Sports',
    urlHandle: 'sports',
  },
  {
    id: '4',
    name: 'Education',
    urlHandle: 'education',
  },
  {
    id: '5',
    name: 'Travel',
    urlHandle: 'travel',
  },
];
export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "Understanding Angular",
    shortDescription: "An in-depth guide to Angular framework.",
    content: "Angular is a platform for building web applications...",
    featuredImageUrl: "https://example.com/images/angular.png",
    urlHandle: "understanding-angular",
    author: "John Doe",
    publishedDate: new Date("2025-01-01"),
    isVisible: true,
    categories: [
      { id: "1", name: "Frontend", urlHandle: "frontend" },
      { id: "2", name: "JavaScript", urlHandle: "javascript" }
    ]
  },
  {
    id: "2",
    title: "Mastering RxJS",
    shortDescription: "Learn advanced patterns in RxJS.",
    content: "Reactive programming with RxJS can transform your applications...",
    featuredImageUrl: "https://example.com/images/rxjs.png",
    urlHandle: "mastering-rxjs",
    author: "Jane Smith",
    publishedDate: new Date("2025-02-01"),
    isVisible: false,
    categories: [
      { id: "3", name: "Reactive Programming", urlHandle: "reactive-programming" },
      { id: "2", name: "JavaScript", urlHandle: "javascript" }
    ]
  },
  {
    id: "3",
    title: "Deploying with Docker",
    shortDescription: "Simplify your deployment process with Docker.",
    content: "Docker is a powerful tool for containerizing applications...",
    featuredImageUrl: "https://example.com/images/docker.png",
    urlHandle: "deploying-with-docker",
    author: "Alex Johnson",
    publishedDate: new Date("2025-03-15"),
    isVisible: true,
    categories: [
      { id: "4", name: "DevOps", urlHandle: "devops" },
      { id: "5", name: "Containers", urlHandle: "containers" }
    ]
  }
];
export const MOCK_IMAGES: BlogImage[] = [
    {
      id: '1',
      title: 'Image 1',
      fileName: 'image1.jpg',
      fileExtension: 'jpg',
      url: 'https://example.com/image1.jpg'
    },
    {
      id: '2',
      title: 'Image 2',
      fileName: 'image2.png',
      fileExtension: 'png',
      url: 'https://example.com/image2.png'
    }
  ];

export function getCategoryForPost(requiredId:number): Omit<Category, 'id'> {
  const { id, ...categoryWithoutId } = MOCK_CATEGORIES[requiredId-1]; // Removes the `id`
  return categoryWithoutId;
}
