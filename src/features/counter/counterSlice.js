import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  CheckReviewData,
  OutForDeliveryItemDelete,
  deleteApplyJob,
  deleteCartItem,
  deleteOutForDelivery,
  fetchCount,
  getAllAddedToEmailBoxUser,
  getAllAppliedData,
  getAllAppliedDataForSearch,
  getAllNotAddedToEmailBoxUser,
  getAllOrderData,
  getAllOrderDataByFilter,
  getAllUserData,
  getAllUserNotAddedOnEmailSearchData,
  getAllUserSearchData,
  getCartData,
  getCreateCart,
  getCreateOrder,
  getCreateUser,
  getCurrentDeliveryItem,
  getDeletedProductData,
  getDeliveryAppliedReq,
  getDeliveryUserData,
  getEventObjectData,
  getEventObjectPostData,
  getJobData,
  getJobDataPost,
  getMeetingData,
  getNewMeetPost,
  getNotificationsDelete,
  getNotificationsPost,
  getNotificationsUpdate,
  getNotifitationData,
  getOrderData,
  getOrderDataforDeliveryBoy,
  getOrderDelivered,
  getOrderDeliveredPost,
  getOutForDelivery,
  getOutForDeliveryPost,
  getPreviousUserData,
  getProductData,
  getProductForLocation,
  getProductPost,
  getRestaurantsData,
  getReviewData,
  getReviewDataForTargerUser,
  getSearchResult,
  getSimilerProduct,
  getTargetProduct,
  getUpdateApplyJob,
  getUpdateEventObjectData,
  getUpdateOrderStatus,
  getUpdateOutForDelivery,
  getUpdateProduct,
  getUpdateReviewBox,
  getUpdateTargetProduct,
  getUpdateUserAddress,
  getUserMessToResData,
  getUserMessegePost,
  getreviewPost,
  updateQuantity,
  getCuisineData,
  getPriceRangeData,
  getCategoryData, 
  getrestaurentData
} from "./counterAPI";

