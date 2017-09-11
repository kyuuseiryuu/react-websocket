# react-websocket
Easy to create websocket and handle it.

## How to use

### source code build
- clone this repository [HeyChioy/react-websocket](https://github.com/HeyChioy/react-websocket)
- `npm install webpack webpack-dev-server -g` if you did not install them.
- `npm install`
- `npm run build`
- `npm start`
then you can see the demo

### npm 

<del>- `npm install @kyuuseiryuuu/react-websocket`</del>


## update log

- v0.0.3 action map support, proxy send method.
   > - You can use actionMap attribute to handle default action key 'SYS_ACTION' or custom actionKey attribute
   > - Proxy object can send JSON data or string.
- v0.0.4 auto reconnect support.

## props

```js
WebSocketRC.propTypes = {
    url: PropTypes.string.isRequired,
    protocol: PropTypes.string,
    onMessage: PropTypes.func.isRequired,
    onCreate: PropTypes.func,
    onClose: PropTypes.func,
    onError: PropTypes.func,
    onRetry: PropTypes.func,
    actionMap: PropTypes.object,
    actionKey: PropTypes.string, // will find this key in received data and try to map action.
    autoReconnect: PropTypes.bool, // default false.
    maxRetryTimes: PropTypes.number, // default 3
    retryDelay: PropTypes.number, // default 3000 (ms)
};
```
