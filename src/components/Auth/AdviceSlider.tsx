import classNames from "classnames";
import { useState } from "react";

type AdviceItem = {
  id: number;
  label: string;
  content: string;
  active: boolean;
};

interface AdviceSliderProps {
  classStyles?: string;
}

export default function AdviceSlider(props: AdviceSliderProps) {
  const [adviceList, setAdviceList] = useState<AdviceItem[]>([
    {
      id: 1,
      label: "5x",
      content:
        "Acquiring a new customer is 5x more costly than making an unhappy customer happy",
      active: true,
    },
    {
      id: 2,
      label: "1x",
      content:
        "Acquiring a new customer is 5x more costly than making an unhappy customer happy",
      active: false,
    },
    {
      id: 3,
      label: "2x",
      content:
        "Acquiring a new customer is 5x more costly than making an unhappy customer happy",
      active: false,
    },
    {
      id: 4,
      label: "4x",
      content:
        "Acquiring a new customer is 5x more costly than making an unhappy customer happy",
      active: false,
    },
    {
      id: 5,
      label: "3x",
      content:
        "Acquiring a new customer is 5x more costly than making an unhappy customer happy",
      active: false,
    },
  ]);

  const setActiveAdvice = (id: number) => {
    setAdviceList(
      adviceList.map((item) => ({
        ...item,
        active: item.id === id,
      }))
    );
  };

  return (
    <div className={classNames("advice-slider", props.classStyles)}>
      <div className="advice-slider__list">
        {adviceList.map((adviceItem) => (
          <div
            className={classNames("advice-slider__item", {
              "is-active": adviceItem.active,
            })}
            key={adviceItem.id}
          >
            <div className="advice-slider__label">{adviceItem.label}</div>
            <div className="advice-slider__content">{adviceItem.content}</div>
          </div>
        ))}
      </div>

      <div className="advice-slider__point-list">
        {adviceList.map((adviceItem) => (
          <div
            className={classNames("advice-slider__point-item", {
              "is-active": adviceItem.active,
            })}
            key={adviceItem.id}
            onClick={() => setActiveAdvice(adviceItem.id)}
          ></div>
        ))}
      </div>
    </div>
  );
}
