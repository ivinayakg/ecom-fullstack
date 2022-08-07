import Card from "../components/Card";
import Slider from "../components/Slider";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetData } from "../API";

const Home = () => {
  //these are the contents of the slider
  const SlideShowList = [
    <img src="/assets/slider-img 1.jpg" alt="" />,
    <img src="/assets/slider-img 2.jpg" alt="" />,
    <img src="/assets/slider-img 3.jpg" alt="" />,
    <img src="/assets/slider-img 4.jpg" alt="" />,
  ];

  const [catergories, setCatergories] = useState([]);

  useEffect(() => {
    GetData("/categories").then((data) => setCatergories(data.categories));
  }, []);

  const navigate = useNavigate();

  // these are the props passed down to the cards responsible for brands
  //this object is gonna get spread and every key will be passed down to the component as a prop
  const brandCardProps = {
    classname: "brand",
    data: {
      title: <p onClick={() => navigate("/shop/filterbyBrand=none")}>Shop</p>,
    },
    gradient: true,
    noButtons: true,
    type: "text-over",
  };

  //same for this
  const collectionCardProps = {
    data: { title: "Product Collection", para: "View More ->" },
    type: "",
    classname: "collection_card",
    noButtons: true,
  };

  return (
    <>
      <div className="section hero">
        <Slider type={"both"} list={SlideShowList} slideShow={2000} />
      </div>
      <div className="section catergories flex-col">
        <div className="container flex-wrap gap">
          <Card {...collectionCardProps} />
          <Card {...collectionCardProps} />
        </div>
        <div className="container flex-wrap gap mt3">
          {/* mapping throught the brands */}
          {catergories.map((entry) => {
            return (
              <Card
                key={entry._id}
                {...brandCardProps}
                data={{
                  title: (
                    <p
                      onClick={() =>
                        navigate(`/shop/filterbyBrand=${entry.categoryName}`)
                      }
                    >
                      {entry.categoryName}
                    </p>
                  ),
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
