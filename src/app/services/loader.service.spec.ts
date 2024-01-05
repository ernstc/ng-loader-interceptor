import { TestBed } from '@angular/core/testing';
import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with no requests pending', () => {
    expect(service['requestsPending']).toBe(0);
  });

  it('should increment requestsPending when requestStarted is called', () => {
    service.requestStarted();
    expect(service['requestsPending']).toBe(1);
  });

  it('should decrement requestsPending when requestFinished is called', () => {
    service.requestStarted();
    service.requestFinished();
    expect(service['requestsPending']).toBe(0);
  });

  it('should not decrement requestsPending below 0', () => {
    service.requestFinished();
    expect(service['requestsPending']).toBe(0);
  });

  it('should correctly identify excluded paths', async () => {
    await service['loadExcludedPaths']();
    expect(service.isPathExcluded('assets/excludedPaths.json')).toBe(true);
    expect(service.isPathExcluded('not/excluded/path')).toBe(false);
  });
});
