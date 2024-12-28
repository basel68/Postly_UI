import { authGuard } from './features/Auth/guard/auth.guard';
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
import { LoginComponent } from './features/Auth/login/login.component';
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
    path:"login",
    component:LoginComponent
  },
  {
    path:'admin/categories',
    component:CategoryListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/addcategory',
    component:AddCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/categories/:id',
    component:EditCategoryComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts',
    component:BlogpostListComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts/add',
    component:AddBlogpostsComponent,
    canActivate:[authGuard]
  },
  {
    path:'admin/blogposts/:id',
    component:EditBlogpostComponent,
    canActivate:[authGuard]
  }
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule],
// })
// export class AppRoutingModule {}
