

import logo from './logo.svg';
import './App.css';
import { Component, useState, useEffect } from "react";
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';


const AppFunctional = () => {
  /**
   * Use state returns the state value.
   * If the same value is present then the function won't be run.
   * When the state value changes the logic is rerun.
   * 
   * When do we need to rerun the entire function? Not lifecycle thinking.
   * 
   * Circular loop can be created when pulling from the API as each new array is a brand new array in memory.
   * This new data causes a render for a new array, and so on and so on.
   */
  const [searchField, setSearchField] = useState("a"); // Value, setter function
  const [monsters, setMonsters] = useState([]);
  const [title, setTitle] = useState("");
  const [filteredMonsters, setFilteredMonsters] = useState([]);

  console.log("Render");
  // Makes use of the set search field state hook.
  const onSearchChange = (event) => {
    const searchFieldString =  event.target.value;
    setSearchField( searchFieldString );
  }
  const onTitleChange = (event) => {
    const searchFieldString =  event.target.value.length > 0 ? event.target.value : "Monsters rolodex";

    setTitle( searchFieldString );
  }

  // Makes use of the setMonsters state hook.
  const getMonsters = () => {
    fetch("https://jsonplaceholder.typicode.com/users").then(data => data.json()).then(monsters => {
      setMonsters(monsters);
    });
  }

  // Makes use of the setFilteredMonsters state hook.
  const filterMonsters = () => {
    const newFilteredMonsters = monsters.filter(monster => {
      let regex = new RegExp(searchField, "i");
      return monster.name.match(regex);
    });
    setFilteredMonsters(newFilteredMonsters);
  }

  // Method and dependencies (data or prop values); Run the callback if the data changes.
  // No dependencies as there is no reason to recall from the API.
  useEffect(getMonsters, []) 

  // Doing this prevents running the filter logic on every render when we only care about the monsters or searchField data changing.
  useEffect(filterMonsters, [searchField, monsters]);
  

  return (
    <div className="App">
      <h1 className="app-title">{title}</h1>
      <SearchBox className="monsters-search-box" placeholder="Find a monster" onChangeHandler={(event) => onSearchChange(event)}></SearchBox> 
      <br />
      <SearchBox className="title-search-box" placeholder="Page title" onChangeHandler={(event) => onTitleChange(event)}></SearchBox> 
      <CardList monsters={filteredMonsters}></CardList>
    </div>
  );
}

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

export default AppFunctional;
