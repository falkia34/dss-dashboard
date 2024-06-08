import 'reflect-metadata';
import { AuthControllerImpl } from '@/presentation/controllers';
import { Container } from 'inversify';
import { Symbols } from '@/config';

export const serverContainer = new Container();

// Controllers
serverContainer.bind(Symbols.NextAuthController).to(AuthControllerImpl);
