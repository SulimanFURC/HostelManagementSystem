import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { StatusModalComponent } from './shared/status-modal/status-modal.component';
import { StatusServiceService } from './Services/status-service.service';
import { LoaderServiceService } from './Services/loader-service.service';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';

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
    setTimeout(() => {
      this.loading$ = this.loaderService.loading$;
    }, 1000);
  }

  ngAfterViewInit() {
    this.statusService.setModalComponent(this.statusModalComponent);
  }
}
