import { All, Controller, Logger, Next, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

@Controller("core-engine")
export class CoreEngineController {
  private logger = new Logger(CoreEngineController.name);

  private readonly proxy = createProxyMiddleware({
      router: (req: Request) => {
        return `http://localhost:${req.port}`
      },
      changeOrigin: true,
      autoRewrite: true,
      followRedirects: true,
  })

  @All('*')
  get(@Req() req: Request, @Res() res: Response, @Next() next: any) {
    this.proxy(req, res, next);
  }
}
