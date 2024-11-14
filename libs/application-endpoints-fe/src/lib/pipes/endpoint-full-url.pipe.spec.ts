import { EndpointFullUrlPipe } from "./endpoint-full-url.pipe";

describe("EndpointFullUrlPipe", () => {
  it("create an instance", () => {
    const pipe = new EndpointFullUrlPipe();
    expect(pipe).toBeTruthy();
  });
});
