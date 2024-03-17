function isMoreThanThreeDays(timestamp) {
  const currentTimestamp = Date.now();
  const timeDifference = Math.abs(currentTimestamp - timestamp);
  const seconds = Math.floor(timeDifference / 1000);
  if (seconds >= 259200) {
    // 3 days in seconds (3 * 24 * 60 * 60)
    return true;
  } else {
    return false;
  }
}
let locationFetchdata = ""
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}


export function getProductData(query) {
  return new Promise(async (resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let LocationData = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            LocationData = await LocationData.json();
            let city;
            if (LocationData?.address?.city) {
                city = LocationData.address.city;
            } else {
                // If city is not available, fallback to fetching city using IP address
                const ipData = await fetch('https://ipapi.co/json');
                const ipLocationData = await ipData.json();
                city = ipLocationData.city;
            }           
             const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/products" + `${query}&city=${city}`);
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error("Error fetching product data:", error);
            // Fallback to default city
            const response = await fetch(process.env.REACT_APP_ALL_PRODUCTS + `${query}`);
            const data = await response.json();
            resolve(data);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default city
          const response = await fetch(process.env.REACT_APP_ALL_PRODUCTS + `${query}`);
          const data = await response.json();
          resolve(data);
        }
      );
    } else {
      // Geolocation not supported
      console.error("Geolocation not supported.");
      // Fallback to default city
      const response = await fetch(process.env.REACT_APP_ALL_PRODUCTS + `${query}`);
      const data = await response.json();
      resolve(data);
    }
  });
}

export function getCategoryData(query) {
  return new Promise(async (resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let LocationData = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            LocationData = await LocationData.json();
            let city;
            if (LocationData?.address?.city) {
                city = LocationData.address.city;
            } else {
                // If city is not available, fallback to fetching city using IP address
                const ipData = await fetch('https://ipapi.co/json');
                const ipLocationData = await ipData.json();
                city = ipLocationData.city;
            }           
             const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCategory" + `?city=${city}`);
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error("Error fetching product data:", error);
            // Fallback to default city
            const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCategory");
            const data = await response.json();
            resolve(data);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default city
          const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCategory");
          const data = await response.json();
          resolve(data);
        }
      );
    } else {
      // Geolocation not supported
      console.error("Geolocation not supported.");
      // Fallback to default city
      const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCategory`);
      const data = await response.json();
      resolve(data);
    }
  });

}
export function getrestaurentData(query) {
  return new Promise(async (resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;     
        let LocationData = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
        LocationData = await LocationData.json();
        let city;
        if (LocationData?.address?.city) {
            city = LocationData.address.city;
        } else {
            // If city is not available, fallback to fetching city using IP address
            const ipData = await fetch('https://ipapi.co/json');
            const ipLocationData = await ipData.json();
            city = ipLocationData.city;
        }           
        const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueRestaurent" +`?city=${city}`);
        const data = await response.json();
        resolve(data);
      }, async () => {
        // If user denies or blocks location access
        const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniqueRestaurent`);
        const data = await response.json();
        resolve(data);
      });
    } else {
      // Geolocation not supported
      const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniqueRestaurent`);
      const data = await response.json();
      resolve(data);
    }
  

  });
}

export function getPriceRangeData(query) {
  return new Promise(async (resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let LocationData = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            LocationData = await LocationData.json();
            let city;
            if (LocationData?.address?.city) {
                city = LocationData.address.city;
            } else {
                // If city is not available, fallback to fetching city using IP address
                const ipData = await fetch('https://ipapi.co/json');
                const ipLocationData = await ipData.json();
                city = ipLocationData.city;
            }           
             const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniquePriceRange" +`?&city=${city}`);
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error("Error fetching product data:", error);
            // Fallback to default city
            const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniquePriceRange`);
            const data = await response.json();
            resolve(data);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default city
          const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniquePriceRange");
          const data = await response.json();
          resolve(data);
        }
      );
    } else {
      // Geolocation not supported
      console.error("Geolocation not supported.");
      // Fallback to default city
      const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniquePriceRange`);
      const data = await response.json();
      resolve(data);
    }
  });
  
}
export function getCuisineData(query) {
  return new Promise(async (resolve) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            let LocationData = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            LocationData = await LocationData.json();
            let city;
            if (LocationData?.address?.city) {
                city = LocationData.address.city;
            } else {
                // If city is not available, fallback to fetching city using IP address
                const ipData = await fetch('https://ipapi.co/json');
                const ipLocationData = await ipData.json();
                city = ipLocationData.city;
            }           
             const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCuisine" + `?city=${city}`);
            const data = await response.json();
            resolve(data);
          } catch (error) {
            console.error("Error fetching product data:", error);
            // Fallback to default city
            const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCuisine");
            const data = await response.json();
            resolve(data);
          }
        },
        async (error) => {
          console.error("Geolocation error:", error);
          // Fallback to default city
          const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCuisine");
          const data = await response.json();
          resolve(data);
        }
      );
    } else {
      // Geolocation not supported
      console.error("Geolocation not supported.");
      // Fallback to default city
      const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCuisine");
      const data = await response.json();
      resolve(data);
    }
  });
    // const response = await fetch(`https://foodorderingapp-mfqa.onrender.com/productssection/uniqueCuisine`);
    // const data = await response.json();
    // resolve(data);
 
}

