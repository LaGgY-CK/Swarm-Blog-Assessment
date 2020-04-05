import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogPostComponent } from './blog-post/blog-post.component';



const routes: Routes = [
  { path: 'blog', component: BlogsComponent },
  { path: `blog/:title`, component: BlogPostComponent },
  { path: '',
    redirectTo: '/blog',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
