import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AboutComponent } from './about/about.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { TrustComponent } from './trust/trust.component';
import { ItemComponent } from './item/item.component';
import { MemberprofileComponent } from './memberprofile/memberprofile.component';
import { SettingsComponent } from './settings/settings.component';
import { NeedhelpComponent } from './needhelp/needhelp.component';
import { LogoutComponent } from './logout/logout.component';
import { TermsComponent } from './terms/terms.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { SellComponent } from './sell/sell.component';
import { AuthGuard } from './auth.guard';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'reset', component: ResetpasswordComponent },
  { path: 'password', component: ChangepasswordComponent },
  { path: 'p/:name', component: MemberprofileComponent },
  { path: 'about', component: AboutComponent },
  { path: 'howitworks', component: HowitworksComponent },
  { path: 'trust', component: TrustComponent }, 
  { path: 'emailVerify', component: EmailverifyComponent },
  { path: 'sell', component: SellComponent }, 
  { path: 'settings', component: SettingsComponent },
  { path: 'help', component: NeedhelpComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'discussions', component: DiscussionsComponent },
  { path: 'reset/:id', component: PasswordresetComponent },
  { path: 'verify-email/:id/:vtoken', component: VerifyemailComponent },
  { path: ':name/:id', component: ItemComponent },
];

export const routing = RouterModule.forRoot(appRoutes);