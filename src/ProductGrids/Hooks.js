export const images = [
    {
      link: "https://b.zmtcdn.com/data/o2_assets/52eb9796bb9bcf0eba64c643349e97211634401116.png",
      value: "Thali",
    },
    {
      link: "https://b.zmtcdn.com/data/o2_assets/8dc39742916ddc369ebeb91928391b931632716660.png",
      value: "Dosa",
    },
    {
      link: "https://b.zmtcdn.com/data/dish_images/d19a31d42d5913ff129cafd7cec772f81639737697.png",
      value: "Biryani",
    },
    {
      link: "https://b.zmtcdn.com/data/o2_assets/d0bd7c9405ac87f6aa65e31fe55800941632716575.png",
      value: "Pizza",
    },
    {
      link: "https://b.zmtcdn.com/data/o2_assets/fc641efbb73b10484257f295ef0b9b981634401116.png",
      value: "Sandwich",
    },
    {
      link: "https://img.freepik.com/premium-photo/hamburger-with-lettuce-plate-white-background-top-view_508835-628.jpg?size=338&ext=jpg&ga=GA1.1.386372595.1698278400&semt=ais",
      value: "burger",
    },
    {
      link: "https://b.zmtcdn.com/data/o2_assets/019409fe8f838312214d9211be010ef31678798444.jpeg",
      value: "Different Category",
    },
    {
      link: "https://b.zmtcdn.com/data/dish_images/c2f22c42f7ba90d81440a88449f4e5891634806087.png",
      value: "Roll",
    },
    {
      link: "https://b.zmtcdn.com/data/o2_assets/2b5a5b533473aada22015966f668e30e1633434990.png",
      value: "Alu Paratha",
    },
    {
      link: "https://b.zmtcdn.com/data/dish_images/197987b7ebcd1ee08f8c25ea4e77e20f1634731334.png",
      value: "BBQ",
    },
  ];
  //Data

  export  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];
  
  export  const filters = [
    {
      id: "cuisine",
      name: "Cuisine",
      options: [
        { value: "italian", label: "Italian", checked: false },
        { value: "american", label: "American", checked: false },
        { value: "japanese", label: "Japanese", checked: false },
        { value: "mexican", label: "Mexican", checked: false },
        { value: "indian", label: "Indian", checked: false },
      ],
    },
    {
      id: "category",
      name: "Category",
      options: [
        { value: "non-vegetarian", label: "non-vegetarian", checked: false },
        { value: "vegan", label: "Vegan", checked: false },
        { value: "vegetarian", label: "vegetarian", checked: false },
        { value: "gluten-free", label: "Gluten-Free", checked: false },
        { value: "spicy", label: "Spicy", checked: false },
      ],
    },
    {
      id: "price",
      name: "Price Range",
      options: [
        { value: "under-10", label: "Under $10", checked: false },
        { value: "10-20", label: "$10 - $20", checked: false },
        { value: "20-30", label: "$20 - $30", checked: false },
        { value: "30-plus", label: "$30+", checked: true },
      ],
    },
  ];

