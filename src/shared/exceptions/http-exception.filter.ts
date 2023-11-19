import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();let exceptionResponse = JSON.stringify(exception.getResponse());
    let getMessage = JSON.parse(exceptionResponse);

    response
      .status(status)
      .json({
        status: status,
        error: "Something went wrong",
        data: [{message:getMessage.message}]
      });
  }
}