let interval = 0;

class SessionControl extends React.Component {
  render() {
    return (
      <div>
        <div id="control">
          <div id="break-label">Break Length</div>
          <div className="d-flex flex-nowrap">
            <div id="break-decrement" onClick={() => { this.props.changeLen("break", "negative") }}>
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="break-duration">{this.props.breakLen}</div>
            <div id="break-increment" onClick={() => { this.props.changeLen("break", "positive") }}>
              <i class="fa-solid fa-caret-up"></i>
            </div>
          </div>
        </div>
        <div id="control">
          <div id="session-label">Work Length</div>
          <div className="d-flex flex-nowrap">
            <div id="session-decrement" onClick={() => { this.props.changeLen("session", "negative") }}>
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="session-duration">{this.props.sessionLen}</div>
            <div id="session-increment" onClick={() => { this.props.changeLen("session", "positive") }}>
              <i class="fa-solid fa-caret-up"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class SessionTimer extends React.Component {
  render() {
    return (
      <div>
        <div id="timer">
          <div id="timer-label">{this.props.type}</div>
          <div id="time-left">{this.props.parseSeconds()}</div>
          <div id="timer-control">
            <div id="start-stop">
              <i class="fa-solid fa-play" onClick={this.props.changeStatus}></i>
              <i class="fa-solid fa-pause" onClick={this.props.changeStatus}></i>
            </div>
            <div id="reset">
              <i class="fa-solid fa-clock-rotate-left"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      breakLen: 5,
      sessionLen: 25,
      secondsLeft: 1500,
      type: "Work",
      sessionStatus: "paused"
    };
    this.parseSeconds = this.parseSeconds.bind(this);
    this.changeTimeLeft = this.changeTimeLeft.bind(this);
    this.changeLen = this.changeLen.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    this.decrementSeconds = this.decrementSeconds.bind(this);
  }

  /*componentDidMount() {
  }*/
  /*componentWillUnmount() {
  }*/

  changeLen(element, sign) {
    if (this.state.sessionStatus == "paused") {
      if (element === "break") {
        if (this.state.breakLen <= 59) {
          if (sign === "positive") {
            this.setState({
              breakLen: this.state.breakLen + 1
            });
          }
        }
        if (this.state.breakLen > 1) {
          if (sign === "negative") {
            this.setState({
              breakLen: this.state.breakLen - 1
            });
          }
        }
      }
      else if (element === "session") {
        if (this.state.sessionLen <= 59) {
          if (sign === "positive") {
            this.setState({
              sessionLen: this.state.sessionLen + 1,
              secondsLeft: this.state.secondsLeft + 60
            });
          }
        }
        if (this.state.sessionLen > 1) {
          if (sign === "negative") {
            this.setState({
              sessionLen: this.state.sessionLen - 1,
              secondsLeft: this.state.secondsLeft - 60
            });
          }
        }
      }
    }
  }

  decrementSeconds() {
    this.setState({ secondsLeft: this.state.secondsLeft - 1 });
  }

  parseSeconds(secondsLeft) {
    secondsLeft = this.state.secondsLeft;
    let minutes = Math.trunc(secondsLeft / 60);
    let seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  changeTimeLeft() {
    //console.log(this.state);
    this.decrementSeconds();
  }

  changeStatus() {
    if (this.state.sessionStatus == "paused") {
      this.setState({ sessionStatus: "running" });
      interval = setInterval(this.changeTimeLeft, 1000);
    }
    else if (this.state.sessionStatus == "running") {
      this.setState({ sessionStatus: "paused" });
      clearInterval(interval);
      console.log(interval);
    }
  }

  render() {
    return (
      <div>
        <SessionControl
          breakLen={this.state.breakLen}
          sessionLen={this.state.sessionLen}
          changeLen={this.changeLen}
        />
        <SessionTimer
          parseSeconds={this.parseSeconds}
          changeStatus={this.changeStatus}
          type={this.state.type}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
