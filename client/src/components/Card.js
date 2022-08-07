const Card = ({ type, gradient, data, classname, noButtons }) => {
  let typeCard = `card--${type}`;

  return (
    <div
      className={`card ${
        gradient && "card--gradient"
      } ${typeCard} ${classname}`}
    >
      <div className="card_imggradient">
        <img
          loading="eager"
          className="card_imggradient_img"
          src={data.img ? data.img : "https://picsum.photos/500/350"}
          alt=""
        />
      </div>
      <header className="card_header">
        <h3>{data.title ?? "Hello World"}</h3>
        {data.subtitle && <h4>{data.subtitle}</h4>}
      </header>
      <span className="card_content">
        {data.para ??
          "Lorem ipsum dolor sit, amet consectetur adipisicing elit."}
      </span>
      {!noButtons && (
        <div className="card_btnBox">
          <div className="card_btnBox_box1">
            <button>Action 1</button>
            <button>Action 2</button>
          </div>
          <div className="card_btnBox_box2">
            <button>
              <i className="fas fa-heart"></i>
            </button>
            <button>
              <i className="fas fa-share-alt"></i>
            </button>
            <button>
              <i className="fas fa-ellipsis-v"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Card;
