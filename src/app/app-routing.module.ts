import {NgModule} from '@angular/core'
import {RouterModule, Routes} from '@angular/router'
import { RegistrationComponent } from './auth/registration/registration.component'
import { LoginComponent } from './auth/login/login.component'
import { HeaderComponent } from './layouts/header/header.component'
import { TransactionsComponent } from './transactions/transactions/transactions.component'
import { AppComponent } from './app.component'

const routes: Routes = [
    { path: 'login', component: LoginComponent}
    // {path: '', component: AppComponent, children: [
    //     // {path: '',redirectTo: '/login', pathMatch: 'full'},
    //     { path: 'register', component: RegistrationComponent, pathMatch: 'full'},
    //     { path: 'login', component: LoginComponent}
    // ]},
    // {path:'transactions', component: TransactionsComponent, pathMatch: 'full'}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes,{enableTracing: true})
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}