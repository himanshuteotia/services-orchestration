import { Service } from 'typedi';

@Service()
export class ServiceA {
  async execute(): Promise<string> {
    return 'Service A executed';
  }
}

@Service()
export class ServiceB {
  async execute(): Promise<string> {
    return 'Service B executed';
  }
}

@Service()
export class ServiceC {
  async execute(): Promise<string> {
    return 'Service C executed';
  }
}

@Service()
export class ServiceD {
  async execute(): Promise<string> {
    return 'Service D executed';
  }
}

@Service()
export class ServiceE {
  async execute(): Promise<string> {
    return 'Service E executed';
  }
}

@Service()
export class ServiceF {
  async execute(): Promise<string> {
    return 'Service F executed';
  }
}