import React, {Component} from "react";
import axios from "axios";

export default class Fib extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: "",
  };
  componentDidMount() {
    this.fetchValues();
    this.fetchIndexs();
  }
  async fetchValues() {
    const values = await axios.get("/api/values/current");
    this.setState({values: values.data});
  }
  async fetchIndexs() {
    const seenIndexes = await axios.get("/api/values/all");
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  }
  handleSubmit = async e => {
    e.preventDefault();
    await axios.post("/api/values", {
      index: this.state.index,
    });
    this.setState({index: ""});
  };
  renderSeenIndexs() {
    return this.state.seenIndexes.map(({number}) => number).join(",");
  }
  renderValues() {
    const entries = [];
    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For Index {key} I Calculated {this.state.values[key]}
        </div>
      );
    }
    return entries;
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={e => this.setState({index: e.target.value})}
          />
          <button>Submit</button>
        </form>
        <h3>Indexes I Have Seen:</h3>
        {this.renderSeenIndexs()}
        <h3>Calculated Values:</h3>
        {this.renderValues()}
      </div>
    );
  }
}
