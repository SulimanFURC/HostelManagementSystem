import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { StatusModalComponent } from './shared/status-modal/status-modal.component';
import { StatusServiceService } from './Services/status-service.service';
import { LoaderServiceService } from './Services/loader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'HostelManagement';
  isLogin?: boolean;
  @ViewChild(StatusModalComponent) statusModalComponent!: StatusModalComponent;
  loading$: any;

  constructor(
    private auth: AuthService, 
    private statusService: StatusServiceService, 
    private loaderService: LoaderServiceService) {
    this.auth.isLogin$.subscribe((res) => {
      this.isLogin = res;
    })
    this.loading$ = this.loaderService.loading$;
  }

  ngAfterViewInit() {
    this.statusService.setModalComponent(this.statusModalComponent);
  }
}
