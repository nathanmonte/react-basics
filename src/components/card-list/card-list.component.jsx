import { Component } from "react";
import "./card-list.styles.css";
import Card from "../card/card.component";

class CardList extends Component {

    render() {

        const {monsters} = this.props;

        return (<div className="card-list">{
            monsters.map(monster => {
                const {id, name, email} = monster;
                return <Card id={id} name={name} email={email} key={id} imgAlt={"monster " + name} img={`https://robohash.org/${id}?set=set2&size=180x180`}/>
            })
        }</div>)
    }
}

export default CardList;