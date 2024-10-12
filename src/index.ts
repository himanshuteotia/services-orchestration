import 'reflect-metadata';
import express from 'express';
import { Container } from 'typedi';
import { ServiceA, ServiceB, ServiceC, ServiceD, ServiceE, ServiceF } from './services.js';
import { DependentService1, DependentService2 } from './dependentServices.js';
import { ServiceExecutor } from './serviceExecutor.js';

const app = express();
const port = 3000;

// Register services
Container.set('ServiceA', new ServiceA());
Container.set('ServiceB', new ServiceB());
Container.set('ServiceC', new ServiceC());
Container.set('ServiceD', new ServiceD());
Container.set('ServiceE', new ServiceE());
Container.set('ServiceF', new ServiceF());
Container.set('DependentService1', new DependentService1());
Container.set('DependentService2', new DependentService2());

const serviceExecutor = Container.get(ServiceExecutor);

app.get('/execute', async (req, res) => {
  const { services } = req.query;
  if (!services || typeof services !== 'string') {
    return res.status(400).json({ error: 'No services specified' });
  }

  const serviceKeys = services.split(',');
  try {
    const results = await serviceExecutor.execute(serviceKeys);
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});