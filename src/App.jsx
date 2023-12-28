import { useState } from "react";
import "./index.css";
import BaseCheese from "./assets/BaseCheese.png";
import PizzaBase from "./assets/PizzaBase.png";
import tomatoImage from "./assets/tomato-modified.png";
import pepperoniImage from "./assets/pepparoni-modified.png";
import mushroomImage from "./assets/mushroom-modified.png";

const CustomPizzaBuilder = () => {
  const [toppingAmounts, setToppingAmounts] = useState({
    sauce: 0,
    tomato: 0,
    pepperoni: 0,
    mushrooms: 0,
  });

  const [tomatoPosition, setTomatoPosition] = useState([]);
  const [pepperoniPosition, setPepperoniPosition] = useState([]);
  const [mushroomPosition, setMushroomPosition] = useState([]);

  const addToppings = (topping, positionState) => {
    const newToppingPositions = Array.from(
      { length: toppingAmounts[topping] * 5 },
      () => ({
        top: `${Math.floor(Math.random() * 100)}%`,
        left: `${Math.floor(Math.random() * 100)}%`,
      })
    );
    positionState(newToppingPositions);
  };

  const handleToppingAmountChange = (topping, amount, positionState) => {
    setToppingAmounts({
      ...toppingAmounts,
      [topping]: amount,
    });
    if (amount > 0) {
      addToppings(topping, positionState);
    } else {
      positionState([]);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        backgroundColor: "black",
        color: "white",
        height: "100vh",
      }}
    >
      {/* Div for Range Inputs*/}
      <div style={{ width: "50%", margin: "10px" }}>
        <h2>Make Your Own Custom Pizza</h2>
        <div>
          {/* displaying all topping here using map function */}
          {Object.keys(toppingAmounts).map((topping) => (
            <div key={topping} style={{ marginBottom: "20px" }}>
              <label>
                {topping}: {toppingAmounts[topping]}
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={toppingAmounts[topping]}
                  onChange={(e) =>
                    handleToppingAmountChange(
                      topping,
                      parseInt(e.target.value, 10),
                      (positionState) => {
                        switch (topping) {
                          case "tomato":
                            setTomatoPosition(positionState);
                            break;
                          case "pepperoni":
                            setPepperoniPosition(positionState);
                            break;
                          case "mushrooms":
                            setMushroomPosition(positionState);
                            break;
                          default:
                            break;
                        }
                      }
                    )
                  }
                />
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Div for Pizza Preview */}
      <div style={{ width: "50%", height: "auto" }}>
        <div className="pizza">
          <img src={BaseCheese} alt="image" className="pizza-base" />

          <img
            src={PizzaBase}
            alt="image"
            className="pizza-sauce"
            style={{ transform: `scale(${toppingAmounts.sauce * 0.1})` }}
          />

          <div className="parent">
            {tomatoPosition.map((position, index) => (
              <div key={`tomato-${index}`}>
                <img
                  src={tomatoImage}
                  style={{
                    position: "absolute",
                    backgroundColor: "tomato",
                    top: position.top,
                    left: position.left,
                    zIndex: "3",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
            ))}

            {pepperoniPosition.map((position, index) => (
              <div key={`pepperoni-${index}`}>
                <img
                  src={pepperoniImage}
                  style={{
                    position: "absolute",
                    padding: "5px",
                    top: position.top,
                    left: position.left,
                    zIndex: "3",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
            ))}

            {mushroomPosition.map((position, index) => (
              <div key={`mushroom-${index}`}>
                <img
                  src={mushroomImage}
                  style={{
                    position: "absolute",
                    padding: "5px",
                    top: position.top,
                    left: position.left,
                    zIndex: "3",
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPizzaBuilder;
