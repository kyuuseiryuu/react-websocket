# react-websocket
将 WebSocket Client 封装进 React 组件。

## How to use


### yarn
1. `yarn add https://github.com/kyuuseiryuu/react-websocket --save`

```typescript

import React from 'react';

export interface Sender {
    send: (data: any) => void;
}
export interface ActionHandler {
    (message: any): void;
}
export interface ActionMap {
    [actionName: string]: ActionHandler;
}
interface OnMessageFunc {
    (message: any): void;
}
interface OnCloseFunc {
    (): void;
}
interface OnErrorFunc {
    (event: Event): void;
}
interface OnCreateFunc {
    (sender: Sender): void;
}
interface OnRetryFunc {
    (times: number): void;
}

export interface Props {
    url: string;
    protocol?: string;
    actionKey?: string; // 
    actionMap?: ActionMap;
    onMessage?: OnMessageFunc;
    onJson?: OnMessageFunc;
    onCreate?: OnCreateFunc,
    onClose?: OnCloseFunc;
    onError?: OnErrorFunc;
    onRetry?: OnRetryFunc;
    autoReconnect?: boolean;
    maxRetryTimes?: number;
    retryDelay?: number;
}

declare class ReactWebSocket extends React.Component<Props> {
}

export default ReactWebSocket;

```

### 属性说明

- url 与 protocol: new WebSocket 的第一、二个参数
- actionKey
  > websocket server 发送的若是一个 JSON， 那么该属性设置的值会对应到 actionMap 中设置的方法

- actionMap
  > 若 actionKey 设置为 'action' WebSocket server 发送过来的数据是 `{ action: 'updateUserInfo', data: { nane: 'new name' }  }`
  > 那么则会调用 actionMap 中的 updateUserInfo 方法，方法参数是整个数据 JSON 对象
  
- onJson: 若 actionMap 没有找到对应的方法， 则会调用这个方法。
- onMessage: 若服务端发送过来的不是 JSON 对象，则会调用这个方法。
- autoReconnect: 是否自动重连。默认：false
- maxRetryTimes: 最大重试次数。默认: 3
- retryDelay: 重试延迟时间。默认: 3000 ms
- onCreate: 该回调方法参数是一个 sender 对象，该对象有个 send 方法可以方便发送 message。（string 或 object）
- onError: 回调方法的参数是个 Event 对象。
