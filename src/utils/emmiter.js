import EventEmitter from 'events'

const _emmiiter = new EventEmitter();
_emmiiter.setMaxListeners(0);

export const emitter = _emmiiter;

