import { Component } from "react";
import "./card.styles.css";

class Card extends Component {
    render() {
        const { id, name, email, img, imgAlt } = this.props;
        return <div className="card-container" key={id}>
            <img alt={imgAlt} src={img} />
            <p>{name}</p>
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    }
}

export default Card;