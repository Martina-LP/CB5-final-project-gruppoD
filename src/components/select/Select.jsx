import styles from "./styles.module.scss";
import { useContext, useState } from "react";
import { ApplicationCtx } from "../../store";

const options = [
  {
    id: 1,
    value: "antonella",
    title: "Captain Anto",
    image: "./antonella.png",
  },
  {
    id: 2,
    value: "carlotta",
    title: "Iron Carly",
    image: "./carlotta.png",
  },
  {
    id: 3,
    value: "francesca",
    title: "Fantastic Fra",
    image: "./francesca.png",
  },
  {
    id: 4,
    value: "martina",
    title: "Wonder Marty",
    image: "./martina.png",
  },
  {
    id: 5,
    value: "davin",
    title: "Hulk Davy",
    image: "./davin.png",
  },
];

export default function Select() {
  const { dispatch } = useContext(ApplicationCtx);
  const [avatarId, setAvatar] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = async (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    await dispatch({ type: "SET_AVATAR", payload: option.id });
  };

  return (
    <div className={styles.Select}>
      <div onClick={handleToggle} className={styles.SelectedOption}>
        {selectedOption ? (
          <>
            <span>{selectedOption.title}</span>
            <img src={selectedOption.image} alt={selectedOption.title} />
          </>
        ) : (
          "Select..."
        )}
      </div>
      {isOpen && (
        <div className={styles.Options}>
          {options.map((option) => (
            <div
              value={avatarId}
              onChange={(option) => setAvatar(() => option.target.value)}
              key={option.id}
              onClick={() => handleSelectOption(option)}
              className={styles.Option}
            >
              <span>{option.title}</span>
              <img src={option.image} alt={option.title} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
