import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, timer } from 'rxjs';
import { finalize, switchMap } from 'rxjs/operators';
import { LoaderService } from './../services/loader.service';


const LOADER_DELAY_IN_MS = 300;


@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.requestStarted();
    let delayTimer = timer(LOADER_DELAY_IN_MS).pipe(switchMap(() => {
      this.loaderService.showLoader();
      return next.handle(request);
    }));

    return delayTimer.pipe(
      finalize(() => {
        this.loaderService.requestFinished();
        if (!this.loaderService.areRequestsPending()) {
          this.loaderService.hideLoader();
        }
      })
    );
  }
}
