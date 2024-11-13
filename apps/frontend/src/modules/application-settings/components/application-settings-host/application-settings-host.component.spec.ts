import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApplicationSettingsHostComponent } from "./application-settings-host.component";

describe("ApplicationSettingsHostComponent", () => {
  let component: ApplicationSettingsHostComponent;
  let fixture: ComponentFixture<ApplicationSettingsHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationSettingsHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationSettingsHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
