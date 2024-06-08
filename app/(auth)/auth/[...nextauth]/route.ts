import { NextAuthController } from '@/presentation/controllers';
import { NextRequest } from 'next/server';
import { serverContainer } from '@/server-injection';
import { Symbols } from '@/config';

export async function GET(request: NextRequest): Promise<Response> {
  const nextAuthController = serverContainer.get<NextAuthController>(Symbols.NextAuthController);

  return await nextAuthController.get(request);
}

export async function POST(request: NextRequest): Promise<Response> {
  const nextAuthController = serverContainer.get<NextAuthController>(Symbols.NextAuthController);

  return await nextAuthController.post(request);
}
