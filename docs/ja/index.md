本ドキュメントは、SkyWay JavaScript SDKのAPIリファレンスです。
SkyWayを使った開発が初めての場合は、SkyWayの[通信モデル](https://webrtc.ecl.ntt.com/communication-model.html)を先にご確認ください。

## クラスについて

このドキュメントに記載しているクラスの一覧です。

- [`Peer`](./peer)
- [`MediaConnection`](./mediaconnection)
- [`DataConnection`](./dataconnection)
- [`MeshRoom`](./meshroom)
- [`SFURoom`](./sfuroom)

## `EventEmitter`について

すべてのクラスは、[`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)を継承しています。

そのため、`on()`や`off()`、`emit()`などのメソッドが利用可能です。

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

メソッドの詳細については、[`EventEmitter`](https://nodejs.org/api/events.html#events_class_eventemitter)のドキュメントを、クラスごとの発生するイベントの詳細については、各クラスのドキュメントを参照してください。

各クラスからの`'error'`イベントは、必ず`on('error', listener)`するようにしてください。そうしない場合、エラーが発生して予期せぬ挙動になることがあります。
