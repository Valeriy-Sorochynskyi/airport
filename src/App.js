import React, { Component } from "react";
import { getData } from "./api/api";
import { currentDay } from "./services/service";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import Table from "./components/Table/Table";

class App extends Component {
  state = {
    data: null,
    searchValue: "",
    status: "departure",
    day: "today"
  };

  componentDidMount() {
    const day = this.defineDayDate(this.state.day);
    getData(day).then(data => {
      this.setState({
        data,
        filteredData: this.getDataByStatus(this.state.status, this.state.data)
      });
    });
  }

  defineDayDate = day => {
    if (day === "yesterday") return currentDay(-1);
    if (day === "tomorrow") return currentDay(1);
    return currentDay(0);
  };

  componentDidUpdate(prevProp, prevState) {
    if (prevState.day !== this.state.day) {
      const day = this.defineDayDate(this.state.day);
      getData(day).then(data => {
        this.setState({ data });
      });
    }
  }

  handleSubmit = (event, textInput) => {
    event.preventDefault();
    this.setState({ searchValue: textInput.current.value });
  };

  switchTabTo = type => {
    if (this.state.status === type) return;
    this.setState({ status: type });
  };

  getDataByStatus = (status, data) => {
    if (!data) return null;
    if (status === "departure") {
      return data.departure;
    } else return data.arrival;
  };

  handleDayTabTo = day => {
    if (this.state.day === day) return;
    this.setState({
      data: null,
      day: day
    });
  };

  filteredList = (list, searchValue) => {
    if (list) {
      return list.filter(item => {
        return (
          (item["airportToID.name_en"] &&
            item["airportToID.name_en"]
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          (item["airportFromID.name_en"] &&
            item["airportFromID.name_en"]
              .toLowerCase()
              .includes(searchValue.toLowerCase())) ||
          item.codeShareData[0].codeShare
            .toLowerCase()
            .includes(searchValue.toLowerCase())
        );
      });
    } else {
      return null;
    }
  };

  render() {
    const { status, data, day, searchValue } = this.state;
    let list = this.getDataByStatus(status, data);
    const activeDep = status === "departure" ? "active" : "";
    const activeArr = status === "arrival" ? "active" : "";
    list = this.filteredList(list, searchValue);
    return (
      <>
        <Header />
        <div className="main-container">
          <Search onChange={this.handleInput} onSubmit={this.handleSubmit} />
          <div className="search-results">
            <div className="main-tabs">
              <ul className="tabs">
                <li
                  className={`tabs-item ${activeDep}`}
                  onClick={() => this.switchTabTo("departure")}
                >
                  <span className={`tabs-item-link ${activeDep}`}>
                    departures
                  </span>
                </li>
                <li
                  className={`tabs-item ${activeArr}`}
                  onClick={() => this.switchTabTo("arrival")}
                >
                  <span className={`tabs-item-link ${activeArr}`}>
                    arrivals
                  </span>
                </li>
              </ul>
              <div className="tabs-container">
                <div className="date-wrap">
                  <div className="dates-container">
                    <div
                      className={`date yesterday ${
                        day === "yesterday" ? "active" : ""
                      }`}
                      onClick={() => this.handleDayTabTo("yesterday")}
                    >
                      <div className="date-num">{currentDay(-1)}</div>
                      <div className="date-title">Yesterday</div>
                    </div>
                    <div
                      className={`date today ${
                        day === "today" ? "active" : ""
                      }`}
                      onClick={() => this.handleDayTabTo("today")}
                    >
                      <div className="date-num">{currentDay(0)}</div>
                      <div className="date-title">Today</div>
                    </div>
                    <div
                      className={`date tomorrow ${
                        day === "tomorrow" ? "active" : ""
                      }`}
                      onClick={() => this.handleDayTabTo("tomorrow")}
                    >
                      <div className="date-num">{currentDay(1)}</div>
                      <div className="date-title">Tomorrow</div>
                    </div>
                  </div>
                </div>
                {data ? <Table data={list} status={status} /> : "Loading..."}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
