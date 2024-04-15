import { Component } from '@angular/core';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ApiKeyComponent } from '../api-key/api-key.component';
import { SecretKeyComponent } from '../secret-key/secret-key.component';
import { ProfileComponent } from '../profile/profile.component';
import { PayMenthodComponent } from '../pay-menthod/pay-menthod.component';
import { GroupsComponent } from '../groups/groups.component';
import { PassSecureComponent } from '../pass-secure/pass-secure.component';
import { SessionsComponent } from '../sessions/sessions.component';
import { EmailsComponent } from '../emails/emails.component';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [NgbNavModule, NgbModule, ApiKeyComponent, SecretKeyComponent, ProfileComponent, PayMenthodComponent, GroupsComponent, PassSecureComponent, SessionsComponent, EmailsComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  profile?: string;
  apiKey?: string;
  secretKey?: string;
  kycVerify?: string;
  twofactAuth?: string;
  cryptoMeth?: string;
  sessions?: string;
  emails?: string;

  // For Active Link or Defualt Page
  active = this.profile
}
