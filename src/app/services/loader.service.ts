import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  private requestsPending = 0;
  private excludedPaths: string[] = [];

  public loaderStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {
    this.loadExcludedPaths();
  }

  private async loadExcludedPaths() {
    const response = await fetch('assets/excludedPaths.json');
    this.excludedPaths = await response.json();
  }

  isPathExcluded(url: string): boolean {
    return this.excludedPaths.some(path => url.includes(path));
  }

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
