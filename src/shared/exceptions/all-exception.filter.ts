
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { HttpAdapterHost } from '@nestjs/core';
import { error } from 'console';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  
    catch(exception: unknown, host: ArgumentsHost): void {
      // In certain situations `httpAdapter` might not be available in the
      // constructor method, thus we should resolve it here.
      const { httpAdapter } = this.httpAdapterHost;
  
      const ctx = host.switchToHttp();
  
      const httpStatus =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
          const responseBody = {
            status: httpStatus,
            error:"Something went wrong",
            data: [{message:"An unknown error has occured"}],
          };
          if(typeof exception === 'object' && exception != null && 'code' in exception){
            
            responseBody.error = String(exception.code);
            responseBody.data = [{message:"Something went wrong"}];
          }

          if(typeof exception === 'object' && exception != null && 'errno' in exception){
            responseBody.status = Number(exception.errno);
            responseBody.data = [{message:"Something went wrong"}];
          }

          if(typeof exception === 'object' && exception != null && 'sqlMessage' in exception){
            responseBody.data = [{message:String(exception.sqlMessage)}];
          }
      

      console.log(exception);
  
      httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }
  }
  