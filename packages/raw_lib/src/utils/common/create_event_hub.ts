/* eslint-disable functional/prefer-readonly-type */

type Handler = (...params: unknown[]) => unknown;

type EventHub = Map<string, Array<Handler>>;

export const createEventHub = () => {
  const eventHub: EventHub = new Map();

  const emit = (name: string, ...args: readonly unknown[]) => {
    eventHub.get(name)?.forEach((listener) => listener(...args));
  };

  const on = (name: string, handler: Handler) => {
    if (!eventHub.has(name)) {
      eventHub.set(name, []);
    }

    eventHub.get(name)?.push(handler);

    return {
      off: () => {
        eventHub.get(name)?.push(handler);
      },
    };
  };

  return {
    emit,
    on,
  };
};
