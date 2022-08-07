import { useMemo, useState } from "react";

const Header = ({ links, brand, searchHandler }) => {
  const [mobile, setMobile] = useState(false);
  const windowWidth = window.screen.width;
  const isMobile = useMemo(() => !(windowWidth >= 768), [windowWidth]);
  const [searchText, setSearchText] = useState("");

  const MobileSearch = isMobile ? (
    <div className="header_content">
      <div className="header_search br-full">
        <input
          type="text"
          placeholder="search"
          className="header_searchBar"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="header_searchBtn"
          onClick={() => searchHandler(searchText)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  ) : (
    ""
  );

  const DesktopSearch = !isMobile ? (
    <div className="header_content">
      <div className="header_search br-full">
        <input
          type="text"
          placeholder="search"
          className="header_searchBar"
          onChange={(e) => setSearchText(e.target.value)}
        />

        <button
          className="header_searchBtn"
          onClick={() => searchHandler(searchText)}
        >
          <i className="fas fa-search"></i>
        </button>
      </div>
    </div>
  ) : (
    ""
  );

  return (
    <header className="header">
      <div className="header_brand">{brand}</div>

      {DesktopSearch}

      <button
        className={`header_toggle ${mobile ? "header_toggle--active" : ""}`}
        onClick={() => setMobile((prev) => !prev)}
        style={{ display: `${isMobile ? "flex" : "none"}` }}
      >
        <span className="header_burger"></span>
        <span className="header_burger"></span>
        <span className="header_burger"></span>
      </button>

      <div
        className={`header_links ${isMobile ? "header_linksMobile" : ""} ${
          mobile ? "header_links--active" : ""
        }`}
      >
        <div>
          {links?.map((entry, index) => {
            return (
              <div className="header_link" key={index}>
                {entry}
              </div>
            );
          })}
        </div>
        <div className="header_link">{MobileSearch}</div>
      </div>
    </header>
  );
};

export default Header;