const initialState = {
  value: 0,
  status: "idle",
  products: [],
  productTarget: [],
  review: [],
  checkReview: [],
  user: null,
  previousUser: [],
  searchdata: [],
  searchBarIndicator: null,
  order: [],
  cart: [],
  prevParam: null,
  spinerState: true,
  restaurants: [],
  UserMessToRes: [],
  prevComplete: false,
  similerProducts: [],
  latitude: -1,
  longitude: -1,
  AllUser: [],
  deletedProducts: [],
  totalProducts: [],
  targetReviewforUser: [],
  targetOrderforuser: [],
  Allreview: [],
  jobOpenings: [],
  Apply: [],
  DeliveryBoys: [],
  OrdersReq: [],
  OutForDelivery: [],
  AppliedForDelivery: [],
  OrderDelivered: [],
  MeetingData: [],
  currentMeeting: [],
  currentDeliveryData: [],
  uniqueRestaurantData: [],
  addedToEmailBox: [],
  targetRestauranrData: [],
  NotificationActiveBar: false,
  unReadNotification: [],
  notificationData: [],
  eventObjectData: [],
  TargetUserEventObjectData: {},
  CategoryData: {},
  PriceRangeData: {},
  CuisineData: {}, 
  restaurantName: {}
};
export const incrementAsync = createAsyncThunk(
  "counter/fetchCount",
  async (amount) => {
    const response = await fetchCount(amount);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getProductDataAsync = createAsyncThunk(
  "counter/getProductData",
  async (query) => {
    const response = await getProductData(query);

    return response;
  }
);

export const getTargetProductAsync = createAsyncThunk(
  "counter/getTargetProduct",
  async (id) => {
    const response = await getTargetProduct(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

//CategoryData
export const getCategoryDataAsync = createAsyncThunk(
  "counter/getCategoryData",
  async (id) => {
    const response = await getCategoryData(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
//CategoryData

//PriceRangeData
export const getPriceRangeDataAsync = createAsyncThunk(
  "counter/getPriceRangeData",
  async (id) => {
    const response = await getPriceRangeData(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);
//PriceRangeData


//CuisineData
export const getCuisineDataAsync = createAsyncThunk(
  "counter/getCuisineData",
  async (id) => {
    const response = await getCuisineData(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const getrestaurentDataAsync = createAsyncThunk(
  "counter/getrestaurentData",
  async (id) => {
    const response = await getrestaurentData(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

//getrestaurentData
export const deleteOutForDeliveryAsync = createAsyncThunk(
  "counter/deleteOutForDelivery",
  async (id) => {
    const response = await deleteOutForDelivery(id);
    // The value we return becomes the `fulfilled` action payload
    return response;
  }
);

export const targetRestauranrDataAsync = createAsyncThunk(
  "counter/targetRestauranrDataFun",
  async (data) => {
    // The value we return becomes the `fulfilled` action payload
    return data;
  }
);

export const getMeetingDataAsync = createAsyncThunk(
  "counter/getMeetingData",
  async () => {
    const response = await getMeetingData();

    return response;
  }
);

export const CheckReviewDataAsync = createAsyncThunk(
  "counter/CheckReviewData",
  async (data) => {
    const response = await CheckReviewData(data);

    return response;
  }
);

export const getUpdateReviewBoxAsync = createAsyncThunk(
  "counter/getUpdateReviewBox",
  async (data) => {
    const response = await getUpdateReviewBox(data);

    return response;
  }
);

export const getUpdateNotificationxAsync = createAsyncThunk(
  "counter/getUpdateNotificationx",
  async (data) => {
    return data;
  }
);

export const getUpdateApplyJobAsync = createAsyncThunk(
  "counter/getUpdateApplyJob",
  async (data) => {
    const response = await getUpdateApplyJob(data);

    return response;
  }
);

export const getdeleteApplyJobAsync = createAsyncThunk(
  "counter/deleteApplyJob",
  async (data) => {
    await deleteApplyJob(data.id);

    return { id: data.id, index: data.index };
  }
);

export const getNotificationsPostAsync = createAsyncThunk(
  "counter/getNotificationsPost",
  async (data) => {
    const response = await getNotificationsPost(data);

    return response;
  }
);

export const getNotifitationDataAsync = createAsyncThunk(
  "counter/getNotifitationData",
  async (data) => {
    const response = await getNotifitationData(data);

    return response;
  }
);

export const getCurrentDeliveryItemAsync = createAsyncThunk(
  "counter/getCurrentDeliveryItem",
  async (data) => {
    const response = await getCurrentDeliveryItem(data);

    return response;
  }
);

export const getUpdateOutForDeliveryAsync = createAsyncThunk(
  "counter/getUpdateOutForDelivery",
  async (data) => {
    const response = await getUpdateOutForDelivery(data);

    return response;
  }
);
//getUpdateOutForDelivery

export const getRestaurantsDataAsync = createAsyncThunk(
  "counter/getRestaurantsData",
  async (id) => {
    const response = await getRestaurantsData(id);
    return response;
  }
);

export const getUserMessegePostAsync = createAsyncThunk(
  "counter/getUserMessegePost",
  async (data) => {
    const response = await getUserMessegePost(data);
    return response;
  }
);

export const getUserMessToResDataAsync = createAsyncThunk(
  "counter/getUserMessToResData",
  async (id) => {
    const response = await getUserMessToResData(id);
    return response;
  }
);
export const getUpdateProductAsync = createAsyncThunk(
  "counter/getUpdateProduct",
  async (data) => {
    const response = await getUpdateProduct(data.productData);

    response.index = data.index;
    return response;
  }
);

export const getUpdateTargetProductMainAsync = createAsyncThunk(
  "counter/getUpdateTargetProductMaingfg",
  async (data) => {
    const response = await getUpdateTargetProduct(data);

    return response;
  }
);

export const getUpdateNewDeliverAsync = createAsyncThunk(
  "counter/getUpdateNewDeliver",
  async (data) => {
    return data;
  }
);

//getUpdateTargetProduct
export const getAllOrderDataAsync = createAsyncThunk(
  "counter/getAllOrderData",
  async () => {
    const response = await getAllOrderData();

    return response;
  }
);

export const getAllUserDataAsync = createAsyncThunk(
  "counter/getAllUserData",
  async () => {
    const response = await getAllUserData();

    return response;
  }
);

export const getAllNotAddedToEmailBoxUserAsync = createAsyncThunk(
  "counter/getAllNotAddedToEmailBoxUser",
  async () => {
    const response = await getAllNotAddedToEmailBoxUser();

    return response;
  }
);

export const getAllAddedToEmailBoxUserAsync = createAsyncThunk(
  "counter/getAllAddedToEmailBoxUser",
  async () => {
    const response = await getAllAddedToEmailBoxUser();

    return response;
  }
);

export const getAllUserNotAddedOnEmailSearchDataAsync = createAsyncThunk(
  "counter/getAllUserNotAddedOnEmailSearchData",
  async (data) => {
    const response = await getAllUserNotAddedOnEmailSearchData(data);

    return response;
  }
);
export const getEventObjectDataAsync = createAsyncThunk(
  "counter/getEventObjectData",
  async (data) => {
    const response = await getEventObjectData(data);

    return response;
  }
);

export const getUpdateEventObjectDataAsync = createAsyncThunk(
  "counter/getUpdateEventObjectData",
  async (data) => {
    const response = await getUpdateEventObjectData(data);

    return response;
  }
);

//getUpdateEventObjectData
export const getUpdateAllUserDataAsync = createAsyncThunk(
  "counter/getUpdateAllUserData",
  async (index) => {
    return index;
  }
);

export const getUpdateAllUserDataForPushAsync = createAsyncThunk(
  "counter/getUpdateAllUserDataForPush",
  async (data) => {
    return data;
  }
);

//getAllUserDataAsync
export const getDeletedProductDataAsync = createAsyncThunk(
  "counter/getDeletedProductData",
  async () => {
    const response = await getDeletedProductData();

    return response;
  }
);

export const getJobDataAsync = createAsyncThunk(
  "counter/getJobData",
  async () => {
    const response = await getJobData();

    return response;
  }
);

export const getJobDataPostAsync = createAsyncThunk(
  "counter/getJobDataPost",
  async (data) => {
    const response = await getJobDataPost(data);

    return response;
  }
);

export const getOutForDeliveryPostAsync = createAsyncThunk(
  "counter/getOutForDeliveryPost",
  async (data) => {
    const response = await getOutForDeliveryPost(data);

    return response;
  }
);
export const getNotificationsDeletetAsync = createAsyncThunk(
  "counter/getNotificationsDelete",
  async (data) => {
    const response = await getNotificationsDelete(data);

    return response;
  }
);
export const getNotificationsUpdateAsync = createAsyncThunk(
  "counter/getNotificationsUpdate",
  async (data) => {
    const response = await getNotificationsUpdate(data);

    return response;
  }
);

//getNotificationsUpdate
export const OutForDeliveryItemDeleteAsync = createAsyncThunk(
  "counter/OutForDeliveryItemDelete",
  async (id) => {
    const response = await OutForDeliveryItemDelete(id);
    return id;
  }
);

//OutForDeliveryItemDelete

export const getOutForDeliveryAsync = createAsyncThunk(
  "counter/getOutForDelivery",
  async (data) => {
    const response = await getOutForDelivery(data);

    return response;
  }
);
export const getEventObjectTargetUserDataAsync = createAsyncThunk(
  "counter/getEventObjectTargetUserData",
  async (data) => {
    const response = await getEventObjectData(data);

    return response;
  }
);
//getEventObjectData
export const getDeliveryAppliedReqAsync = createAsyncThunk(
  "counter/getDeliveryAppliedReq",
  async (id) => {
    const response = await getDeliveryAppliedReq(id);

    return response;
  }
);

export const getDeliveryAppliedReqUpdatePushAsync = createAsyncThunk(
  "counter/getDeliveryAppliedUpdatePushReq",
  async (data) => {
    return data;
  }
);

export const getuniqueRestaurantDataAsync = createAsyncThunk(
  "counter/getuniqueRestaurantData",
  async (data) => {
    return data;
  }
);

//uniqueRestaurantData
export const getsearchdataResetAsync = createAsyncThunk(
  "counter/getsearchdataReset",
  async () => {
    return [];
  }
);

//searchdata

export const getDeliveryAppliedReqUpdateRemoveAsync = createAsyncThunk(
  "counter/getDeliveryAppliedUpdateRemoveReq",
  async (data) => {
    return data;
  }
);
//getNewMeetPost

export const getreviewPostAsync = createAsyncThunk(
  "counter/getreviewPost",
  async (reviewData) => {
    const response = await getreviewPost(reviewData);

    return response;
  }
);

export const getPreviousUserDataAsync = createAsyncThunk(
  "counter/getPreviousUserData",
  async (uid) => {
    const response = await getPreviousUserData(uid);

    return response;
  }
);

export const getPreviousUserDataResetAsync = createAsyncThunk(
  "counter/PreviousUserDataReset",
  async () => {
    return [];
  }
);

export const getUpdateTargetProductAsync = createAsyncThunk(
  "counter/PreviousUserDataReset",
  async () => {
    return [];
  }
);
export const getSimilerProductAsync = createAsyncThunk(
  "counter/getSimilerProduct",
  async ({ cate, cityy }) => {
    const response = await getSimilerProduct(cate, cityy);

    return response;
  }
);

export const setLongiLatitAsync = createAsyncThunk(
  "counter/setLongiLatit",
  async (data) => {
    return data;
  }
);

//getSimilerProduct
export const getReviewDataAsync = createAsyncThunk(
  "counter/getReviewData",
  async (id) => {
    const response = await getReviewData(id);
    const filteredResults = response.filter((rewiew) => {
      return rewiew.productId == id;
    });
    return filteredResults;
  }
);

export const getAllReviewDataAsync = createAsyncThunk(
  "counter/getAllReviewData",
  async (id) => {
    const response = await getReviewData(id);

    return response;
  }
);

export const getCreateUserAsync = createAsyncThunk(
  "counter/getCreateUserdfgfd",
  async (userData) => {
    function containsSpecialCharacters(inputString) {
      const pattern = /[^a-zA-Z0-9]/;

      if (pattern.test(inputString)) {
        return true;
      }

      return false;
    }

    function removeSpecialCharacters(inputString) {
      if (containsSpecialCharacters(inputString)) {
        const pattern = /[^a-zA-Z0-9]/g;

        const result = inputString.replace(pattern, "");

        return result;
      }

      return inputString;
    }
    const temp = await removeSpecialCharacters(userData.uid);
    userData.uid = temp;

    if (!userData.photoURL) {
      userData.photoURL =
        "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    }

    return userData;
  }
);

export const getResetTargetProductAsync = createAsyncThunk(
  "counter/getResetTarget",
  async () => {
    return [];
  }
);

export const getResetSpinerAsync = createAsyncThunk(
  "counter/getResetSpiner",
  async () => {
    return true;
  }
);
export const getrestSpinerAsync = createAsyncThunk(
  "counter/getrestSpiner",
  async () => {
    return true;
  }
);

export const getPreParamsAsync = createAsyncThunk(
  "counter/getPreParams",
  async (paramsdata) => {
    return paramsdata;
  }
);

export const getCreateUserAddressAsync = createAsyncThunk(
  "counter/getCreateUser",
  async (userAddressData) => {
    const response = await getCreateUser(userAddressData);

    return response;
  }
);
export const getUpdateUserAddressAsync = createAsyncThunk(
  "counter/getUpdateUserAddress",
  async (newAddressData) => {
    const response = getUpdateUserAddress(newAddressData);

    return response;
  }
);

export const getLogoutAsync = createAsyncThunk("counter/getLogout", () => {
  return null;
});

export const getCreateOrderAsync = createAsyncThunk(
  "counter/getCreateOrder",
  async (orderData) => {
    const response = await getCreateOrder(orderData);
    return response;
  }
);

export const getSearchResultAsync = createAsyncThunk(
  "counter/getSearchResult",
  async (searchData) => {
    const response = await getSearchResult(searchData);
    return response;
  }
);

export const getAllUserSearchDatatAsync = createAsyncThunk(
  "counter/getAllUserSearchData",
  async (searchData) => {
    const response = await getAllUserSearchData(searchData);
    return response;
  }
);
////getAllUserSearchData

export const getOrderDataAsync = createAsyncThunk(
  "counter/getOrderData",
  async (id) => {
    const response = await getOrderData(id);
    return response;
  }
);

export const getProductForLocationAsync = createAsyncThunk(
  "counter/getProductForLocation",
  async (city) => {
    const response = await getProductForLocation(city);

    return response;
  }
);
export const getEventObjectPostDataAsync = createAsyncThunk(
  "counter/getEventObjectPostData",
  async (data) => {
    const response = await getEventObjectPostData(data);

    return response;
  }
);

//getEventObjectPostData
export const getProductPostAsync = createAsyncThunk(
  "counter/getProductPost",
  async (data) => {
    const response = await getProductPost(data);

    return response;
  }
);

export const AdminFilterOrderUpdateAsync = createAsyncThunk(
  "counter/AdminFilterOrderUpdate",
  async (data) => {
    return data;
  }
);
export const currentMeetingResetAsync = createAsyncThunk(
  "counter/currentMeetingReset",
  async (data) => {
    return data;
  }
);
//currentMeeting

export const getSetOrderReqAsync = createAsyncThunk(
  "counter/getSetOrderReq",
  async (data) => {
    return data;
  }
);

export const getCreateCartAsync = createAsyncThunk(
  "counter/getCreateCart",
  async (data) => {
    console.log("fjsdkjfhskdjfh",data)
    const response = await getCreateCart(data);
    return response;
  }
);

export const getReviewDataForTargerUserAsync = createAsyncThunk(
  "counter/getReviewDataForTargerUser",
  async (postUser) => {
    const response = await getReviewDataForTargerUser(postUser);
    return response;
  }
);
export const getOrderDataForTargerUserAsync = createAsyncThunk(
  "counter/getOrderDataForTarger",
  async (belongto) => {
    const response = await getOrderData(belongto);
    return response;
  }
);

export const getDeliveryUserDataAsync = createAsyncThunk(
  "counter/getDeliveryUserData",
  async (Access) => {
    const response = await getDeliveryUserData(Access);
    return response;
  }
);

export const getOrderDataforDeliveryBoyAsync = createAsyncThunk(
  "counter/getOrderDataforDeliveryBoy",
  async () => {
    const response = await getOrderDataforDeliveryBoy();
    return response;
  }
);

export const getOrderDeliveredPostAsync = createAsyncThunk(
  "counter/getOrderDeliveredPost",
  async (data) => {
    const response = await getOrderDeliveredPost(data);
    return response;
  }
);

export const getNewMeetPosttAsync = createAsyncThunk(
  "counter/getNewMeetPost",
  async (data) => {
    const response = await getNewMeetPost(data);
    return response;
  }
);

export const getAllOrderDataByFilterAsync = createAsyncThunk(
  "counter/getAllOrderDataByFilter",
  async (data) => {
    const response = await getAllOrderDataByFilter(data);
    return response;
  }
);
//getAllOrderDataByFilter
export const getUpdateOrderStatusAsync = createAsyncThunk(
  "counter/getUpdateOrderStatus",
  async (data) => {
    const response = await getUpdateOrderStatus(data);
    return response;
  }
);

export const getAllAppliedDataAsync = createAsyncThunk(
  "counter/getAllAppliedData",
  async () => {
    const response = await getAllAppliedData();
    return response;
  }
);

export const getAllAppliedDataForSearchAsync = createAsyncThunk(
  "counter/getAllAppliedDataForSearch",
  async (data) => {
    const response = await getAllAppliedDataForSearch(data);
    return response;
  }
);

//getAllAppliedDataForSearch

export const getOrderDeliveredAsync = createAsyncThunk(
  "counter/getOrderDelivered",
  async (id) => {
    const response = await getOrderDelivered(id);
    return response;
  }
);
// getOrderDelivered
export const getCartDataAsync = createAsyncThunk(
  "counter/getCartData",
  async (id) => {
    const response = await getCartData(id);
    return response;
  }
);

export const updateQuantityAsync = createAsyncThunk(
  "counter/updateQuantity",
  async (Updatedata) => {
    const response = await updateQuantity(Updatedata);

    return response;
  }
);

export const deleteCartItemAsync = createAsyncThunk(
  "counter/deleteCartItem",
  async (id) => {
    const response = await deleteCartItem(id);

    return id;
  }
);

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      })
      .addCase(getProductDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const temp = "";
        state.spinerState = false;
        state.products = action.payload.data;
        state.totalProducts =action.payload?.dataLength;
      })
      .addCase(getTargetProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getTargetProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productTarget = action.payload;
        state.spinerState = false;
      })
      .addCase(getreviewPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getreviewPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.review.push(action.payload);
        state.checkReview = [action.payload];
      })
      .addCase(getReviewDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReviewDataAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.review = action.payload;
      })
      .addCase(getCreateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCreateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      })
      .addCase(getLogoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getLogoutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = null;
      })
      .addCase(getCreateOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCreateOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order.push(action.payload);
      })
      .addCase(getOrderDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(getCreateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCreateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart.push(action.payload);
      })
      .addCase(getCartDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCartDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = action.payload;
      })
      .addCase(updateQuantityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateQuantityAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteCartItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCartItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cart = state.cart.filter((item) => item.id !== action.payload);
      })
      .addCase(getPreviousUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPreviousUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.previousUser = action.payload;
        state.prevComplete = true;
      })
      .addCase(getPreParamsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPreParamsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.prevParam = action.payload;
      })
      .addCase(getrestSpinerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getrestSpinerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.spinerState = action.payload;
      })
      .addCase(getResetTargetProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getResetTargetProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productTarget = action.payload;
      })
      .addCase(getResetSpinerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getResetSpinerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.spinerState = action.payload;
      })
      .addCase(getRestaurantsDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRestaurantsDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.restaurants = action.payload;
      })
      .addCase(getUserMessToResDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserMessToResDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserMessToRes = action.payload;
      })
      .addCase(getUserMessegePostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUserMessegePostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.UserMessToRes = action.payload;
      })
      .addCase(getCreateUserAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCreateUserAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.previousUser.push(action.payload);
      })
      .addCase(getUpdateUserAddressAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateUserAddressAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (state.previousUser.length != 0) {
          state.previousUser.slice(0, 1).push(action.payload);
        }
      })
      .addCase(getProductForLocationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductForLocationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(getSimilerProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSimilerProductAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.similerProducts = action.payload;
      })
      .addCase(getProductPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products.push(action.payload);
      })
      .addCase(getPreviousUserDataResetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPreviousUserDataResetAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.previousUser = action.payload;
      })
      .addCase(getUpdateProductAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateProductAsync.fulfilled, (state, action) => {
        state.status = "idle";

        if (!action.payload?.VisibleStatus) {
          const forRestore = state.deletedProducts.filter((element) => {
            return element.id !== action.payload.id;
          });
          state.deletedProducts = forRestore;
          state.products.push(action.payload);
        } else {
          const upState = state.products.filter((element) => {
            return element.id !== action.payload.id;
          });
          state.deletedProducts.push(action.payload);
          state.products = upState;
        }
      })
      .addCase(AdminFilterOrderUpdateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AdminFilterOrderUpdateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(getAllOrderDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrderDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(setLongiLatitAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(setLongiLatitAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.latitude = action.payload.latitude;
        state.longitude = action.payload.longitude;
      })
      .addCase(getAllUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllUser = action.payload;
      })
      .addCase(getDeletedProductDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeletedProductDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.deletedProducts = action.payload;
      })
      .addCase(getReviewDataForTargerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getReviewDataForTargerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.targetReviewforUser = action.payload;
      })
      .addCase(getOrderDataForTargerUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDataForTargerUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.targetOrderforuser = action.payload;
      })
      .addCase(getAllReviewDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllReviewDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Allreview = action.payload;
      })
      .addCase(getJobDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.jobOpenings = action.payload;
      })
      .addCase(getJobDataPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobDataPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Apply.push(action.payload);
      })
      .addCase(getAllAppliedDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAppliedDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Apply = action.payload;
      })
      .addCase(getDeliveryUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeliveryUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.DeliveryBoys = action.payload;
      })
      .addCase(getOrderDataforDeliveryBoyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDataforDeliveryBoyAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OrdersReq = action.payload;
      })
      .addCase(getSetOrderReqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSetOrderReqAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OrdersReq = action.payload;
      })
      .addCase(getOutForDeliveryPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOutForDeliveryPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OutForDelivery.push(action.payload);
      })
      .addCase(getOutForDeliveryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOutForDeliveryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OutForDelivery = action.payload;
      })
      .addCase(getDeliveryAppliedReqAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDeliveryAppliedReqAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AppliedForDelivery = action.payload;
      })
      .addCase(getDeliveryAppliedReqUpdatePushAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDeliveryAppliedReqUpdatePushAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.AppliedForDelivery = [
            ...state.AppliedForDelivery,
            action.payload,
          ];
        }
      )
      .addCase(getDeliveryAppliedReqUpdateRemoveAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getDeliveryAppliedReqUpdateRemoveAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.AppliedForDelivery = action.payload;
        }
      )
      .addCase(deleteOutForDeliveryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteOutForDeliveryAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const updateState = state.OutForDelivery.filter(
          (element) => element.id !== action.payload.data
        );

        state.OutForDelivery = updateState;
      })
      .addCase(getOrderDeliveredPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDeliveredPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OrderDelivered.push(action.payload);
      })
      .addCase(getOrderDeliveredAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getOrderDeliveredAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.OrderDelivered = action.payload;
      })
      .addCase(getMeetingDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMeetingDataAsync.fulfilled, (state, action) => {
        state.status = "idle";

        state.MeetingData = action.payload.meetings;
      })
      .addCase(getNewMeetPosttAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNewMeetPosttAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.MeetingData.push(action.payload);
        state.currentMeeting = [action.payload];
      })
      .addCase(currentMeetingResetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(currentMeetingResetAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentMeeting = action.payload;
      })
      .addCase(getsearchdataResetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getsearchdataResetAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchdata = action.payload;
      })
      .addCase(getSearchResultAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchResultAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.searchdata = action.payload;
      })
      .addCase(getAllUserSearchDatatAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUserSearchDatatAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllUser = action.payload;
      })
      .addCase(getuniqueRestaurantDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getuniqueRestaurantDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.uniqueRestaurantData = action.payload;
      })
      .addCase(getAllAppliedDataForSearchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAppliedDataForSearchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Apply = action.payload;
      })
      .addCase(getUpdateAllUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateAllUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const newArray = [...state.AllUser];

        newArray.splice(action.payload, 1);

        state.AllUser = newArray;
      })
      .addCase(getUpdateAllUserDataForPushAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateAllUserDataForPushAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllUser.push(action.payload);
      })
      .addCase(getAllNotAddedToEmailBoxUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllNotAddedToEmailBoxUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.AllUser = action.payload;
      })
      .addCase(getAllAddedToEmailBoxUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllAddedToEmailBoxUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.addedToEmailBox = action.payload;
      })
      .addCase(getAllUserNotAddedOnEmailSearchDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllUserNotAddedOnEmailSearchDataAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.AllUser = action.payload;
        }
      )
      .addCase(OutForDeliveryItemDeleteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(OutForDeliveryItemDeleteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const newArray = state.OutForDelivery.filter((element) => {
          return element.id !== action.payload;
        });
        state.OutForDelivery = newArray;
      })
      .addCase(getAllOrderDataByFilterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllOrderDataByFilterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.order = action.payload;
      })
      .addCase(CheckReviewDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(CheckReviewDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.checkReview = action.payload;
      })
      .addCase(getUpdateTargetProductMainAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateTargetProductMainAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.productTarget = action.payload;
      })
      .addCase(getUpdateReviewBoxAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateReviewBoxAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.checkReview = [action.payload];
      })
      .addCase(targetRestauranrDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(targetRestauranrDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.targetRestauranrData = [action.payload];
      })
      .addCase(getUpdateApplyJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateApplyJobAsync.fulfilled, (state, action) => {
        state.status = "idle";

        const newArray = [...state.Apply].map((mapElement) => {
          if (mapElement.id == action.payload.id) {
            return action.payload;
          } else {
            return { ...mapElement };
          }
        });
        state.Apply = newArray;
      })
      .addCase(getdeleteApplyJobAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getdeleteApplyJobAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const helperArray = state.Apply.filter(
          (element) => element.id != action.payload.id
        );
        state.Apply = helperArray;
      })
      .addCase(getUpdateNotificationxAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateNotificationxAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.NotificationActiveBar = action.payload;
      })
      .addCase(getNotificationsPostAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotificationsPostAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.notificationData.push(action.payload);
      })
      .addCase(getNotifitationDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotifitationDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.notificationData = action.payload.AllNoti;
        state.unReadNotification = action.payload.unReadNoti;
      })
      .addCase(getCurrentDeliveryItemAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCurrentDeliveryItemAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentDeliveryData = action.payload;
      })
      .addCase(getUpdateNewDeliverAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateNewDeliverAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.currentDeliveryData = [action.payload];
      })
      .addCase(getEventObjectDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventObjectDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.eventObjectData = action.payload;
      })
      .addCase(getEventObjectPostDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventObjectPostDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.eventObjectData = action.payload;
      })
      .addCase(getUpdateEventObjectDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUpdateEventObjectDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.eventObjectData = action.payload;
      })
      .addCase(getEventObjectTargetUserDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEventObjectTargetUserDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.TargetUserEventObjectData = action.payload;
      })
      .addCase(getNotificationsDeletetAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotificationsDeletetAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const filterArray = state.notificationData.filter((element) => {
          return element.id != action.payload.data;
        });
        state.notificationData = filterArray;
      })
      .addCase(getNotificationsUpdateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getNotificationsUpdateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const filterArray = state.notificationData.map((element) => {
          if (element.id !== action.payload.id) {
            return { ...element };
          } else {
            return { ...action.payload };
          }
        });
        state.notificationData = filterArray;
      }).addCase(getCategoryDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategoryDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.CategoryData
        = action.payload;
      }).addCase(getPriceRangeDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPriceRangeDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.PriceRangeData
        = action.payload;
      }).addCase(getCuisineDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCuisineDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.CuisineData
        = action.payload;
      }).addCase(getrestaurentDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getrestaurentDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.restaurantName
        = action.payload;
      });

      //getCategoryDataAsync, getPriceRangeDataAsync, getCuisineDataAsync, getrestaurentDataAsync

  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export const selectCount = (state) => state.counter.value;
