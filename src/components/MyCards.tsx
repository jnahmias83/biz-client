import { FunctionComponent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "../interfaces/Card";
import { deleteCard, getMyCards } from "../services/cardsService";
import { errorMsg, successMsg } from "../services/feedbacksService";
import { getIsAdmin, getIsLogged } from "../services/usersService";
import Navbar from "./Navbar";

interface MyCardsProps {}

const MyCards: FunctionComponent<MyCardsProps> = () => {
  const [isChanged,setIsChanged] = useState<boolean>(false)
  const [myCards, setMyCards] = useState<Card[]>([]);
  useEffect(() => {
    getMyCards()
      .then((result) => setMyCards(result.data))
      .catch((err) => errorMsg(err.message.data));
  },[isChanged]);

  const handleDelete = (card: Card) => {
    if (window.confirm(`Are you sure you want to delete ${card.name}?`)) {
      deleteCard(card)
        .then((result) => {
          setIsChanged(!isChanged);
          successMsg(result.data);
        })
        .catch((err) => errorMsg(err));
    }
  };

  return (
    <>
      <Navbar isLogged={getIsLogged()} isAdmin={getIsAdmin()} />
      <h1 className="display-5 text-center my-3">My Cards</h1>
      <div className="row gap-4 m-4">
        {myCards.length ? (
          myCards.map((card: Card) => (
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
                <p className="card-text">Address: {card.address}</p>
                <p className="card-text">Phone: {card.phone}</p>

                {getIsAdmin() ? (
                  <>
                    <Link to={`/mycards/${card._id}`} className="btn btn-warning mx-1">
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                    <a
                      onClick={() => {
                        handleDelete(card);
                      }}
                      className="btn btn-danger mx-1"
                    >
                      <i className="fa-solid fa-trash"></i>
                    </a>
                  </>
                ) : null}
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

export default MyCards;
