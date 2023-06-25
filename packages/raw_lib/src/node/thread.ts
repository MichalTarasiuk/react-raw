import {MessageChannel} from 'worker_threads';

const port = new MessageChannel();

export const blockThread = () => {
  port.port1.ref();
};

export const unlockThread = () => {
  port.port1.unref();
};
