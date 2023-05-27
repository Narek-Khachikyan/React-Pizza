import axios from "axios";
import { FC, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./FullPizza.module.scss";

const FullPizza: FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    descr: string;
    price: number;
    sizes: string[];
    types: string[];
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://645f2f137da4477ba9528391.mockapi.io/items/${id}`
        );
        setPizza(data);
      } catch (error) {
        alert("Something went wrong");
        navigate("/");
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Loading...</>;
  }

  const types: { [key: string]: string } = {
    thin: "Thin",
    traditional: "Traditional",
  };

  return (
    <div className="container">
      <div className={style.content}>
        <div className={style.pizzaImg}>
          <img src={pizza.imageUrl} alt="" />
        </div>

        <div className={style.textWrapper}>
          <h2 className={style.title}>{pizza.title}</h2>
          <ul className={style.list}>
            {pizza.types.map((type: string) => (
              <li key={type}>{types[type]}</li>
            ))}
          </ul>
          <ul className={style.list}>
            Sizes:{" "}
            {pizza.sizes.map((size: string, index: number) => (
              <li key={index}>{size}</li>
            ))}
          </ul>
          <p className={style.descr}>{pizza.descr}</p>
          <h4 className={style.price}>{pizza.price} AMD</h4>
        </div>
      </div>
    </div>
  );
};

export default FullPizza;
