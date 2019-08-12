import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import TypoGraphy from "@material-ui/core/Typography";
import Dialog from "./Dialog";
import fetch from "cross-fetch";
import "./app.css";

function stringifyFormData(fd) {
  const data = {};
  for (let key of fd.keys()) {
    data[key] = fd.get(key);
  }
  return JSON.stringify(data, null, 2);
}
export default class App extends Component {
  constructor() {
    super();
    this.displayData = [];
    this.state = {
      counter: 0,
      answers: [],
      highlight: [],
      newDisplay: [],
      open: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const stringifyData = stringifyFormData(data);
    const newdata = JSON.parse(stringifyData);

    fetch("/api/verify-password", {
      method: "POST",
      body: stringifyData,
      headers: { "Content-Type": "application/json" }
    })
      .then(res => res.json())
      .then(data => {
        if (data.correct) {
          this.setState({ open: true });
        } else {
          const answerNumber = data.answer.toString();
          const newoutput = [];
          for (var i = 0, len = answerNumber.length; i < len; i += 1) {
            if (answerNumber.charAt(i) == data.highlight[i])
              newoutput.push(
                <span className="highlight"> {answerNumber.charAt(i)} </span>
              );
            else
              newoutput.push(
                <span className=""> {answerNumber.charAt(i)} </span>
              );
          }
          var newStateArray = this.state.newDisplay;
          newStateArray.push(
            <div
              id="display-data"
              style={{
                border: "1px solid #ccc",
                backgroundColor: "#f2f2f2",
                padding: "10px",
                margin: "4px"
              }}
            >
              User Attempt {this.state.counter} : {newoutput}
            </div>
          );

          this.setState({ newDisplay: newStateArray });
        }
      });

    this.setState({
      res: stringifyData,
      counter: this.state.counter + 1
    });

    var newStateArray = this.state.answers.slice();
    newStateArray.push(newdata.answer);
    this.setState({ answers: newStateArray });
  }

  componentDidMount() {
    fetch("/api/new-password")
      .then(res => res.json())
      .then(password => this.setState({ hintpassword: password.hint }));
  }

  render() {
    return (
      <div style={{ border: "1px solid #ccc", backgroundColor: "#f2f2f2" }}>
        <AppBar
          color="primary"
          position="static"
          style={{ background: "#592c82", border: "1px solid #ccc" }}
        >
          <Toolbar>
            <TypoGraphy variant="title" color="inherit">
              Guess The Password!
            </TypoGraphy>
          </Toolbar>
        </AppBar>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: 20,
            padding: 20
          }}
        >
          <div>
            <div className="res-block">
              <h3>Hint : {this.state.hintpassword}</h3>
            </div>
            <div>{this.state.newDisplay}</div>
            <div />
            <div>
              <form onSubmit={this.handleSubmit} style={{ width: "80%" }}>
                <input
                  id="hint"
                  name="hint"
                  type="hidden"
                  label="Type Here"
                  value={this.state.hintpassword}
                />
                <input
                  id="answer"
                  name="answer"
                  type="text"
                  placeholder="Type here"
                />
                <button>Submit</button>
              </form>
            </div>
          </div>
        </div>
        <div>
          <Dialog open={this.state.open} />
        </div>
      </div>
    );
  }
}