export function getMeetingData() {
  return new Promise(async (resolve) => {
      try {
          // Check token
          const checkToken = await fetch("http://localhost:5000/checkToken");
          const checkTokenData = await checkToken.json();
          
          if (checkTokenData.checkData === true) {
              // Fetch meeting data
              const response = await fetch("http://localhost:5000/getMeetsData");
              const data = await response.json();
              resolve(data.data);
          } else {
              // If token check fails, resolve with empty meetings array
              resolve({ meetings: [] });
          }
      } catch (error) {
          // If any error occurs during the fetch operations, catch it and log it
          console.error("Error fetching meeting data:", error);
          // Resolve with empty meetings array
          resolve({ meetings: [] });
      }
  });
}


export function getDeletedProductData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_PRODUCTS_VIVIBLESTATUS);
    const data = await response.json();

    resolve(data.data);
  });
}
export function getAllOrderData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_order);
    const data = await response.json();

    resolve(data.data);
  });
}

export function getAllOrderDataByFilter(status) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_order_status + status);
    const data = await response.json();

    resolve(data.data);
  });
}

export function getAllUserData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_ALL_USER);
    const data = await response.json();

    resolve(data.data);
  });
}

export function getAllNotAddedToEmailBoxUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/usersection/user?EmailBox=NotAdded"
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function getAllAddedToEmailBoxUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_EmailBox_GET);
    const data = await response.json();

    resolve(data.data);
  });
}

//getAllAddedToEmailBoxUser
export function getAllUserSearchData(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/usersection/userSearch?q=" + searchData);
    const data = await response.json();

    resolve(data.data);
  });
}

export function getAllUserNotAddedOnEmailSearchData(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/usersection/userSearch?EmailBox=NotAdded&&q=" + searchData
    );
    const data = await response.json();
    resolve(data.data);
  });
}

