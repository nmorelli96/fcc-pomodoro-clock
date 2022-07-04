class SessionControl extends React.Component {
  render() {
    return (
      <div>
        <div id="control">
          <div id="break-label">Break Length</div>
          <div className="d-flex flex-nowrap">
            <div id="break-decrement">
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="break-duration">{this.props.breakLen}</div>
            <div id="break-increment">
              <i class="fa-solid fa-caret-up"></i>
            </div>
          </div>
        </div>
        <div id="control">
          <div id="session-label">Session Length</div>
          <div className="d-flex flex-nowrap">
            <div id="session-decrement">
              <i class="fa-solid fa-caret-down"></i>
            </div>
            <div id="session-duration">{this.props.sessionLen}</div>
            <div id="session-increment">
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
          <div id="timer-label">Session</div>
          <div id="time-left">{this.props.secondsLeft}</div>
          <div id="timer-control">
            <div id="start-stop">
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-pause"></i>
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
      sessionStatus: "paused"
    };
    this.parseSeconds = this.parseSeconds.bind(this);
    /*this.handleOperator = this.handleOperator.bind(this);*/
  }

  componentDidMount() {
    this.time = setInterval(this.changeTimeLeft(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.time);
  }

  parseSeconds(secondsLeft) {
    secondsLeft = this.state.secondsLeft;
    let minutes = Math.trunc(secondsLeft / 60);
    let seconds = (secondsLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  }

  changeTimeLeft() {
    this.setState({ secondsLeft: this.parseSeconds() });
  }

  render() {
    return (
      <div>
        <SessionControl
          breakLen={this.state.breakLen}
          sessionLen={this.state.sessionLen}
        />
        <SessionTimer
          secondsLeft={this.state.secondsLeft}
          parseSeconds={this.parseSeconds}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