//Data................
 // Form Validation
 export function Fmvalidater(key) {
    switch (key) {
      case "name":
        return /^[A-Za-z\s]+$/;
      case "description":
        return /^[A-Za-z0-9\s.,?!()-]+$/;
      case "restaurantName":
        return /^[A-Za-z\s]+$/;
      case "ingredient1":
        return /^[A-Za-z\s]+$/;
      case "ingredient2":
        return /^[A-Za-z\s]*$/;
      case "ingredient3":
        return /^[A-Za-z\s]*$/;
      case "thumbnail":
        return /^https?:\/\/\S+\.(jpg|jpeg|png|gif)$/;
      case "image1":
        return /^https?:\/\/\S+\.(jpg|jpeg|png|gif)(\?\S+)?$/;
      case "image2":
        return /^https?:\/\/\S+\.(jpg|jpeg|png|gif)(\?\S+)?$/;
      case "image3":
        return /^https?:\/\/\S+\.(jpg|jpeg|png|gif)(\?\S+)?$/;
      case "image4":
        return /^https?:\/\/\S+\.(jpg|jpeg|png|gif)(\?\S+)?$/;
  
      case "highlight1":
        return /^[A-Za-z\s]+$/;
      case "highlight2":
        return /^[A-Za-z\s]*$/;
      case "highlight3":
        return /^[A-Za-z\s]*$/;
      case "cuisine":
        return /^[A-Za-z\s]+$/;
      case "city":
        return /^[A-Za-z\s]+$/;
      case "category":
        return /^[A-Za-z\s]+$/;
      case "priceRange":
        return /^(\d{1,2}-\d{1,2})$/;
      case "rating":
        return /^(\d(\.\d)?)$/;
      case "price":
        return /^(\d+(\.\d{2})?)$/;
      case "discountPercentage":
        return /^(100|[0-9]{1,2})$/;
      case "Small":
        return /^\d+(\.\d+)?(kg|g|gm)$/;
      case "Regular":
        return /^\d+(\.\d+)?(kg|g|gm)$/;
      case "Large":
        return /^\d+(\.\d+)?(kg|g|gm)$/;
  
      default:
        return /^[A-Za-z\s]+$/;
    }
  }
  // Form Validation
  //set Form 
  export function funSetValue(data, index, setValue,setEditObjectIndex,setEditProductId) {
    setValue("name", data.name);
    setValue("description", data.description);
    setValue("price", data.price);
    setValue("rating", data.rating);
    setValue("city", data.city);
    setValue("restaurantName", data.restaurantName);
    setValue("discountPercentage", data.discountPercentage);
    setValue("thumbnail", data.thumbnail); // restarunentName
    setValue("category", data.category);
    setValue("image1", data.images[0]);
    setValue("image2", data.images[1]);
    setValue("image3", data.images[2]);
    setValue("image4", data.images[3]);
    setValue("priceRange", data.priceRange);
    setValue("highlight1", data.highlights[0]);
    setValue("highlight2", data.highlights[1]);
    setValue("highlight3", data.highlights[2]); // cuisine
    setValue("ingredient1", data.ingredients[0]);
    setValue("ingredient2", data.ingredients[1]);
    setValue("ingredient3", data.ingredients[2]);
    setValue("cuisine", data.cuisine);
    setValue("Small", data.weight.Small);
    setValue("Regular", data.weight.Regular);
    setValue("Large", data.weight.Large);

    setEditObjectIndex(index);
    setEditProductId(data.id);
  }

  // set Form..............
  //Error Messege
  export  function getErrorMessage(key) {
    switch (key) {
      case "name":
        return "Name should contain only letters and spaces.";
      case "description":
        return "Description can only contain letters, numbers, spaces, and punctuation.";
      case "restaurantName":
        return "Restaurant name should contain only letters and spaces.";
      case "ingredient1":
        return "Ingredient 1 should contain only letters and spaces.";
      case "ingredient2":
        return "Ingredient 2 should contain only letters and spaces.";
      case "ingredient3":
        return "Ingredient 3 should contain only letters and spaces.";
      case "thumbnail":
      case "image1":
      case "image2":
      case "image3":
      case "image4":
        return 'Invalid image URL. It should start with "http://" or "https://" and end with ".jpg", ".jpeg", ".png", or ".gif".';
      case "highlight1":
        return "Highlight 1 should contain only letters and spaces.";
      case "highlight2":
        return "Highlight 2 should contain only letters and spaces.";
      case "highlight3":
        return "Highlight 3 should contain only letters and spaces.";
      case "cuisine":
        return "Cuisine should contain only letters and spaces.";
      case "city":
        return "City should contain only letters and spaces.";
      case "category":
        return "Category should contain only letters and spaces.";
      case "priceRange":
        return 'Invalid price range format. Use format "min-max".';
      case "rating":
        return "Invalid rating format. Use a decimal number with up to one decimal place.";
      case "price":
        return "Invalid price format. Use a decimal number with exactly two decimal places.";
      case "discountPercentage":
        return "Invalid discount percentage. Use a number between 0 and 100.";
      default:
        return "Invalid value.";
    }
  }
  export const ProductsDataShema = {
    name: "",
    description: "",
    price: 0,
    discountPercentage: 0,
    rating: 0,
    restaurantName: "",
    ingredient1: "",
    ingredient2: "",
    ingredient3: "",
    thumbnail: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    Small: "",
    Regular: "",
    Large: "",
    highlight1: "",
    highlight2: "",
    highlight3: "",
    cuisine: "",
    city: "",
    category: "",
    priceRange: "",
  };

  //Date
  const date = new Date();
  export const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Ensure 24-hour format
  };
  export const indianTime = date
    .toLocaleString("en-IN", options)
    .replace(/\//g, "-")
    .replace(",", "");
 //Date................

 export function convertToKg(grams) {
    if (typeof grams === "string") {
      grams = parseFloat(grams); // Convert string to a floating-point number
      if (isNaN(grams)) {
        return "Invalid input";
      }
    } else if (typeof grams !== "number") {
      return "Invalid input";
    }
  
    if (grams >= 1000) {
      const kilograms = (grams / 1000).toFixed(1);
      return `${kilograms}kg`;
    } else {
      return `${grams}g`;
    }
  }
  