export function getTargetProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_TARGET_PRODUCTS + id);
    const data = await response.json();
    resolve(data.data);
  });
}
export function getSimilerProduct(category, city) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/productssection/products/?category=${category}&city=${city}`
    );
    const data = await response.json();
    resolve(data.data);
  });
}
export function getProductForLocation(city) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/products/?city=" + city);
    const data = await response.json();
    resolve(data.data);
  });
}

export function getSearchResult(dataaa) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/productsSearch?q=" + dataaa);
    const data = await response.json();
    resolve(data.data);
  });
}
export function getTargetSearchResult(dataaa) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/productsSearch?q=" + dataaa);
    const data = await response.json();
    resolve(data);
  });
}


export function getProductPost(NewProductsData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewProductsData),
    });
    const data = await response.json();
    resolve(data.data);
  });
}

export function getUpdateProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/productssection/products",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();
    resolve(data.data);
  });
}

export function getUpdateTargetProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/productssection/products",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();

    resolve(data.data);
  });
}
export function getUpdateApplyJob(ApplyJob) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/applyjob/Apply/" + ApplyJob.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ApplyJob),
    });

    const data = await response.json();
    resolve(data.data);
  });
}
export function getreviewPost(reviewData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/reviewsection/review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });
    const data = await response.json();
    const uid = data.postUser;

    const EventObjectData = await getEventObjectData(uid);
    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Ensure 24-hour format
    };
    const indianTime = date
      .toLocaleString("en-IN", options)
      .replace(/\//g, "-") // Replace slashes with dashes
      .replace(",", "");
    const helperArray = {
      id: uid,
      actions: [
        ...EventObjectData.actions,
        {
          actionType: "Post Review",
          timestamp: Date.now(),
          Time: indianTime,
          details: {
            itemId: data.id,
            itemName: `Order Product ${data._id}`,
            otherInfo:
              "https://www.freeiconspng.com/uploads/review-icon-png-1.png",
          },
        },
      ],
    };
    const tempData = await getUpdateEventObjectData(helperArray);

    resolve(data.data);
  });
}

export function getNotificationsPost(notificationsData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/notificationsection/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationsData),
    });
    const data = await response.json();
    resolve(data.data);
  });
}
export function getNotificationsDelete(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/notificationsection/notification/" + itemId,
      {
        method: "DELETE",
      }
    );
    resolve({ data: itemId });
  });
}
export function getNotifitationData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/notificationsection/notification?for=${id}&_sort=time&_order=desc`
    );
    const data = await response.json();

    const Unread = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/notificationsection/notification?for=${id}&status=unRead&_sort=time&_order=desc`
    );
    const data2 = await Unread.json();
    const deleteArrayObject = await data.data.filter((element) => {
      return isMoreThanThreeDays(element.time);
    });
    await deleteArrayObject.forEach((element) => {
      getNotificationsDelete(element.id);
    });
    resolve({ AllNoti: data, unReadNoti: data2 });
  });
}

export function getNotificationsUpdate(updateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/notificationsection/notification/" + updateData._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    const data = await response.json();
    resolve(data.data);
  });
}

export function getNewMeetPost(postData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:5000/PostMeetData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    resolve(data.data);
  });
}

export function getJobDataPost(ApplyData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/applyjob/Apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ApplyData),
    });
    const data = await response.json();
    resolve(data.data);
  });
}

export function getReviewData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/reviewsection/review/"+id);
    const data = await response.json();
    resolve(data.data);
  });
}

export function CheckReviewData(checkData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/reviewsection/review?productId=${checkData.id}&&postUser=${checkData.uid}`
    );
    const data = await response.json();

    resolve(data.data);
  });
}
////

export function getAllAppliedData() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/applyjob/Apply");
    const data = await response.json();
    resolve(data.data);
  });
}

export function getAllAppliedDataForSearch(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/applyjob/ApplySearch?q=" + searchData);
    const data = await response.json();
    resolve(data.data);
  });
}

export function getJobData() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/jobOpenings");
    const data = await response.json();
    resolve(data.data);
  });
}
export function getReviewDataForTargerUser(postUser) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/reviewsection/review?postUser=" + postUser
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function getDeliveryAppliedReq(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/ordersection/order?DeliveryReqBy=" + id
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function getOrderDelivered(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/OrderDelivered?for=" + id
    );
    const data = await response.json();
    console.log(data);
    resolve(data.data);
  });
}

export function getCreateUser(userAddressData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://foodorderingapp-mfqa.onrender.com/usersection/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userAddressData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      resolve(data.data);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUpdateUserAddress(newAddressData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/usersection/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddressData),
      }
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function getUpdateReviewBox(checkData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/reviewsection/review/${checkData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkData),
      }
    );
    const data = await response.json();

    resolve(data.data);
  });
}

//        const response = await fetch(`http://localhost:8080/review?productId=${checkData.id}&&postUser=${checkData.uid}`);

export function getUpdateOrderStatus(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/ordersection/order/" + orderData._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await response.json();

    resolve(data.data);
  });
}

//getUpdateUserAddress

export function getCreateOrder(Orderdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/ordersection/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Orderdata),
    });
    const data = await response.json();
    const uid = data.Address[0].userid;

    const EventObjectData = await getEventObjectData(uid);
    const date = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Ensure 24-hour format
    };
    const indianTime = date
      .toLocaleString("en-IN", options)
      .replace(/\//g, "-") // Replace slashes with dashes
      .replace(",", "");

    const helperArray = {
      id: uid,
      actions: [
        ...EventObjectData.actions,
        {
          actionType: "CheckOut",
          timestamp: Date.now(),
          Time: indianTime,
          details: {
            itemId: data.id,
            itemName: `Order Product ${data.id}`,
            otherInfo:
              "https://cdn.icon-icons.com/icons2/2774/PNG/512/order_product_online_ecommerce_market_buy_icon_176857.png",
          },
        },
      ],
    };
    const tempData = await getUpdateEventObjectData(helperArray);

    resolve(data.data);
  });
}