export const selectProducts = (state) => state.counter.products;
export const selectTargetProduct = (state) => state.counter.productTarget;
export const selectReview = (state) => state.counter.review;
export const selectuser = (state) => state.counter.user;
export const selectsearchdata = (state) => state.counter.searchdata;
export const selectOderData = (state) => state.counter.order;
export const selectcartData = (state) => state.counter.cart;
export const selectPreviousUserData = (state) => state.counter.previousUser;
export const selectsearchBarIndicator = (state) =>
  state.counter.searchBarIndicator;
export const selectPreParams = (state) => state.counter.prevParam;
export const selectspinerState = (state) => state.counter.spinerState;
export const selectRestaurantsState = (state) => state.counter.restaurants;
export const selectUserMessToResData = (state) => state.counter.UserMessToRes;
export const selectprevCompleteData = (state) => state.counter.prevComplete;
export const selectSimilerData = (state) => state.counter.similerProducts;
export const selectlongitude = (state) => state.counter.longitude;
export const selectlatitude = (state) => state.counter.latitude;
export const selectAllUser = (state) => state.counter.AllUser;
export const selectDeletedProducts = (state) => state.counter.deletedProducts;
export const selectTotalProducts = (state) => state.counter.totalProducts;
export const selectTargetreviewForUser = (state) =>
  state.counter.targetReviewforUser;
