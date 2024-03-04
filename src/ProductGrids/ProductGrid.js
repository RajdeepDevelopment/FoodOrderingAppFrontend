import {
  memo,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";

import AOS from "aos";
import "leaflet/dist/leaflet.css";
import "aos/dist/aos.css";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import Draggable from "react-draggable";
import ChatBox from "../Chats/chatBox";
import { useMediaQuery } from "react-responsive";
import StarRatings from "react-star-ratings";

import {
  getCartDataAsync,
  getCategoryDataAsync,
  getCreateUserAddressAsync,
  getCuisineDataAsync,
  getEventObjectDataAsync,
  getEventObjectPostDataAsync,
  getNotifitationDataAsync,
  getPreviousUserDataAsync,
  getPriceRangeDataAsync,
  getProductDataAsync,
  getProductForLocationAsync,
  getProductPostAsync,
  getUpdateEventObjectDataAsync,
  getUpdateProductAsync,
  getUpdateUserAddressAsync,
  getsearchdataResetAsync,
  getuniqueRestaurantDataAsync,
  selectCategoryData,
  selectCuisineData,
  selectPreParams,
  selectPreviousUserData,
  selectPriceRangeData,
  selectProducts,
  selectTotalProducts,
  selecteventObjectData,
  selectprevCompleteData,
  selectsearchBarIndicator,
  selectsearchdata,
  selectuser,
  setLongiLatitAsync,
} from "../features/counter/counterSlice";
import { images, sortOptions, Fmvalidater, getErrorMessage, ProductsDataShema,options, indianTime, convertToKg, funSetValue } from "./Hooks";
import categorySvg from "./img/categorySvg";
import Select from 'react-select';
const date = new Date();
export function ScrollTotop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
const ProductGrid = memo(function ProductGrid() {
  //Selectors For Redux Thunk

  const dispatch = useDispatch();
  const currentUser = useSelector(selectuser);
  const previousUserdata = useSelector(selectPreviousUserData);
  const EventObjectData = useSelector(selecteventObjectData);
  const PrevcompleteInti = useSelector(selectprevCompleteData);
  const searchBrinticator = useSelector(selectsearchBarIndicator);
  const searchResults = useSelector(selectsearchdata);
  const products1 = useSelector(selectProducts);
  const prevParamsData = useSelector(selectPreParams);
  const totalProductsLength =  useSelector(selectTotalProducts)
  const CuisineData =  useSelector(selectCuisineData)
  const PriceRangeData =  useSelector(selectPriceRangeData)
  const CategoryData =  useSelector(selectCategoryData)

  // selectCuisineData, selectPriceRangeData, selectCategoryData
  //Selectors For Redux Thunk............

  // States variable

  const [currentpage, setcurrentpage] = useState(1);
  const [indexFilter, setindexFilter] = useState(0);
  const [locCpmplete, setlocComplete] = useState(false);
  const [noFilter, setnoFilter] = useState(false);
  const [ChatOpen, setChatOpen] = useState(false);
  const [popBarsize, setpopBarsize] = useState(50);
  const [stopReload, setstopReload] = useState(true);
  const [lati, setlati] = useState(-1);
  const [longi, setlongi] = useState(-1);
  const [currentPageProduct, setcurrentPageProduct] = useState(products1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [open, setOpen] = useState(null);
  const [AddProductFm, setAddProductFm] = useState(false);
  const [editObjectIndex, setEditObjectIndex] = useState(-1);
  const [editProductId, setEditProductId] = useState(-1);
  const [notRerun, setnotRerun] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);
  const [editBarActive, seteditBarActive] = useState(false);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(10);
  const [sort, setSort] = useState("");
  const [priceRange, setPricerange] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [filters, setFilters] = useState([]);

useEffect(()=>{
  console.log("filters", filters)
}, [filters])
  // States Variable........

  //normal variable
  let eventRunning = false;
  let lg = -1;
  let lo = -1;

  //normal Variable..............


  useEffect(()=>{
     setFilters ( [
      {
        id: "cuisine",
        name: "Cuisine",
        options: CuisineData?.data,
      },
      {
        id: "category",
        name: "Category",
        options: CategoryData?.data,
      },
      {
        id: "price",
        name: "Price Range",
        options: PriceRangeData?.data,
      },
    ])
  }, [CuisineData, PriceRangeData, CategoryData])

  // Form management
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  //Form management............

  useEffect(() => {
    if (previousUserdata.length !== 0) {
      dispatch(getNotifitationDataAsync(previousUserdata[0]?.userid));
    }
  }, [previousUserdata]);

  useEffect(() => {
    if (currentUser && currentUser?.length !== 0) {
      dispatch(getEventObjectDataAsync(currentUser?.uid));
    }
  }, [currentUser, previousUserdata]);

  useEffect(() => {
    if (currentUser?.length !== 0 && previousUserdata.length !== 0) {
      if (EventObjectData?.id) {
      } else {
        dispatch(
          getEventObjectPostDataAsync({
            actions: [],
            id: previousUserdata[0]?.userid,
          })
        );
      }
    }
  }, [EventObjectData, previousUserdata]);

  useEffect(()=>{
    dispatch(getCuisineDataAsync());
    dispatch(getPriceRangeDataAsync());
    dispatch(getCategoryDataAsync())
  }, [])

  //getProductForLocationAsync

  const navigate = useNavigate();

  // chatpopup---
  const isLargeScreen = !useMediaQuery({ maxWidth: 768 });

  const handleSearch = (event) => {
    const newSearchTerm = event ? event.toLowerCase().trim() : "";
    const filteredResults = newSearchTerm
      ? products1.filter((product) => {
          const title = product.name ? product.name.toLowerCase() : "";
          const description = product.description
            ? product.description.toLowerCase()
            : "";
          return (
            title.includes(newSearchTerm) || description.includes(newSearchTerm)
          );
        })
      : [];
  };

  useEffect(() => {
    if (products1.length !== 0) {
      const RestaurentSet = new Set();
      const RestaurentProductsCount = {};
      let uniquerestaurent = [];

      products1.forEach((element) => {
        if (!RestaurentSet.has(element.restaurantName)) {
          RestaurentSet.add(element.restaurantName);
        }
      });

      products1.forEach((element) => {
        if (!RestaurentProductsCount.hasOwnProperty(element.restaurantName)) {
          RestaurentProductsCount[element.restaurantName] = 1;
        } else {
          RestaurentProductsCount[element.restaurantName]++;
        }
      });

      uniquerestaurent = Array.from(RestaurentSet);
      dispatch(getuniqueRestaurantDataAsync(uniquerestaurent));
    }
  }, [products1]);

  //Unique restautent

  // React Form Hook
  

  useEffect(() => {
    return () => {
      dispatch(getsearchdataResetAsync());
    };
  }, []);

  //Get Location function------

 

  const popBarsizeinc = useCallback((value) => {
    if (value + 10 <= 80) {
      setpopBarsize(value + 10);
    }
  });
  const popBarsizedec = useCallback((value) => {
    if (value - 10 >= 40) {
      setpopBarsize(value - 10);
    }
  });

  const getCurrentUserLocation = useCallback(() => {
    if (stopReload) {
      setstopReload(false);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setlati((latitude) => latitude);
            setlongi((longitude) => longitude);
            lg = latitude;
            lo = longitude;

            const passdata = { longitude: lo, latitude: lg };
            dispatch(setLongiLatitAsync(passdata));

            if (previousUserdata[0]?.Access != "Admin") {
              const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
              fetch(apiUrl)
                .then((response) => response.json())
                .then((data) => {
                  setTimeout(() => {
                    if (previousUserdata.length !== 0) {
                      const postData = {
                        id: previousUserdata[0].id,
                        city: data.address.city,
                        "address-1": data?.display_name?? "",
                        "address-2": data?.address?.city_district ?? "",
                        country: data.address.country,
                        "pin-code": data.address.postcode,
                        state: data.address.state,
                        longitide: lo,
                        latitude: lg,
                        logo: currentUser.photoURL,
                        ValidEmail: currentUser?.email,
                      };
                      dispatch(getUpdateUserAddressAsync(postData));
                      setlocComplete(true);
                      if ( currentUser?.length != 0 &&previousUserdata[0]?.Access === "Delivery") {
                        navigate("/Delivery");
                      }
                    } else {
                      const postData = {
                        "First-name": currentUser?.displayName.split(" ")[0],
                        "Last-name": currentUser?.displayName.split(" ")[1],
                        phone: "06296940213",
                        "address-1": data?.display_name?? "",
                        "address-2": data.address.city_district,
                        city: data.address.city,
                        country: data.address.country,
                        "pin-code": data.address.postcode,
                        state: data.address.state,
                        state2: data.address.state,
                        userid: currentUser.uid,
                        longitide: lo,
                        latitude: lg,
                        ValidEmail: currentUser?.email,
                        logo: currentUser.photoURL,
                        EmailBox: "NotAdded",
                      };
                      dispatch(getCreateUserAddressAsync(postData));
                      setlocComplete(true);
                      Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Address Successfully Added",
                        text: "Thanks for your response.",
                        showConfirmButton: false,
                        timer: 1500,
                      });
                      if (prevParamsData === null) {
                        navigate(`/`);
                      } else {
                        navigate(`/ProductOverview/${prevParamsData}`);
                      }
                    }
                  }, 100);
                })
                .catch((error) => {
                  console.error("Error while fetching location data:", error);
                });
            }
          },
          function (error) {
            switch (error.code) {
              case error.PERMISSION_DENIED:
                console.error("User denied the request for Geolocation.");
                break;
              case error.POSITION_UNAVAILABLE:
                console.error("Location information is unavailable.");
                break;
              case error.TIMEOUT:
                console.error("The request to get user location timed out.");
                break;
              case error.UNKNOWN_ERROR:
                console.error("An unknown error occurred.");
                break;
              default:
                console.error("An error occurred while getting user location.");
                break;
            }
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  });
  AOS.init({ duration: 500 });
  AOS.refresh({ duration: 2000 });

  useEffect(() => {
    setcurrentPageProduct(products1);
    dispatchrec({
      type: "pagination",
      products: products1,
      currentPagerec: 1,
      itemsPerPage: 6,
    });
  }, [products1]);


  //Update From Current Location

  // Admin User Edit And Delete
  function AdminEdit(data, index) {
    let temp = index + currentpage * 6;
    dispatch(getUpdateProductAsync({ productData: data, index: temp }));
    seteditBarActive(false);
  }
  const AdminDelete = useCallback((data, index) => {
    const dmObject = { ...data, VisibleStatus: true };
    let temp = index + currentpage * 6;
    Swal.fire({
      title: "Are you sure?",
      text: "Item will not display to user",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        dispatch(getUpdateProductAsync({ productData: dmObject, index: temp }));
        noFilterForProducts();
      }
    });
  });
     
  const initialState = {
    products: products1,
  };

  const [state, dispatchrec] = useReducer(reducer, initialState);

  useEffect(() => {
    if (currentUser !== null) {
      dispatch(getCartDataAsync(currentUser.uid));
      dispatch(getPreviousUserDataAsync(currentUser.uid));
    }
  }, [dispatch, prevParamsData]);

   function reducer(state, action) {
    let updatedProducts;
    switch (action.type) {
      case "carausal":
        eventRunning = true;

        const newSearchTerm = action.event
          ? action.event.toLowerCase().trim()
          : "";

        const filteredResults = newSearchTerm
          ? products1.filter((product) => {
              const title = product.name ? product.name.toLowerCase() : "";
              const description = product.description
                ? product.description.toLowerCase()
                : "";
              return (
                title.includes(newSearchTerm) ||
                description.includes(newSearchTerm)
              );
            })
          : [];
        setcurrentPageProduct((state) => filteredResults);
        state.products = filteredResults;
        setTimeout(() => {
          eventRunning = true;
        }, 300);
        return state;

      case "category":
        if (action.category.checked == false) {
          updatedProducts = action.productdata.filter((element) => {
            return element.category === action.category.value;
          });
        } else {
          updatedProducts = action.productdata;
        }
        setcurrentPageProduct(updatedProducts);
        state.products = updatedProducts;
        eventRunning = false;

        return state;

      case "cuisine":
        if (action.category.checked == false) {
          updatedProducts = action.productdata.filter((element) => {
            return element.cuisine == action.category.value;
          });
        } else {
          updatedProducts = action.productdata;
        }
        setcurrentPageProduct(updatedProducts);
        state.products = updatedProducts;
        eventRunning = false;

        return state;

      case "price":
        if (action.category.checked === false) {
          const productsToFilter = action.productdata;
          switch (action.category.value) {
            case "under-10":
              updatedProducts = productsToFilter.filter(
                (product) => product.price < 10
              );
              break;
            case "10-20":
              updatedProducts = productsToFilter.filter(
                (product) => product.price >= 10 && product.price <= 20
              );
              break;
            case "20-30":
              updatedProducts = productsToFilter.filter(
                (product) => product.price > 20 && product.price <= 30
              );
              break;
            case "30-plus":
              updatedProducts = productsToFilter.filter(
                (product) => product.price > 30
              );
              break;
            default:
              updatedProducts = productsToFilter;
          }
        } else {
          updatedProducts = action.productdata;
        }

        setcurrentPageProduct(updatedProducts);
        state.products = updatedProducts;
        return state;

      case "pagination":
        const startIndex = (action.currentPagerec - 1) * action.itemsPerPage;
        const endIndex = startIndex + action.itemsPerPage;
        state.products = action.products.slice(startIndex, endIndex);

        return state;

      case "sort":
        const sortType = action.sortType;
        let prodct = [...action.proData];

        if (sortType == "Most Popular") {
          state.products = [...action.proData].sort(
            (a, b) => b.rating - a.rating
          );
        } else if (sortType == "Newest") {
          state.products = action.proData; // Replace with actual sorting logic
        } else if (sortType == "Price: Low to High") {
          state.products = [...action.proData].sort(
            (a, b) => a.price - b.price
          );
        } else if (sortType == "Price: High to Low") {
          state.products = [...action.proData].sort(
            (a, b) => b.price - a.price
          );
        }
        setcurrentPageProduct(updatedProducts);
        return state;

      default:
        return state;
    }
  }

  useEffect(() => {
 let queryString = ""
 if(priceRange && priceRange!==""){
  queryString = queryString + `&priceRange=${priceRange}`
 }

 if(cuisine &&cuisine!==""){
  queryString = queryString + `&cuisine=${cuisine}`
 }
 if(category && category!==""){
  queryString = queryString + `&category=${category}`
 }
   if(sort !==""){
    if (sort == "Most Popular") {
      queryString = queryString + `&_sort=${"rating"}&_order=${"desc"}`   
    } 
     if (sort == "Newest") {
      queryString = queryString + ``   
    
    }  if (sort == "Price: Low to High") {
      queryString = queryString + `&_sort=${"price"}&_order=${"asc"}`   

      queryString = queryString
    } 
     if (sort == "Price: High to Low") {
      queryString = queryString + `&_sort=${"price"}&_order=${"desc"}`   
    }
   }
 
   dispatch(getProductDataAsync(`?skip=${skip}&limit=${limit}`+queryString));
  }, [dispatch, filters.options?.checked, limit,skip, priceRange,sort, cuisine, category]);
  useEffect(()=>{
    setSkip(0);
    setcurrentpage(1);                   

  }, [priceRange,sort, cuisine, category])

  useEffect(() => {
    if (locCpmplete) {
      if (
        previousUserdata.length != 0 &&
        previousUserdata[0]?.Access != "Admin"
      ) {
        dispatch(getProductForLocationAsync(previousUserdata[0].city));
      }
    }
  }, [previousUserdata, locCpmplete]);

  function noFilterForProducts() {
    if (indexFilter == -1) {
      if (currentUser == null || previousUserdata[0]?.Access === "Admin") {
        console.log("currentUser == null");
        dispatch(getProductDataAsync());
      } else if (
        currentUser?.length != 0 &&
        previousUserdata[0]?.Access != "Admin"
      ) {
        dispatch(getProductForLocationAsync(previousUserdata[0]?.city));
      }

      setOpen(null);
    }
  }

  useEffect(() => {
    noFilterForProducts();
    console.log(indexFilter);
  }, [indexFilter]);

  // No filter UseEffect

  function catagotyFilter(products, category) {
    const newProducts = products.filter((element) => {
      return element.category == category.value;
    });
    setcurrentPageProduct(newProducts);
  }

  function paginationFun(products, currentPage, itemsPerPage) {
    setcurrentpage(currentPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setcurrentPageProduct(products.slice(startIndex, endIndex));
  }
 
  useEffect(() => {
    if (currentUser !== null && PrevcompleteInti == true) {
      if (notRerun) {
        setnotRerun(false);
        getCurrentUserLocation();
      }
    }
  }, [currentUser, PrevcompleteInti]);
 const imagesToShow = images.slice(currentImage, currentImage + 6);

  const nextSlide = () => {
    if (currentImage < images.length - 6) {
      setCurrentImage(currentImage + 1);
      AOS.init({ duration: 500 });
      AOS.refresh({ duration: 100 });
    }
  };

  const prevSlide = () => {
    if (currentImage > 0) {
      setCurrentImage(currentImage - 1);
    }
  };

  return (
    <div className="">
      {currentUser &&
        previousUserdata?.length != 0 &&
        isLargeScreen &&
        ChatOpen && (
          <Draggable>
            <div
              className="fixed-top"
              style={{
                position: "fixed",
                top: "80px",
                left: "20px",
                width: `${popBarsize}%`,
                height: ` ${73 + popBarsize / 3}vh`,
                backgroundColor: "#f0f0f0",
                border: "1px solid #999",
                padding: "20px",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
                zIndex: 9999,
              }}
            >
              <div
                className="container mb-2"
                style={{ position: "absolute", zIndex: 1111111 }}
              >
                <button
                  type="button"
                  class="mx-1 btn btn-primary btn-sm"
                  onClick={() => {
                    popBarsizeinc(popBarsize);
                  }}
                >
                  +
                </button>
                <button
                  type="button"
                  class="btn btn-secondary btn-sm"
                  onClick={() => {
                    popBarsizedec(popBarsize);
                  }}
                >
                  {" "}
                  -
                </button>
              </div>

              <div>
                <ChatBox popBarsize={popBarsize}> </ChatBox>
              </div>
            </div>
          </Draggable>
        )}

      {currentUser &&
        previousUserdata?.length != 0 &&
        previousUserdata[0]?.Access == "Admin" &&
        AddProductFm && (
          <div className="container">
            <h2> Add New Product</h2>
            <form
              onSubmit={handleSubmit((data) => {
                const sizeSm = convertToKg(data.Small);
                const sizeRg = convertToKg(data.Regular);
                const sizeLg = convertToKg(data.Large);
                console.log(sizeLg);
                const NewproductObject = {
                  name: data.name,
                  description: data.description,
                  price: parseInt(data.price),
                  discountPercentage: parseInt(data.discountPercentage),
                  rating: parseInt(data.rating),
                  uid: currentUser.uid,
                  restaurantName: data.restaurantName,
                  images: [data.image1, data.image2, data.image3, data.image4],
                  thumbnail: data.thumbnail,
                  ingredients: [
                    data.ingredient1,
                    data.ingredient2,
                    data.ingredient3,
                  ],
                  highlights: [
                    data.highlight1,
                    data.highlight2,
                    data.highlight3,
                  ],
                  cuisine: data.cuisine,
                  city: data.city,
                  category: data.category,
                  priceRange: data.priceRange,
                  weight: {
                    Small: editBarActive ? data.Small : sizeSm,
                    Regular: editBarActive ? data.Regular : sizeRg,
                    Large: editBarActive ? data.Large : sizeLg,
                  },
                };

                if (!editBarActive) {
                  dispatch(getProductPostAsync(NewproductObject));
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Product Added",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                } else {
                  NewproductObject.id = editProductId;

                  AdminEdit(NewproductObject, editObjectIndex);

                  const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                      confirmButton: "btn btn-success",
                      cancelButton: "btn btn-Dark",
                    },
                    buttonsStyling: false,
                  });

                  swalWithBootstrapButtons
                    .fire({
                      title: "Are you sure?",
                      text: "You won't be able to revert this!",
                      icon: "success",
                      showCancelButton: true,
                      confirmButtonText: "Check The Added product",
                      cancelButtonText: "Add More Products!",
                      reverseButtons: true,
                    })
                    .then((result) => {
                      if (result.isConfirmed) {
                        swalWithBootstrapButtons.fire(
                          "Edited!",
                          "Your Product has been Edited",
                          "success"
                        );

                        navigate(`ProductOverview/${editProductId}`);

                        reset();
                        seteditBarActive(false);
                      } else if (result.dismiss === Swal.DismissReason.cancel) {
                        swalWithBootstrapButtons.fire(
                          "Product Added",
                          "Add More Products:)",
                          "success"
                        );

                        dispatchrec({
                          type: "pagination",
                          products: products1,
                          currentPagerec: 1,
                          itemsPerPage: 6,
                        });
                        reset();
                        setAddProductFm(true);
                        seteditBarActive(false);
                      }
                    });
                }

                setAddProductFm(false);
                noFilterForProducts();
              })}
            >
              <div className="row">
                {Object.keys(ProductsDataShema).map((key, index) => (
                  <div key={key + index} className="col-12 col-md-6 mb-4">
                    <div className="form-group">
                      <label htmlFor={key} className="mb-2">
                        <strong>{key}</strong>
                      </label>
                      <input
                        formNoValidate
                        className="form-control"
                        id={key}
                        {...register(key, {
                          required: true,
                          pattern:
                            key === "thumbnail"
                              ? /^https?:\/\/.*\/.*\.(png|gif|webp|jpeg|jpg)\??.*$/gim
                              : Fmvalidater(key),
                        })}
                        style={{ maxWidth: "100%" }}
                      />
                      {errors[key] && (
                        <p
                          className="text-danger"
                          style={{ fontStyle: "italic", fontSize: "12px" }}
                        >
                          {getErrorMessage(key)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button type="submit " className="btn btn-danger">
                Submit
              </button>
              <button
                onClick={() => {
                  setAddProductFm(false);
                }}
                type="buttton"
                className="btn btn-primary mx-2"
              >
                Close
              </button>
            </form>
          </div>
        )}

      {!AddProductFm &&
        currentUser &&
        previousUserdata?.length != 0 &&
        previousUserdata[0]?.Access == "Admin" && (
          <div className="bhag">
            <button
              className="btn btn-primary bhag mt-3"
              onClick={() => {
                setAddProductFm(true);
              }}
            >
              {" "}
              Add New Item
            </button>
          </div>
        )}

      <>
        {!AddProductFm && (
          <>
            <div className="container p-0 mt-5">
              <h2 className="d-inline">Inspiration for your first order</h2>
            </div>
            <div
              className="carousel-container mt-2"
              onMouseLeave={(e) => {
                e.stopPropagation();
                e.preventDefault();
                if (indexFilter != 55) {
                  setindexFilter(-1);
                  noFilterForProducts();
                }
              }}
            >
              <button
                className={` ${currentImage > 0 ? "prev" : "prev bg-dark"}`}
                onClick={prevSlide}
              >
                &lt; Previous
              </button>

              <div
                data-aos="fade-right"
                data-aos-offset="300"
                data-aos-easing="ease-in-sine"
                className="carousel-slide"
              >
                {imagesToShow.map((imagexx, index) => (
                  <div key={index + "text-center"} className="text-center">
                    <img
                      key={index}
                      src={imagexx.link}
                      alt={`Image ${currentImage + 1}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setindexFilter(55);
                        setOpen(false);
                        setnoFilter(true);
                        dispatchrec({ type: "carausal", event: imagexx.value });
                      }}
                      onMouseEnter={(e) => {
                        e.stopPropagation();
                        e.preventDefault();

                        dispatchrec({ type: "carausal", event: imagexx.value });
                      }}
                    />
                    <label>
                      <h4>{imagexx.value} </h4>
                    </label>
                  </div>
                ))}
              </div>

              {
                <button
                  className={` ${
                    images.length - 6 > currentImage ? "next" : "next bg-dark"
                  }`}
                  onClick={nextSlide}
                >
                  Next &gt;
                </button>
              }
            </div>{" "}
          </>
        )}
      </>

      <div>
        <div className={`modal ${mobileFiltersOpen ? "show" : ""}`}>
          <div className="modal-dialog modal-fullscreen-lg-down">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title text-lg font-medium text-gray-900">
                  Filters{" "}
                </h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setMobileFiltersOpen(false)}
                />
              </div>

              <div className="modal-body mt-4 border-t border-gray-200">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-3">
                      <h3 className="sr-only">Categories</h3>
                    </div>
                    <div className="col-lg-9">
                      {filters.options?.length >0 && filters?.map((section, index) => (
                        <div key={index + section.name}>
                          <h3 className="modal-header">
                            <button
                              className="btn btn-link d-flex w-100 align-items-center justify-content-between"
                              type="button"
                            >
                              <span className="font-medium filter-head text-gray-900">
                                {section?.name}
                              </span>
                              <span>
                                <i
                                  className={`bi ${
                                    section?.open ? "bi-dash" : "bi-plus"
                                  }`}
                                />
                              </span>
                            </button>
                          </h3>
                          <div
                            className={`modal-body ${
                              section?.open ? "show" : ""
                            }`}
                          >
                            <div className="space-y-6">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={optionIdx + "modal-body"}
                                  className="form-check"
                                  onClick={(e) => {
                                  if(section?.id==="category"){
                                   setCategory(option.value)
                                  } 
                                  if(section?.id==="cuisine"){
                                   setCuisine(option.value)
                                  } 
                                  if(section?.id==="price"){
                                    setPricerange(option.value)
                                  }
                                                               
                                  }}
                                >
                                  <input
                                    id={"filter-mobile"}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="form-check-input"
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className="form-check-label ml-3 min-w-0 text-gray-500"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {searchResults.length > 0 && (
          <div
            style={{
              position: "absolute",
              top: "7%", // Adjust the distance from the top as needed
              right: "10px", // Adjust the distance from the right as needed
              height: "250px",
              width: "30%",
              overflowY: "auto",
              backgroundColor: "#f5f5f5",
              zIndex: "1000", // Set the desired z-index value
            }}
            id="list-example "
            className="shadow mt-2 p-4 shadow bhag"
          >
            {" "}
            <div className="row ">
              <div className="col-md-12  ">
                <div
                  id="list-example"
                  className="list-group d-flex flex-row-reverse  "
                >
                  <div className="">
                    <div className="row">
                      {searchResults.map((product, index) => (
                        <div
                          key={index + product.id + product.name}
                          className="col-12 col-sm-6 col-md-4 col-lg-3"
                        >
                          <Link to={`/ProductOverview/${product.id}`}>
                            <div className="aspect-w-1 aspect-h-1 bhag">
                              <img
                                width="130px"
                                height="90px"
                                src={product.thumbnail}
                                alt={product.imageAlt}
                                className="object-cover object-center w-full h-full mx-2"
                              />
                            </div>
                            <div className="bhag">{product.name}</div>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="main1 col-md-9">
                <div
                  data-bs-spy="scroll"
                  data-bs-target="#list-example"
                  data-bs-offset={0}
                  className="scrollspy-example"
                  tabIndex={0}
                ></div>
              </div>
            </div>
          </div>
        )}
        <div className="bhag mt-2">
          <h1 className="h1 d-inline display-5 font-bold tracking-tight text-gray-900 ">
            Food Menu
          </h1>
        </div>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <section className="pb-24 pt-6">
            <div className="d-flex justify-content-end border-bottom border-gray-200 pb-3 pt-3 mt-2  ">
              <div className="d-flex align-items-center ">
                <div className="dropdown">
                  <button
                    className="dropdown-toggle btn btn-outline-dark me-3"
                    type="button"
                    id="sortDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="sortDropdown">
                    {sortOptions.map((option, index) => (
                      <li key={index + "dropdown-item"}>
                        <li
                          className="dropdown-item"
                          onClick={() => {
                            setSort(option.name)  
                          }}
                        >
                          {option.name}
                        </li>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="row">
              {/* Filters */}
              <div className="col-lg-3 mt-2">
                <div className="d-flex flex-column justify-content-end">
                  <h3 className="sr-only bhag ">Filters</h3>
                  {noFilter && (
                    <div className=" bhag mb-2">
                      <div
                        className="btn btn-primary mt-3 mx-5"
                        onClick={(e) => {
                          setindexFilter(-1);
                          setnoFilter(false);
                          e.stopPropagation();
                          noFilterForProducts();
                        }}
                      >
                        {" "}
                        NO Filters
                      </div>
                    </div>
                  )}
                 {categorySvg()}

                  {filters.map((section, indexx) => (
                    <div key={indexx + "modal-header"}  className="m-2">
                      <Select 
                      autoFocus={true}
                      options={section?.options}
                      placeholder={section?.id}
                      defaultInputValue={""}
                        onChange={(option)=>{
                        if(section?.id==="category"){
                          setCategory(option?.value)
                         } 
                         if(section?.id==="cuisine"){
                          setCuisine(option?.value)
                         } 
                         if(section?.id==="price"){
                           setPricerange(option?.value)
                         }                                
                         }}
                         isClearable={true}
                      />                     
                    </div>
                  ))}
                </div>
              </div>

              {/* Product grid */}
              <div className="col-lg-9">
                {totalProductsLength === 0 && <h3>No Product Found</h3>}
                <main>
                  {products1.length !== 0 && !eventRunning && (
                    <div className="row mt-4" id="cartmain">
                      {products1.map((product, index) => (
                        <>
                          {product?.VisibleStatus != true && (
                            <div
                              className={`col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3`}
                              key={index + "col-12 col-sm-6"}
                              onClick={() => {
                                if (previousUserdata.length !== 0) {
                                  dispatch(
                                    getUpdateEventObjectDataAsync({
                                      id: currentUser.uid,
                                      actions: [
                                        ...EventObjectData.actions,
                                        {
                                          actionType: "ProductClick",
                                          timestamp: Date.now(),
                                          Time: indianTime,
                                          details: {
                                            itemId: product.id,
                                            itemName: product.name,
                                            otherInfo: product.thumbnail,
                                          },
                                        },
                                      ],
                                    })
                                  );
                                }
                              }}
                            >
                              {(product?.VisibleStatus != true ||
                                previousUserdata[0]?.Access === "Admin") && (
                                <Link
                                  to={`/ProductOverview/${product._id}`}
                                  className="text-decoration-none"
                                >
                                  <div
                                    className={`card mb-4 ${
                                      product?.category === "non-vegetarian"
                                        ? "non-veg"
                                        : "veg"
                                    }`}
                                  >
                                    <img
                                      data-aos="zoom-out-down"
                                      src={product.thumbnail}
                                      alt="Product Card"
                                      className="card-img-top img-fluid"
                                      style={{ maxHeight: "200px" }}
                                    />
                                    <div className="card-body">
                                      <h5
                                        className={`card-title ${
                                          product?.category === "non-vegetarian"
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
                                              product.category ===
                                              "non-vegetarian"
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
                              )}

                              {/* previousUserdata[0]?.userid=== product.uid &&  */}
                              {previousUserdata[0]?.Access === "Admin" && (
                                <div
                                  className="btn-group mb-2 bhag"
                                  role="group"
                                >
                                  <button
                                    onClick={() => {
                                      seteditBarActive(true);
                                      setAddProductFm(true);
                                      funSetValue(product, index,setValue,setEditObjectIndex,setEditProductId);
                                      ScrollTotop();
                                    }}
                                    type="button"
                                    className="btn btn-primary m-2"
                                  >
                                    Edit
                                  </button>
                                  {product?.VisibleStatus ? (
                                    <button
                                      onClick={() => {
                                        // AdminDelete(product, index)
                                      }}
                                      type="button"
                                      className="btn btn-danger m-2 "
                                    >
                                      Product Deleted
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => {
                                        AdminDelete(product, index);
                                      }}
                                      type="button"
                                      className="btn btn-danger m-2 "
                                    >
                                      Delete
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                          )}
                        </>
                      ))}
                    </div>
                  )}
                  <button
                    className=" btn p-3 mb-2 bg-info text-white"
                    style={{
                      position: "fixed",
                      borderRadius: "50%",
                      bottom: "20px", // Adjust this value to change the button's vertical position
                      right: "20px", // Adjust this value to change the button's horizontal position
                      zIndex: 999, // Adjust the z-index value as needed to ensure it's above other elements
                    }}
                    onClick={() => {
                      if (isLargeScreen) {
                        setChatOpen(!ChatOpen);
                      } else {
                        navigate("/ChatBox");
                      }
                    }}
                  >
                    {!ChatOpen ? "Chats" : "Close"}
                  </button>
                </main>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* pagination */}

      {open == null ? (
        <section className="mt-4 pagination-box" style={{ cursor: "pointer" }}>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li
                className="page-item page-link"
                onClick={(e) => {
                  if (skip-limit >= 0) {
                    setSkip(skip-limit);
                    setcurrentpage((prevState)=>prevState-1);                   
                  } 
                }}
              >
                Previous
              </li>
              {[...Array(Math.ceil(totalProductsLength / limit)).keys()].map(
                (value, index) => (
                  <li
                    key={index + "pointer"}
                    style={{ cursor: "pointer" }}
                    className={`page-item page-link ${
                      currentpage == index + 1 ? "bg-warning " : ""
                    }`}
                    value={value }
                    onClick={(e) =>{
                      setSkip(index * limit);
                      setcurrentpage(Math.ceil((index+1)));
                    }
                    }
                  >
                    {value + 1}
                  </li>
                )
              )}
              <li
                className={`page-item page-link`}
                onClick={(e) => {
                  if ( totalProductsLength >= skip+limit) {
                    setSkip(skip+limit);
                    setcurrentpage((prevState)=>prevState+1);                   

                  } 
                }}
              >
                Next
              </li>
            </ul>
          </nav>
        </section>
      ) : (
        <></>
      )}

      {/* Chat PopUp  */}
    </div>
  );
});

export default ProductGrid;
