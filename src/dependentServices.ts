import { Service } from 'typedi';

@Service()
export class DependentService1 {
  async execute(): Promise<string> {
    return 'Dependent Service 1 executed';
  }
}

@Service()
export class DependentService2 {
  async execute(): Promise<string> {
    return 'Dependent Service 2 executed';
  }
}