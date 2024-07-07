import { TestBed } from "@angular/core/testing"
import { AuthenticatedGuard } from "./authenticated.guard"
import { MockProvider } from "ng-mocks"
import { Store } from "@ngrx/store"
import { SwToastService } from "ngx-simple-widgets"
import { UrlSerializer, UrlTree } from "@angular/router"
import { provideMockStore } from "@ngrx/store/testing"
import { AppState } from "../app.state"
import { UserProfile } from "@api-assistant/auth-fe"
import { take } from "rxjs"

describe('AuthenticatedGuard', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                MockProvider(Store),
                SwToastService
            ]
        })
    })

    it('should create', () => {
        const guard = TestBed.inject(AuthenticatedGuard);
        expect(guard).toBeTruthy()
    })

    it('should redirect to load url when profile data is loading', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: true, data: {} as UserProfile, error: '' },
                    },
                }),
            ]
        })
        const guard = TestBed.inject(AuthenticatedGuard);
        guard.canActivate().pipe(take(1)).subscribe((result: boolean | UrlTree) => {
            if(result instanceof UrlTree) {
                const urlSerializer = TestBed.inject(UrlSerializer);
                expect(urlSerializer.serialize(result)).toContain('/load');
                done()
            }
        });
    })

    it('should show toast error when user is not authenticated', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: null, error: '' },
                    },
                }),
            ]
        })
        const errorToastSpy = jest.spyOn(TestBed.inject(SwToastService), "error");
        const guard = TestBed.inject(AuthenticatedGuard);
        guard.canActivate().pipe(take(1)).subscribe(_ => {
            expect(errorToastSpy).toHaveBeenCalledWith({
                message: 'Session expired',
            });
            done()
        });
    })

    it('should redirect to login page when user is not authenticated', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: null, error: '' },
                    },
                }),
            ]
        })
        const guard = TestBed.inject(AuthenticatedGuard);
        guard.canActivate().pipe(take(1)).subscribe((result: boolean | UrlTree) => {
            if(result instanceof UrlTree) {
                const urlSerializer = TestBed.inject(UrlSerializer);
                expect(urlSerializer.serialize(result)).toContain('/accounts/login');
                done()
            }
        });
    })

    it('should return true when user is authenticated', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: {} as UserProfile, error: '' },
                    },
                }),
            ]
        })
        const guard = TestBed.inject(AuthenticatedGuard);
        guard.canActivate().pipe(take(1)).subscribe((result: boolean | UrlTree) => {
            if(typeof result === "boolean") {
                expect(result).toBe(true);
                done()
            }
        });
    })

})