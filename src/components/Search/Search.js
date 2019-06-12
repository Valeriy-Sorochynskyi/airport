import React from "react";

const Search = ({ onSubmit }) => {
  // Почитай за роботу з формами https://reactjs.org/docs/forms.html
  let textInput = React.createRef();
  return (
    <div className="flights-search-container">
      <div className="flights-search">
        <div className="search">
          <h2 className="title">search flights</h2>
          <div className="search-input-container">
            <form
              action="/"
              className="search-form"
              onSubmit={event => onSubmit(event, textInput)}
            >
              <span className="icon">
                <i className="fa fa-search" />
              </span>
              <input
                type="search"
                id="search"
                placeholder="Destination or flight #"
                ref={textInput}
              />
              <button
                onClick={event => onSubmit(event, textInput)}
                className="button"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
