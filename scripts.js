let interval = 0;

class SessionControl extends React.Component {
  render() {
    return (
      <div>
        <div id="control">
          <div id="break-label">Break Length</div>
          <div className="d-flex flex-nowrap">
            <div
              id="break-decrement"
              onClick={() => {
                this.props.changeLen("break", "negative");
              }}
            >
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="break-length">{this.props.breakLen}</div>
            <div
              id="break-increment"
              onClick={() => {
                this.props.changeLen("break", "positive");
              }}
            >
              <i class="fa-solid fa-caret-up"></i>
            </div>
          </div>
        </div>
        <div id="control">
          <div id="session-label">Work Length</div>
          <div className="d-flex flex-nowrap">
            <div
              id="session-decrement"
              onClick={() => {
                this.props.changeLen("session", "negative");
              }}
            >
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="session-length">{this.props.sessionLen}</div>
            <div
              id="session-increment"
              onClick={() => {
                this.props.changeLen("session", "positive");
              }}
            >
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
          <audio id="beep" src="./resources/boxing-bell.wav"></audio>
          <div id="timer-control">
            <div id="start_stop" onClick={this.props.changeStatus}>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-pause"></i>
            </div>
            <div id="reset" onClick={this.props.reset}>
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
    this.reset = this.reset.bind(this);
  }

  /*componentDidMount() {
  }*/
  /*componentWillUnmount() {
  }*/

  changeLen(element, sign) {
    if (this.state.sessionStatus === "paused") {
      if (element === "break") {
        if (this.state.breakLen <= 59) {
          if (sign === "positive") {
            let incrementedBreak = this.state.breakLen + 1;
            let newBreakSeconds = incrementedBreak * 60;
            if (this.state.type === "Break") {
              this.setState({
                breakLen: incrementedBreak,
                secondsLeft: newBreakSeconds
              });
            } else if (this.state.type === "Work") {
              this.setState({
                breakLen: incrementedBreak
              });
            }
          }
        }
        if (this.state.breakLen > 1) {
          if (sign === "negative") {
            let decrementedBreak = this.state.breakLen - 1;
            let newBreakSeconds = decrementedBreak * 60;
            if (this.state.type === "Break") {
              this.setState({
                breakLen: decrementedBreak,
                secondsLeft: newBreakSeconds
              });
            } else if (this.state.type === "Work") {
              this.setState({
                breakLen: decrementedBreak
              });
            }
          }
        }
      } else if (element === "session") {
        if (this.state.sessionLen <= 59) {
          if (sign === "positive") {
            let incrementedSession = this.state.sessionLen + 1;
            let newSessionSeconds = incrementedSession * 60;
            if (this.state.type === "Work") {
              this.setState({
                sessionLen: incrementedSession,
                secondsLeft: newSessionSeconds
              });
            } else if (this.state.type === "Break") {
              this.setState({
                sessionLen: incrementedSession
              });
            }
          }
        }
        if (this.state.sessionLen > 1) {
          if (sign === "negative") {
            let decrementedSession = this.state.sessionLen - 1;
            let newSessionSeconds = decrementedSession * 60;
            if (this.state.type === "Work") {
              this.setState({
                sessionLen: decrementedSession,
                secondsLeft: newSessionSeconds
              });
            } else if (this.state.type === "Break") {
              this.setState({
                sessionLen: decrementedSession
              });
            }
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
    const beep = document.getElementById("beep");
    if (this.state.secondsLeft !== 0) {
      this.decrementSeconds();
    } else {
      if (this.state.type === "Work") {
        beep.play();
        window.setTimeout(function () {
          beep.pause();
          beep.currentTime = 0;
        }, 3000);
        this.setState({
          type: "Break",
          secondsLeft: this.state.breakLen * 60
        });
      } else if (this.state.type === "Break") {
        beep.play();
        window.setTimeout(function () {
          beep.pause();
          beep.currentTime = 0;
        }, 3000);
        this.setState({
          type: "Work",
          secondsLeft: this.state.sessionLen * 60
        });
      }
    }
  }

  changeStatus() {
    if (this.state.sessionStatus === "paused") {
      this.setState({ sessionStatus: "running" });
      interval = setInterval(this.changeTimeLeft, 1000);
    } else if (this.state.sessionStatus === "running") {
      this.setState({ sessionStatus: "paused" });
      clearInterval(interval);
      console.log(interval);
    }
  }

  reset() {
    clearInterval(interval);
    this.setState({
      breakLen: 5,
      sessionLen: 25,
      secondsLeft: 1500,
      type: "Work",
      sessionStatus: "paused"
    });
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
          reset={this.reset}
          type={this.state.type}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
