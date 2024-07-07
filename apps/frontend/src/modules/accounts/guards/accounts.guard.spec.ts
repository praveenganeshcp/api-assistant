import { TestBed } from "@angular/core/testing"
import { AccountsGuard } from "./accounts.guard"
import { MockProvider } from "ng-mocks"
import { Store } from "@ngrx/store"
import { SwToastService } from "ngx-simple-widgets"
import { provideMockStore } from "@ngrx/store/testing"
import { AppState } from "../../app/app.state"
import { UserProfile } from "@api-assistant/auth-fe"
import { take } from "rxjs"
import { UrlSerializer, UrlTree } from "@angular/router"

describe('AccountsGuard', () => {

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                AccountsGuard,
                MockProvider(Store),
                SwToastService
            ]
        }).compileComponents()
    })

    it('should create', () => {
        const guard = TestBed.inject(AccountsGuard)
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
        const guard = TestBed.inject(AccountsGuard)
        guard.canActivate().pipe(
            take(1)
        ).subscribe((urlTree: UrlTree | boolean) => {
            if(urlTree instanceof UrlTree) {
                const urlSerializer = TestBed.inject(UrlSerializer);
                expect(urlSerializer.serialize(urlTree)).toBe('/load')
                done()
            }
        })
    })

    it('should show toast warn message when user is already logged in', () => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: {} as UserProfile, error: '' },
                    },
                }),
            ]
        })
        const warnToastSpy = jest.spyOn(TestBed.inject(SwToastService), "warn");
        const guard = TestBed.inject(AccountsGuard)
        guard.canActivate().pipe(
            take(1)
        ).subscribe()
        expect(warnToastSpy).toHaveBeenCalledWith({
            message: 'Already logged in',
        })
    })

    it('should redirect to dashboard when user is already logged in', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: {} as UserProfile, error: '' },
                    },
                }),
            ]
        })
        const guard = TestBed.inject(AccountsGuard)
        guard.canActivate().pipe(
            take(1)
        ).subscribe((urlTree: UrlTree | boolean) => {
            if(urlTree instanceof UrlTree) {
                const urlSerializer = TestBed.inject(UrlSerializer);
                expect(urlSerializer.serialize(urlTree)).toBe('/app/projects')
                done()
            }
        })
    })

    it('should return true when profile data is empty', (done) => {
        TestBed.configureTestingModule({
            providers: [
                provideMockStore<Partial<AppState>>({
                    initialState: {
                      profile: { isLoading: false, data: null, error: '' },
                    },
                }),
            ]
        })
        const guard = TestBed.inject(AccountsGuard)
        guard.canActivate().pipe(
            take(1)
        ).subscribe((shouldAllow: UrlTree | boolean) => {
            if(typeof shouldAllow === "boolean") {
                expect(shouldAllow).toBe(true)
                done()
            }
        })
    })
    
})