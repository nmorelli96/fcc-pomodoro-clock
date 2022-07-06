let interval = 0;

class Header extends React.Component {
  render() {
    return (
      <nav className="unselectable navbar justify-content-center align-content-center">
        <a className="navbar-brand d-flex" href="#"><img src="./resources/tomato.png" />Pomodoro Timer</a>
      </nav>
    )
  }
}

class Footer extends React.Component {
  render() {
    return (
      <footer className="unselectable d-flex flex-nowrap align-content-center justify-content-center">
        Based on the &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.freecodecamp.org/learn/front-end-development-libraries/"
        >
          FCC course
        </a>
        &nbsp; by &nbsp;
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/nmorelli96/"
        >
          nmorelli96 &nbsp;
        </a>
      </footer>
    )
  }
}

class SessionControl extends React.Component {
  render() {
    return (
      <div id="control-container"
        className="unselectable d-flex justify-content-center align-content-center">
        <div id="control"
          className="d-flex flex-column justify-content-center align-content-center">
          <div id="break-label"
            className="text-center d-flex flex-nowrap justify-content-center align-content-center">
            Break Length
          </div>
          <div className="d-flex flex-nowrap justify-content-center align-content-center">
            <div
              id="break-decrement"
              onClick={() => {
                this.props.changeLen("break", "negative");
              }}>
              <i class="fa-solid fa-caret-down fa-2x"></i>
            </div>
            <div id="break-length">{this.props.breakLen}</div>
            <div
              id="break-increment"
              onClick={() => {
                this.props.changeLen("break", "positive");
              }}>
              <i class="fa-solid fa-caret-up fa-2x"></i>
            </div>
          </div>
        </div>
        <div id="control"
          className="d-flex flex-column justify-content-center align-content-center">
          <div id="session-label"
            className="text-center d-flex flex-nowrap justify-content-center align-content-center">
            Work Length
          </div>
          <div className="d-flex flex-nowrap justify-content-center align-content-center">
            <div
              id="session-decrement"
              onClick={() => {
                this.props.changeLen("session", "negative");
              }}>
              <i class="fa-solid fa-caret-down fa-2x"></i>
            </div>
            <div id="session-length">{this.props.sessionLen}</div>
            <div
              id="session-increment"
              onClick={() => {
                this.props.changeLen("session", "positive");
              }}>
              <i class="fa-solid fa-caret-up fa-2x"></i>
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
      <div id="timer-container"
        className="unselectable d-flex justify-content-center align-content-center">
        <div id="timer"
          className="d-flex flex-column justify-content-center align-content-center">
          <div id="timer-label"
            className="d-flex justify-content-center align-content-center">
            {this.props.type}
          </div>
          <div id="time-left"
            className="text-center d-flex justify-content-center align-content-center">
            {this.props.parseSeconds()}
          </div>
          <audio id="beep" src="./resources/mixkit-fairy-bells-583.wav"></audio>
          <div id="timer-control"
            className="d-flex justify-content-center align-content-center">
            <div id="start_stop" onClick={this.props.changeStatus}>
              <i class="fa-solid fa-play fa-3x"
                style={{ display: this.props.status === "paused" ? 'block' : 'none' }}></i>
              <i class="fa-solid fa-pause fa-3x" style={{ display: this.props.status === "running" ? 'block' : 'none' }}></i>
            </div>
            <div id="reset" onClick={this.props.reset}>
              <i class="fa-solid fa-clock-rotate-left fa-3x"></i>
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
    let minutes = Math.trunc(secondsLeft / 60).toString().padStart(2, "0");
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
        this.changeStatus();
        console.log(this.state);
        beep.play();
        this.setState({
          type: "Break",
          secondsLeft: this.state.breakLen * 60
        });
        this.changeStatus();
      } else if (this.state.type === "Break") {
        this.changeStatus();
        beep.play();
        this.setState({
          type: "Work",
          secondsLeft: this.state.sessionLen * 60
        });
        this.changeStatus()
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
    beep.pause();
    beep.currentTime = 0;
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
      <div id="app-container">
        <Header />
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
          status={this.state.sessionStatus}
        />
        <Footer />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
