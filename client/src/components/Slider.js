import { useEffect, useState } from "react";

const Slider = ({ list, slideShow, type }) => {
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  const navigateType = type;

  const ForwardClick = () => {
    setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };
  const BackwardClick = () => {
    setIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  useEffect(() => {
    let interval = setInterval(() => {
      setIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
    }, slideShow);
    if (!slideShow) {
      clearInterval(interval);
    }

    if (hover) clearInterval(interval);

    return () => {
      clearInterval(interval);
    };
  }, [list.length, slideShow, hover]);

  return (
    <div
      className="slider"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className="slider_slide"
        style={{
          transform: `translate3d(-${(100 / list.length) * index}%,0,0)`,
        }}
      >
        {list.map((entry, i) => {
          return (
            <div className="slider_item" key={i}>
              {entry}
            </div>
          );
        })}
      </div>
      {(navigateType === "buttons" || navigateType === "both") && (
        <div className="slider_buttons">
          <button className="slider_button1" onClick={BackwardClick}>
            <i className="fas fa-chevron-left"></i>
          </button>
          {(navigateType === "dots" || navigateType === "both") && (
            <div className="slider_dots">
              {list.map((entry, i) => {
                return (
                  <i
                    key={i}
                    className={`${i === index ? "fas" : "far"} fa-circle`}
                    onClick={() => setIndex(i)}
                  ></i>
                );
              })}
            </div>
          )}
          <button className="slider_button2" onClick={ForwardClick}>
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Slider;
