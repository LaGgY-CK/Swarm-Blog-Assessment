import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { Blogs } from 'src/app/model/blogs/blogs';
import { Blog } from 'src/app/model/blog/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private storeId: string;

  constructor( private http: HttpClient ) { }

  /**
   * Gets 3 posts from Squidex
   * @param skip string
   */
  getPosts(skip: string = '0'): Observable<Blogs> {
    const postsUrl = `/content/swarm-digital-assesment-blog/posts/?$top=3&$skip=${skip}`;
    return this.http.get<Blogs>(environment.squidex_url + postsUrl).pipe(
      catchError(this.handleError<Blogs>('getPosts', null))
    );
  }

  /**
   * Get post of 'id' from Squidex
   * @param id string
   */
  getPost(id: string): Observable<Blog> {
    const postUrl = `/content/swarm-digital-assesment-blog/posts/${id}`;
    return this.http.get<Blog>(environment.squidex_url + postUrl).pipe(
      catchError(this.handleError<Blog>(`getPost id=${id}`))
    );
  }

  /**
   * Logs the error in console, returns empty result to keep running
   * @param operation 
   * @param result 
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error, 'handleError');
      return of(result as T);
    }
  }

  /**
   * set the blogId we want to look up after navigation
   */
  set storeBlogId(storeId) {
    this.storeId = storeId;
  }

  /**
   * return the stored blog id
   */
  get storeBlogId() {
    return this.storeId;
  }
}
