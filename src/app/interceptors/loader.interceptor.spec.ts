// loader.interceptor.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { LoaderInterceptor } from './loader.interceptor';
import { LoaderService } from '../services/loader.service';

describe('LoaderInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let loaderService: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        LoaderService,
        { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
      ]
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loaderService = TestBed.inject(LoaderService);
  });

  afterEach(() => {
    httpMock.verify(); // Verifica che non ci siano richieste HTTP in sospeso
  });

  it('should increment requestsPending on request', () => {
    spyOn(loaderService, 'requestStarted');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    expect(loaderService.requestStarted).toHaveBeenCalled();
  });

  it('should decrement requestsPending on response', () => {
    spyOn(loaderService, 'requestFinished');

    http.get('/test').subscribe();

    const req = httpMock.expectOne('/test');
    req.flush({});
    expect(loaderService.requestFinished).toHaveBeenCalled();
  });

  it('should not handle excluded paths', () => {
    spyOn(loaderService, 'isPathExcluded').and.returnValue(true);
    spyOn(loaderService, 'requestStarted');

    http.get('/excluded/path').subscribe();

    const req = httpMock.expectOne('/excluded/path');
    req.flush({});
    expect(loaderService.requestStarted).not.toHaveBeenCalled();
  });
});
