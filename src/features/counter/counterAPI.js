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

// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: amount }), 500)
  );
}

export function getProductData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_ALL_PRODUCTS);
    const data = await response.json();

    resolve(data);
  });
}

export function getMeetingData() {
  return new Promise(async (resolve) => {
    //checkToken
    const checkToken = await fetch("http://localhost:5000/checkToken");
    const checkTokenData = await checkToken.json();
    if (checkTokenData.checkData === true) {
      const response = await fetch("http://localhost:5000/getMeetsData");
      const data = await response.json();
      resolve(data);
    } else {
      resolve({ meetings: [] });
    }
  });
}

export function getDeletedProductData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_PRODUCTS_VIVIBLESTATUS);
    const data = await response.json();

    resolve(data);
  });
}
export function getAllOrderData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_order);
    const data = await response.json();

    resolve(data);
  });
}

export function getAllOrderDataByFilter(status) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_order_status + status);
    const data = await response.json();

    resolve(data);
  });
}

export function getAllUserData() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_ALL_USER);
    const data = await response.json();

    resolve(data);
  });
}

export function getAllNotAddedToEmailBoxUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/usersection/user?EmailBox=NotAdded"
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getAllAddedToEmailBoxUser() {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_EmailBox_GET);
    const data = await response.json();

    resolve(data);
  });
}

//getAllAddedToEmailBoxUser
export function getAllUserSearchData(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/usersection/user?q=" + searchData);
    const data = await response.json();

    resolve(data);
  });
}

export function getAllUserNotAddedOnEmailSearchData(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/usersection/user?EmailBox=NotAdded&&q=" + searchData
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getTargetProduct(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_TARGET_PRODUCTS + id);
    const data = await response.json();

    resolve(data);
  });
}
export function getSimilerProduct(category, city) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/productssection/products/?category=${category}&city=${city}`
    );
    const data = await response.json();
    resolve(data);
  });
}
export function getProductForLocation(city) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/productssection/products/?city=" + city);
    const data = await response.json();

    resolve(data);
  });
}

export function getSearchResult(dataaa) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products?q=" + dataaa);
    const data = await response.json();

    resolve(data);
  });
}

export function getProductPost(NewProductsData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/productssection/products/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(NewProductsData),
    });
    const data = await response.json();

    resolve(data);
  });
}

export function getUpdateProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/productssection/products",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getUpdateTargetProduct(productData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/productssection/products",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getUpdateApplyJob(ApplyJob) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/applyjob/Apply/" + ApplyJob.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ApplyJob),
    });

    const data = await response.json();
    resolve(data);
  });
}
export function getreviewPost(reviewData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/reviewsection/review", {
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

    resolve(data);
  });
}

export function getNotificationsPost(notificationsData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/notificationsection/notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(notificationsData),
    });
    const data = await response.json();
    resolve(data);
  });
}
export function getNotificationsDelete(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/notificationsection/notification/" + itemId,
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
      `http://localhost:8000/notificationsection/notification?for=${id}&_sort=time&_order=desc`
    );
    const data = await response.json();

    const Unread = await fetch(
      `http://localhost:8000/notificationsection/notification?for=${id}&status=unRead&_sort=time&_order=desc`
    );
    const data2 = await Unread.json();
    const deleteArrayObject = await data.filter((element) => {
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
      "http://localhost:8000/notificationsection/notification/" + updateData._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updateData),
      }
    );

    const data = await response.json();
    resolve(data);
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

    resolve(data);
  });
}

export function getJobDataPost(ApplyData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/applyjob/Apply", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ApplyData),
    });
    const data = await response.json();

    resolve(data);
  });
}

export function getReviewData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/reviewsection/review/"+id);
    const data = await response.json();
    resolve(data);
  });
}

