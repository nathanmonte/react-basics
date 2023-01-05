import { Component } from "react";
import "./search-box.styles.css";

const SearchBoxFunctional = ({ onChangeHandler, placeholder, className }) => {

    return <input
        className={"search-box " + className}
        type="search"
        placeholder={placeholder}
        onChange={onChangeHandler} />;
}

class SearchBox extends Component {
    render() {
        const { onChangeHandler, placeholder, className } = this.props;

        return <input
            className={"search-box " + className}
            type="search"
            placeholder={placeholder}
            onChange={onChangeHandler} />;
    }
}
export default SearchBoxFunctional;