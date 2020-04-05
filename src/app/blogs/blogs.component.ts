import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../services/blogs/blogs.service';
import { Blogs } from '../model/blogs/blogs';
import { Blog } from '../model/blog/blog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {

  blogs: Blogs = null;
  blogsArray: Blog[] = null
  skip = 0;
  loading: boolean = false;
  disabled: boolean = false;

  constructor(
    private blogService: BlogsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getServicePosts();
  }

  getServicePosts(): void {
    this.loading = true
    this.blogService.getPosts(this.skip.toString()).subscribe((blogs: Blogs) => {
      this.blogs = blogs;
      this.blogsArray = blogs.items;
      this.loading = false;
    });
  }

  onLoadMore() {
    this.loading = true;
    this.skip += 3;
    this.blogService.getPosts(this.skip.toString()).subscribe((newBlogs: Blogs) => {
      this.blogs = newBlogs;
      // Merge both arrays so we dont have to loose the older posts
      this.blogsArray = [...this.blogsArray, ...newBlogs.items];
      if (this.blogs.total === this.blogsArray.length) {
        this.disabled = true;
      }
      this.loading = false;
    });
  }

  navigateToEdit(slug: string, id: string) {
    this.blogService.storeBlogId = id;
    this.router.navigate([`/blog/${slug}`]);
  }

}
