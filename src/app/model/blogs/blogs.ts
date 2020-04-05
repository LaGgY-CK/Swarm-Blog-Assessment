import { Blog } from '../blog/blog';

export interface Blogs {
  total: number;
  items: [Blog];
}