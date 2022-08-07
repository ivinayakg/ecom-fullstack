import "./components.css";

const Badge = ({ children, badgeContent, className, ClickHandler }) => {
  return (
    <div className={`badge ${className}`} onClick={() => ClickHandler()}>
      <div
        className={`badge_icon ${
          badgeContent && badgeContent !== "" ? "" : "badge_icon--noContent"
        }`}
      >
        {badgeContent}
      </div>
      {children}
    </div>
  );
};

export default Badge;