export function getCreateCart(Cartdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/cartsection/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cartdata),
    });
    const data = await response.json();

    resolve(data.data);
  });
}

export function getUserMessegePost(UserMess) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/restaurantsection/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserMess),
    });
    const data = await response.json();

    resolve(data.data);
  });
}

export function getOutForDeliveryPost(Postdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("hhttp://localhost:8000/OutForDeliverySection/OutForDelivery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Postdata),
    });
    const data = await response.json();

    resolve(data.data);
  });
}

export function getOrderDeliveredPost(Postdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/OrderDelivered", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Postdata),
    });
    const data = await response.json();

    resolve(data.data);
  });
}

export function getOutForDelivery(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/OutForDeliverySection/OutForDelivery?for=" + id
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function getUserMessToResData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/restaurantsection/restaurants?dbAdd=" + id
    );
    const data = await response.json();

    resolve(data.data);
  });
}

export function updateQuantity(updateQnt) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/cartsection/cart" , {
      method: "PATCH",
      body: JSON.stringify(updateQnt),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve(data.data);
  });
}

export function getCartData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/cartsection/cart?userid=" + id);
    const data = await response.json();
    resolve(data.data);
  });
}
export function getRestaurantsData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/restaurantsection/restaurants?for=" + id);
    const data = await response.json();
    resolve(data.data);
  });
}
export function getRestaurantsWithProducts() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/productssection/uniqueRestaurantsWithProduct" );
    const data = await response.json();
    console.log(data)
    resolve(data.data);
  });
}
export function getPreviousUserData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/usersection/user?userid=" + id);
    const data = await response.json();
    resolve(data.data);
  });
}

export function getDeliveryUserData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/usersection/user?Access=" + id);
    const data = await response.json();
    resolve(data.data);
  });
}

//dbAdd
export function getCheckPostUserBox(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/UserMessegeRes?dbAdd=" + id
    );
    const data = await response.json();
    resolve(data.data);
  });
}

export function getOrderData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `https://foodorderingapp-mfqa.onrender.com/ordersection/order?belngto=${id}&_sort=OrderPlacedTime&_order=desc`
    );
    const data = await response.json();
    resolve(data.data);
  });
}

export function getOrderDataforDeliveryBoy() {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/ordersection/order?DeliveryReq");
    const data = await response.json();
    resolve(data.data);
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/cartsection/cart/" + itemId, {
      method: "DELETE",
    });

    resolve({ data: itemId });
  });
}

export function deleteApplyJob(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("https://foodorderingapp-mfqa.onrender.com/applyjob/Apply/" + itemId, {
      method: "DELETE",
    });
    const data = await response.json();

    resolve({ data: itemId });
  });
}

export function OutForDeliveryItemDelete(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/OutForDeliverySection/OutForDelivery/" + itemId,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    resolve({ data: itemId });
  });
}

//OutForDelivery

export function deleteOutForDelivery(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/OutForDeliverySection/OutForDelivery/" + itemId,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();

    resolve({ data: itemId });
  });
}

export function getCurrentDeliveryItem(fordata) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/OutForDeliverySection/OutForDelivery?currentDelivery=true&for=" + fordata
    );
    const data = await response.json();

    resolve(data.data);
  });
}
export function getUpdateOutForDelivery(UpdateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/OutForDeliverySection/OutForDelivery/" + UpdateData.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      }
    );
    const data = await response.json();
    resolve(data.data);
  });
}

export function getEventObjectData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_EVENTOBJECTDATA+id);
    console.log("responsefiugjfdio", response)
    const data = await response.json();
    resolve(data.data);
  });
}

export function getEventObjectPostData(Postdata) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_EVENTOBJECTDATA, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Postdata),
    });
    const data = await response.json();

    resolve(data.data);
  });
}

export function getUpdateEventObjectData(UpdateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "https://foodorderingapp-mfqa.onrender.com/EventObjectSection/EventObjectData",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      }
    );
    const data = await response.json();

    resolve(data.data);
  });
}