export function CheckReviewData(checkData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/reviewsection/review?productId=${checkData.id}&&postUser=${checkData.uid}`
    );
    const datarr = await response.json();

    resolve(datarr);
  });
}
////

export function getAllAppliedData() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/applyjob/Apply");
    const data = await response.json();
    resolve(data);
  });
}

export function getAllAppliedDataForSearch(searchData) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/applyjob/Apply?q=" + searchData);
    const data = await response.json();
    resolve(data);
  });
}

export function getJobData() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/jobOpenings");
    const data = await response.json();
    resolve(data);
  });
}
export function getReviewDataForTargerUser(postUser) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/reviewsection/review?postUser=" + postUser
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getDeliveryAppliedReq(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/ordersection/order?DeliveryReqBy=" + id
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getOrderDelivered(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/OrderDelivered?for=" + id
    );
    const data = await response.json();
    console.log(data);
    resolve(data);
  });
}

export function getCreateUser(userAddressData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8000/usersection/user", {
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
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
}

export function getUpdateUserAddress(newAddressData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/usersection/user",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newAddressData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getUpdateReviewBox(checkData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/reviewsection/review/${checkData.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(checkData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}

//        const response = await fetch(`http://localhost:8080/review?productId=${checkData.id}&&postUser=${checkData.uid}`);

export function getUpdateOrderStatus(orderData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/ordersection/order/" + orderData._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}

//getUpdateUserAddress

export function getCreateOrder(Orderdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/ordersection/order", {
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

    resolve(data);
  });
}

export function getCreateCart(Cartdata) {
  return new Promise(async (resolve) => {
    const response = await fetch("localhost:8000/cartsection/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Cartdata),
    });
    const data = await response.json();

    resolve(data);
  });
}

export function getUserMessegePost(UserMess) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/restaurantsection/restaurants", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(UserMess),
    });
    const data = await response.json();

    resolve(data);
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

    resolve(data);
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

    resolve(data);
  });
}

export function getOutForDelivery(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/OutForDeliverySection/OutForDelivery?for=" + id
    );
    const data = await response.json();

    resolve(data);
  });
}

export function getUserMessToResData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/restaurantsection/restaurants?dbAdd=" + id
    );
    const data = await response.json();

    resolve(data);
  });
}

export function updateQuantity(updateQnt) {
  return new Promise(async (resolve) => {
    const response = await fetch("localhost:8000/cartsection/cart/" + updateQnt.id, {
      method: "PATCH",
      body: JSON.stringify(updateQnt),
      headers: { "content-type": "application/json" },
    });

    const data = await response.json();
    resolve(data);
  });
}

export function getCartData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/cartsection/cart?userid=" + id);
    const data = await response.json();
    resolve(data);
  });
}
export function getRestaurantsData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/restaurantsection/restaurants?for=" + id);
    const data = await response.json();
    resolve(data);
  });
}

export function getPreviousUserData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/usersection/user?userid=" + id);
    const data = await response.json();
    resolve(data);
  });
}

export function getDeliveryUserData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/usersection/user?Access=" + id);
    const data = await response.json();
    resolve(data);
  });
}

//dbAdd
export function getCheckPostUserBox(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/UserMessegeRes?dbAdd=" + id
    );
    const data = await response.json();
    resolve(data);
  });
}

export function getOrderData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8000/ordersection/order?belngto=${id}&_sort=OrderPlacedTime&_order=desc`
    );
    const data = await response.json();
    resolve(data);
  });
}

export function getOrderDataforDeliveryBoy() {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/ordersection/order?DeliveryReq");
    const data = await response.json();
    resolve(data);
  });
}

export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("localhost:8000/cartsection/cart/" + itemId, {
      method: "DELETE",
    });

    resolve({ data: itemId });
  });
}

export function deleteApplyJob(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8000/applyjob/Apply/" + itemId, {
      method: "DELETE",
    });
    const data = await response.json();

    resolve({ data: itemId });
  });
}

export function OutForDeliveryItemDelete(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/OutForDeliverySection/OutForDelivery/" + itemId,
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
      "http://localhost:8000/OutForDeliverySection/OutForDelivery/" + itemId,
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
      "http://localhost:8000/OutForDeliverySection/OutForDelivery?currentDelivery=true&for=" + fordata
    );
    const data = await response.json();

    resolve(data);
  });
}
export function getUpdateOutForDelivery(UpdateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/OutForDeliverySection/OutForDelivery/" + UpdateData.id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      }
    );
    const data = await response.json();
    resolve(data);
  });
}

export function getEventObjectData(id) {
  return new Promise(async (resolve) => {
    const response = await fetch(process.env.REACT_APP_EVENTOBJECTDATA+id);
    console.log("responsefiugjfdio", response)
    const data = await response.json();
    resolve(data);
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

    resolve(data);
  });
}

export function getUpdateEventObjectData(UpdateData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8000/EventObjectSection/EventObjectData",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(UpdateData),
      }
    );
    const data = await response.json();

    resolve(data);
  });
}
