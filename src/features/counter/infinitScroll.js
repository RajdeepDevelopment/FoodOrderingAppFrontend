import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { MoonLoader } from "react-spinners";

const Test = () => {
  const [productData, setproductData] = useState([]);
  const [isBottom, setIsBottom] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);
  const [NoMoreData, setNoMoreData] = useState(true);
  const handleScroll = (event) => {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      setIsBottom(true);
    } else {
      setIsBottom(false);
    }
  };

  useEffect(() => {
    const container = document.getElementById("ContainerId");

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);
  async function fetchDataFunctionIniTial(page) {
    try {
      const response = await fetch(
        `http://localhost:8080/products?_page=${page}&_limit=4`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();

      setproductData(data);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  }
  async function fetchDataFunctionPush(page) {
    try {
      const response = await fetch(
        `http://localhost:8080/products?_page=${page}&_limit=4`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      setTimeout(() => {
        setproductData((prevData) => [...prevData, ...data]);
        if (data.length === 0) {
          setNoMoreData(false);
        }
      }, 1000);
    } catch (error) {
      console.error("There was a problem fetching the data:", error);
    }
  }

  useEffect(() => {
    fetchDataFunctionIniTial(1);
  }, []);

  if (isBottom && NoMoreData) {
    setcurrentPage(currentPage + 1);
    fetchDataFunctionPush(currentPage + 1);

    setIsBottom(false);
  }

  return (
    <div>
      <h1> {productData.length + ""} </h1>
      <div
        id="ContainerId"
        className=" container mt-4 p-3 bg-dark"
        style={{ height: "760px", width: "500px", overflowY: "auto" }}
      >
        <div className="row">
          {productData.map((product, index) => (
            <div className={`col-12 `} key={product.id + index}>
              <Link
                to={`/ProductOverview/${product.id}`}
                className="text-decoration-none"
              >
                <div
                  className={`card mb-4 ${
                    product.category === "non-vegetarian" ? "non-veg" : "veg"
                  }`}
                >
                  <img
                    src={product.thumbnail}
                    alt="Product Card"
                    className="card-img-top img-fluid"
                    style={{ maxHeight: "200px" }}
                  />
                  <div className="card-body">
                    <h5
                      className={`card-title ${
                        product.category === "non-vegetarian"
                          ? "text-non-veg"
                          : "text-veg"
                      }`}
                      style={{
                        height: "20px",
                        maxWidth: "200px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {product.name}
                    </h5>

                    <StarRatings
                      rating={product.rating}
                      starRatedColor="gold"
                      starEmptyColor="white"
                      numberOfStars={5}
                      name="rating"
                      starDimension="17px"
                      starSpacing="0px"
                    />

                    <div className="d-flex justify-content-between align-items-center">
                      <div className="discount-price">
                        <p className="discount-text">
                          {product.discountPercentage}% OFF
                        </p>
                      </div>
                      <div className="price-rating">
                        <p
                          className={`price ${
                            product.category === "non-vegetarian"
                              ? "text-non-veg-price"
                              : "text-veg-price"
                          }`}
                        >
                          ${product.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          <div className="bhag">
            {NoMoreData && <MoonLoader color="#d63636" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
