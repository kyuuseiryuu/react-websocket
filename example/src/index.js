import React from 'react';
import ReactDOM from'react-dom';
import WebSocketRC from "../../";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            ws: null,
            msg: '',
            data: ''
        }
    }

    saveSocket(ws, b) {
        console.log(ws);
        window.ws = b;
        this.setState({
            ws
        });
        console.log('WebSocket created!');
    }
    handleMsg(data) {
        console.log('handleMessage', data);
        this.setState({ msg: JSON.stringify(data) })
    }
    sendMessage() {
        const ws = this.state.ws;
        if (!ws) {
            alert('网络异常');
            return;
        }

        const data = {
          data: this.ta.value,
          action: this.action.value
        };
        ws.send(data);
    }
    render() {
        return(
            <div>
                <WebSocketRC
                    url="ws://localhost:8001"
                    onCreate={this.saveSocket.bind(this)}
                    onMessage={this.handleMsg.bind(this)}
                    onClose={() => alert('连接已关闭！')}
                    onError={() => alert('服务器异常！')}
                    onRetry={() => console.log('on Retry')}
                    autoReconnect
                    maxRetryTimes={2}
                    actionKey="action"
                    actionMap={{
                        help() {
                            console.log('help who?');
                        },
                        alert(data) {
                            alert(JSON.stringify(data));
                        }
                    }}
                />
                <textarea rows={3} ref={r => (this.ta = r)} style={{ width: '100%' }}>
                  { this.state.data }
                </textarea>
                Action: <input ref={r => (this.action = r)} />
                <br />
                <button
                    onClick={this.sendMessage.bind(this)}
                >send message</button>
                <div>
                    <h2>收到的消息</h2>
                    <div>
                        { this.state.msg }
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));