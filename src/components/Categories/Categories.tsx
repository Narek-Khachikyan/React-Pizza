import { FC } from "react";
import "./Categories.scss";
import { useWhyDidYouUpdate } from "ahooks";

type CategoriesPropsType = {
  value: number;
  onClickCategory: (i: number) => void;
};

const categories = ["All", "Meat", "Vegetarian", "Grill", "Spicy", "Closed"];

const Categories: FC<CategoriesPropsType> = ({ value, onClickCategory }) => {
  useWhyDidYouUpdate("Categories", { value, onClickCategory });
  return (
    <div className="categories">
      <ul>
        {categories.map((categoryName, i) => (
          <li
            key={i}
            onClick={() => onClickCategory(i)}
            className={value === i ? "active" : ""}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
