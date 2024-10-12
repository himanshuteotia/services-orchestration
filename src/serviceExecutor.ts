import { Service, Inject } from 'typedi';
import { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE, ServiceF } from './services.js';
import { DependentService1, DependentService2 } from './dependentServices.js';

@Service()
export class ServiceExecutor {
  @Inject('ServiceA') private serviceA!: ServiceA;
  @Inject('ServiceB') private serviceB!: ServiceB;
  @Inject('ServiceC') private serviceC!: ServiceC;
  @Inject('ServiceD') private serviceD!: ServiceD;
  @Inject('ServiceE') private serviceE!: ServiceE;
  @Inject('ServiceF') private serviceF!: ServiceF;
  @Inject('DependentService1') private dependentService1!: DependentService1;
  @Inject('DependentService2') private dependentService2!: DependentService2;

  async execute(serviceKeys: string[]): Promise<string[]> {
    const results: string[] = [];
    const executedDependencies = new Set<string>();

    // Check and execute dependent services
    if (serviceKeys.includes('A') || serviceKeys.includes('B')) {
      if (!executedDependencies.has('DependentService1')) {
        results.push(await this.dependentService1.execute());
        executedDependencies.add('DependentService1');
      }
    }

    if (serviceKeys.includes('C') || serviceKeys.includes('D')) {
      if (!executedDependencies.has('DependentService2')) {
        results.push(await this.dependentService2.execute());
        executedDependencies.add('DependentService2');
      }
    }
    // We can use promise.all here as if any fail we have to return result or all setelled if we want to show all error messages 
    // Execute requested services
    for (const key of serviceKeys) {
      switch (key) {
        case 'A':
          results.push(await this.serviceA.execute());
          break;
        case 'B':
          results.push(await this.serviceB.execute());
          break;
        case 'C':
          results.push(await this.serviceC.execute());
          break;
        case 'D':
          results.push(await this.serviceD.execute());
          break;
        case 'E':
          results.push(await this.serviceE.execute());
          break;
        case 'F':
          results.push(await this.serviceF.execute());
          break;
        default:
          console.warn(`Unknown service key: ${key}`);
      }
    }

    return results;
  }
}
