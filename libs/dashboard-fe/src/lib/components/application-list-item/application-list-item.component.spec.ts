import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ApplicationListItemComponent } from "./application-list-item.component";

describe("ApplicationListItemComponent", () => {
  let component: ApplicationListItemComponent;
  let fixture: ComponentFixture<ApplicationListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationListItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ApplicationListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
