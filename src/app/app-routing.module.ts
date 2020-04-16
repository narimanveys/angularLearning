import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { RegistrationComponent } from './auth/registration/registration.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './layouts/header/header.component';
import { TransactionsComponent } from './transactions/transactions/transactions.component';
import { SiteheaderComponent } from './layouts/siteheader/siteheader.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { CreatetransactionComponent } from './transactions/createtransaction/createtransaction.component';

const routes: Routes = [
    {path: '', component: HeaderComponent, children: [
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        { path: 'register', component: RegistrationComponent, pathMatch: 'full'},
        { path: 'login', component: LoginComponent}
    ]},
    {path: '', component: SiteheaderComponent, canActivate: [AuthGuard], children: [
        // {path: '',redirectTo: '/transactions', pathMatch: 'full'},
        {path: 'transactions', component: TransactionsComponent, pathMatch: 'full'},
        {path: 'create', component: CreatetransactionComponent, pathMatch: 'full'}
    ]}
];

@NgModule({
    imports: [
        // RouterModule.forRoot(routes,{enableTracing: true})
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{

}
