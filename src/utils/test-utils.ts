import { Container } from 'inversify';

export const bindMockInstance = (c: Container, type: symbol) => (mockInstance: any) => {
    if (c.isBound(type)) return c.rebind(type).toConstantValue(mockInstance);

    return c.bind(type).toConstantValue(mockInstance);
};
