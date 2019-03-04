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
    onMessage?: OnMessageFunc;
    onJson?: OnMessageFunc;
    onCreate?: OnCreateFunc,
    onClose?: OnCloseFunc;
    onError?: OnErrorFunc;
    onRetry?: OnRetryFunc;
    actionKey?: string;
    actionMap?: ActionMap;
    autoReconnect?: boolean;
    maxRetryTimes?: number;
    retryDelay?: number;
}

declare class ReactWebSocket extends React.Component<Props> {
}

export default ReactWebSocket;

