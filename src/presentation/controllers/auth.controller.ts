import { Auth } from '@/config';
import { injectable } from 'inversify';
import { NextRequest } from 'next/server';

export interface NextAuthController {
  get(request: NextRequest): Promise<Response>;
  post(request: NextRequest): Promise<Response>;
}

@injectable()
export class AuthControllerImpl implements NextAuthController {
  public async get(request: NextRequest): Promise<Response> {
    return await Auth.handlers.GET(request);
  }

  public async post(request: NextRequest): Promise<Response> {
    return await Auth.handlers.POST(request);
  }
}
