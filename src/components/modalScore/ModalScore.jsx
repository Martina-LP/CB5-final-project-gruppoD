import { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouseChimneyUser } from "@fortawesome/free-solid-svg-icons";

import { database } from "../../utils/firebase";
import { onValue, ref } from "firebase/database";
import FireworksComponent from "../fireworks/Fireworks";
import background from "./background.webm";
import { writeDb } from "../../utils/writeDb";

import { MdSportsScore } from "react-icons/md";

import FireworksComponent from "../fireworks/Fireworks";
import background from "./background.gif";

const ModalScore = ({ score }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setTimeout(() => setShowModal(true), 180000);
    const starCountRef = ref(database);

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      const { scoreboard } = data;
      setScores(scoreboard);
    });
  }, []);

  const handleButtonClick = () => {
    navigate("/");
  };
  const aggiungiGiocatore = () => {
    const newPlayer = {
      avatar: 1,
      m1: 12,
      m2: 10,
      m3: 5,
      score: 27,
      name: "Pippo",
    };

    writeDb(newPlayer, score);
  };

  const scoreButtonClick = () => {
    navigate("/leaderBoard");
  };

  return (
    <>
      {showModal && (
        <div className={styles.Modal}>
          <img src={background} className={styles.background} />
          <FireworksComponent />
          <div className={styles.modalContent}>
            <h2 className={styles.Title}>Time's Up!</h2>
            <h3 className={styles.Content}>
              Your score is: <span className={styles.Score}>{score}</span>
            </h3>
            <div className={styles.btnContainer}>
              <button className={styles.BtnHome} onClick={handleButtonClick}>
                <FontAwesomeIcon icon={faHouseChimneyUser} />
              </button>
              <button className={styles.btnScore} onClick={scoreButtonClick}>
                <Link className={styles.link} to="/leaderBoard">
                  <h4>Leaderboard</h4>{" "}
                  <span>
                    <MdSportsScore />
                  </span>
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalScore;