export const selectTargetOrderForUser = (state) =>
  state.counter.targetOrderforuser;
export const selectAllReview = (state) => state.counter.Allreview;
export const selectjobOpenings = (state) => state.counter.jobOpenings;
export const selectApply = (state) => state.counter.Apply;
export const SelectDeliveryBoy = (state) => state.counter.DeliveryBoys;
export const SelectOrderReq = (state) => state.counter.OrdersReq;
export const SelectOutForDelivery = (state) => state.counter.OutForDelivery;
export const SelectAppliedForDelivery = (state) =>
  state.counter.AppliedForDelivery;
export const SelectOrderDelivered = (state) => state.counter.OrderDelivered;
export const SelectMeetingData = (state) => state.counter.MeetingData;
export const selectcurrentMeetingLink = (state) => state.counter.currentMeeting;
export const selectuniqueRestaurantData = (state) =>
  state.counter.uniqueRestaurantData;
export const selectaddedToEmailBox = (state) => state.counter.addedToEmailBox;
export const selectcheckReview = (state) => state.counter.checkReview;
export const selecttargetRestauranrData = (state) =>
  state.counter.targetRestauranrData;
export const selectNotificationActiveBar = (state) =>
  state.counter.NotificationActiveBar;
export const selectnotificationData = (state) => state.counter.notificationData;
export const selectcurrentDeliveryData = (state) =>
  state.counter.currentDeliveryData;
export const selecteventObjectData = (state) => state.counter.eventObjectData;
export const selectTargetUserEventObjectData = (state) =>
  state.counter.TargetUserEventObjectData;
export const selectCuisineData = (state) =>
  state.counter.CuisineData;
  export const selectPriceRangeData
  = (state) =>
  state.counter.PriceRangeData;
  export const selectCategoryData = (state) =>
  state.counter.CategoryData;
  export const selectrestaurantName= (state) =>
  state.counter.restaurantName;
  export const selectunReadNotificationData = (state) =>
  state.counter.unReadNotification;
//restaurantName
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
