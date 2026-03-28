export const products = [
  {
    id: 1,
    title: "Classic Cotton Tee",
    price: 29.99,
    category: "men's clothing",
    image: "/images/Classic Tee.jpg",
    description: "A soft everyday cotton t-shirt with a clean fit for casual wear.",
  },
  {
    id: 2,
    title: "Slim Fit Oxford Shirt",
    price: 54.5,
    category: "men's clothing",
    image: "/images/Oxford Shirt.jpg",
    description: "A crisp slim-fit oxford shirt that works for office and weekend styling.",
  },
  {
    id: 3,
    title: "Everyday Gold Hoop Set",
    price: 39.0,
    category: "jewelery",
    image: "/images/Gold Hoops.jpg",
    description: "Lightweight gold-tone hoop earrings made for all-day comfort.",
  },
  {
    id: 4,
    title: "Signature Leather Tote",
    price: 89.99,
    category: "women's clothing",
    image: "/images/Leather tote.jpg",
    description: "A spacious structured tote with interior pockets for daily essentials.",
  },
  {
    id: 5,
    title: "Wireless Noise Canceling Headphones",
    price: 149.99,
    category: "electronics",
    image: "/images/Headphones.jpg",
    description: "Over-ear headphones with rich sound, active noise canceling, and long battery life.",
  },
  {
    id: 6,
    title: "Ceramic Pendant Necklace",
    price: 45.25,
    category: "jewelery",
    image: "/images/Pendant.jpg",
    description: "A handcrafted pendant necklace with a warm ceramic centerpiece.",
  },
  {
    id: 7,
    title: "Relaxed Linen Dress",
    price: 72.0,
    category: "women's clothing",
    image: "/images/Linen Dress.jpg",
    description: "A breathable linen midi dress with a relaxed silhouette and side pockets.",
  },
  {
    id: 8,
    title: "Portable Bluetooth Speaker",
    price: 64.75,
    category: "electronics",
    image: "/images/Speakers.jpg",
    description: "A compact splash-resistant speaker with clear audio and punchy bass.",
  },
];

export const getProductById = (id) =>
  products.find((product) => product.id === Number(id)) || null;
