import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private requestsPending = 0;
  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  requestStarted() {
    if (this.requestsPending === 0) {
      this.loaderStatus.next(false);
    }
    this.requestsPending++;
  }

  requestFinished() {
    if (this.requestsPending > 0) {
      this.requestsPending--;
    }
    if (this.requestsPending === 0) {
      //this.loaderStatus.next(true);
      this.loaderStatus.next(false);
    }
  }

  areRequestsPending() {
    return this.requestsPending > 0;
  }

  showLoader() {
    this.loaderStatus.next(true);
  }

  hideLoader() {
    this.loaderStatus.next(false);
  }
}
