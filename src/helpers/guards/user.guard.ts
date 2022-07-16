import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const jwtCookie = request.cookies?.['jwt'];
    if (Object.keys(jwtCookie).length === 0) {
      return false;
    }
    const data = await this.jwtService.verifyAsync(jwtCookie);
    if (data) {
      return true;
    } else {
      return false;
    }
  }
}
