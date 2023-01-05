import logo from './logo.svg';
import './App.css';
import { Component } from "react";
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {

  /**
   * Called first.
   */
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchString: ""
    }
    console.log("Constructor")
  }

  getMonsters() {
    fetch("https://jsonplaceholder.typicode.com/users").then(data => data.json()).then(monsters => {
      this.setState(() => {
        return { monsters };
      })
    });
  }



  setName() {
    /** 
     * This uses a shallow merge.
     * This is done asynchronously.
     */
    // this.setState({name: {firstName: "Bill", lastName: "Bailey"}});

    /** 
     * This is the same as setState above but with access to:
     * State and props.
     * Callback.
     */
    this.setState((state, props) => {
      return { name: { firstName: "Bill", lastName: "Bailey" } };
    }, () => {
      // This is callback executed on update to state.
      console.log(this.state);
    });

  }

  onSearchChange(event) {
    this.setState(() => ({searchString: event.target.value}));
  }

  /**
   * Called third.
   */
  componentDidMount() {
    console.log("componentDidMount")
    this.getMonsters();
  }

  /**
   * 
   * Called second.
   */
  render() {
    console.log("Render");

    /**
     *  This approach removes the need for a class variable for holding 
     *  the filtered list of monsters as the state of the monsters isn't changed.
     * The filtered list is simply created at the moment of render.
     */
    const {monsters, searchString} = this.state;

    let filteredMonsters = monsters.filter(monster => {
      let regex = new RegExp(searchString, "i");
      return monster.name.match(regex);
    });

    // input, h1, h2 - Components.
    // className not class as jsx extends js and class is protected.
    // We keep the search string each time so that it can be used above on render.
    // Store the thing that matters.

    // TODO: It shouldn't be necessary to create an anonymous function wrapping the onSearchChange handler.
    return (
      <div className="App">
        <h1 className="app-title">Monsters Rolodex</h1>
        <SearchBox className="monsters-search-box" placeholder="Search me baby" onChangeHandler={(event) => this.onSearchChange(event)}></SearchBox>
        <CardList monsters={filteredMonsters}></CardList>
      </div>
    );
  }

}

export default App;
