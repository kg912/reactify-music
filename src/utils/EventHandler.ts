import { noop } from 'helpers';

const LOG_PREFIX = '[EventHandler] -';

interface Callback<T = any> {
  id?: string;
  callback: (args: T) => void;
}

export class Event {
  callbacks: Callback[] = [];
  constructor(public name: string) {}

  registerCallback<T>({ id, callback }: Callback<T>) {
    if (this.callbacks.find(({ id: itemId }) => itemId === id)) {
      console.error('[Event] registerCallback error! duplicate id assigned');
    }

    this.callbacks.push({ id, callback });
  }
}

class EventHandler {
  events: { [key: string]: Event } = {};

  registerEvent(eventName: string) {
    const event = new Event(eventName);
    this.events[eventName] = event;
  }

  addEventListener<T>(
    { id, eventName }: { id: string; eventName: string },
    callback: (args: T) => void
  ) {
    if (!Object.keys(this.events).includes(eventName)) {
      console.error(
        `${LOG_PREFIX} addEventListener: invalid eventName: ${eventName}`
      );
    }

    if (!this.events[eventName]) {
      console.error(`${LOG_PREFIX} addEventListener: Event not registered`);

      return;
    }

    this.events[eventName].registerCallback<T>({ id, callback });
  }

  removeEventListener({ id, eventName }: { id: string; eventName: string }) {
    if (!this.events[eventName]) {
      console.error(`${LOG_PREFIX} removeEventListener: Event not registered`);

      return;
    }

    const { callbacks } = this.events[eventName];

    this.events[eventName].callbacks = callbacks.filter(
      ({ id: callbackId }) => callbackId !== id
    );
  }

  dispatchEvent<T>(id: string, eventArgs: T) {
    const { callbacks } = this.events[id] || {};

    if (!callbacks) {
      return;
    }

    callbacks.forEach(({ callback = noop }) => {
      callback(eventArgs);
    });
  }
}

export default EventHandler;
