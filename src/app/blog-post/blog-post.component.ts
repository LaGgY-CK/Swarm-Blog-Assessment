import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogsService } from '../services/blogs/blogs.service';
import { Blog } from '../model/blog/blog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styleUrls: ['./blog-post.component.css']
})
export class BlogPostComponent implements OnInit {

  blog: Blog = null;
  loading: boolean = false;
  safeHtml: SafeHtml;

  constructor(
    private blogService: BlogsService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
    ) { }

  ngOnInit(): void {
    /* const id = this.route.snapshot.paramMap.get('id'); */
    const id = this.blogService.storeBlogId;
    this.getBlogPost(id.toString());
  }

  getBlogPost(id: string): void {
    this.loading = true;
    this.blogService.getPost(id).subscribe((currentBlog: Blog) => {
      this.blog = currentBlog;
      
      // text area have \n within them so we inject them into the dom so <br> tags are read correctly.
      let paragraphs = this.blog.data.Body.iv.replace(/(?:\r\n|\r|\n)/g, '<br>');
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(
        paragraphs
      )
      this.loading = false;
    });
  }

}
