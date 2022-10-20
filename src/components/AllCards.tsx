import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { getAllCards } from "../services/cardsService";
import { errorMsg } from "../services/feedbacksService";
import { getIsAdmin, getIsLogged } from "../services/usersService";
import Navbar from "./Navbar";

interface AllCardsProps {}

const AllCards: FunctionComponent<AllCardsProps> = () => {
  const [cards, setCards] = useState<Card[]>([]);
  useEffect(() => {
    getAllCards()
      .then((result) => {
        console.log(result.data);
        setCards(result.data)
      })
      .catch((err) => errorMsg(err.message.data));
  });

  return (
    <>
      <Navbar isLogged={getIsLogged()} isAdmin={getIsAdmin()} />
      <h1 className="display-5 text-center my-3" style={{color:"black"}}>All Cards</h1>
      <div className="row gap-4 m-4">
        {cards.length ? (
          cards.map((card: Card) => (
            <div
              key={card._id}
              className="card col-md-6 col-12"
              style={{ width: "18rem" }}
            >
              <img src={card.image} alt="Basa" className="card-img-top" />
              <div className="card-body">
                <h6 className="text-secondary">{card.name}</h6>
                <small className="card-title">{card.description}</small>
                <br/><br/>
                <p className="card-text"><strong>Address:</strong> {card.address}</p>
                <p className="card-text"><strong>Phone:</strong> {card.phone}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No cards</p>
        )}
      </div>
    </>
  );
};

export default AllCards;
