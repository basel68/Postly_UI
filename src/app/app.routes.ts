import { Routes } from '@angular/router';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddCategoryComponent } from './features/categories/add-category/add-category.component';
import { EditCategoryComponent } from './features/categories/edit-category/edit-category.component';
import { BlogpostListComponent } from './features/blog-posts/blogpost-list/blogpost-list.component';
import { AddBlogpostsComponent } from './features/blog-posts/add-blogposts/add-blogposts.component';
import { EditBlogpostComponent } from './features/blog-posts/edit-blogpost/edit-blogpost.component';
import { HomeComponent } from './features/public/home/home.component';
import { BlogDetailsComponent } from './features/public/blog-details/blog-details.component';
export const routes: Routes = [
  {
    path:'blog/:url',
    component:BlogDetailsComponent
  },
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'admin/categories',
    component:CategoryListComponent
  },
  {
    path:'admin/categories/addcategory',
    component:AddCategoryComponent
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent
  },
  {
    path:'admin/blogposts',
    component:BlogpostListComponent
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpostsComponent
  },
  {
    path:'admin/blogposts/:id',
    component:EditBlogpostComponent
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
