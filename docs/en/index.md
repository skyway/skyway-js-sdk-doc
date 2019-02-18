This document is ECLWebRTC JavaScript SDK API Reference.
See [Communication model of ECLWebRTC](https://webrtc.ecl.ntt.com/en/communication-model.html) if this is the first time for you to develop applciation with ECLWebRTC.

## About class

A list of the classes described in this document.

- [`Peer`](./peer)
- [`MediaConnection`](./mediaconnection)
- [`DataConnection`](./dataconnection)
- [`MeshRoom`](./meshroom)
- [`SFURoom`](./sfuroom)

## About `EventEmitter`

All classes above inherit [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter).

Therefore, methods such as `on()`, `off()`, and `emit()` are available.

```js
function onOpen() {
  console.log('an open event occurred!');
}

// add listener
peer.on('open', onOpen);
// remove listener
peer.off('open', onOpen)

// custom events
peer.on('myev', val => {
  console.log(val); // 3
})
peer.emit('myev', 3);
```

For API details, see the document of [`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter).

For events details, see the document of each class.

Set a listener for `'error'` event is always recommended to avoid unexpected behavior.
