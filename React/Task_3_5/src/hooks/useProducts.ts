import type { Product } from '../types';

import akracingImg from '../assets/images/akracing.png';
import aleraImg from '../assets/images/alera.png';
import corsairImg from '../assets/images/corsair.png';
import itoliImg from '../assets/images/itoli.png';
import lorellImg from '../assets/images/lorell.png';
import realspaceImg from '../assets/images/realspace.png';
import riloopImg from '../assets/images/riloop.png';
import riloop2Img from '../assets/images/riloop_2.png';
import sharkoonImg from '../assets/images/sharkoon.png';
import workproImg from '../assets/images/workpro.png';

/** Return type for the useProducts hook. */
interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
}

/** Local chair products with images from assets/images */
const LOCAL_PRODUCTS: Product[] = [
  {
    id: 1,
    title: 'RILOOP Computer Chair, Gaming Chair, Ergonomic S...',
    description: 'RILOOP Computer Chair, Gaming Chair, Ergonomic Swivel Chair with Footrest, Executive Chair with Arms and Wheels Adjustableing Load-Beacapacity and with Massage Multifunctional Chair/Blue',
    price: 398.00,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    brand: 'RILOOP',
    category: 'chairs',
    thumbnail: riloopImg,
    images: [riloopImg],
  },
  {
    id: 2,
    title: 'AKRacing A4-Opal Gaming Chair, One Size, Bla...',
    description: 'AKRacing A4-Opal Gaming Chair, One Size, Black/Red.',
    price: 149.99,
    discountPercentage: 0,
    rating: 4.3,
    stock: 10,
    brand: 'AKRacing',
    category: 'chairs',
    thumbnail: akracingImg,
    images: [akracingImg],
  },
  {
    id: 3,
    title: 'Lorell Chair, Red/Black',
    description: 'Lorell Chair, Red/Black. Ergonomic office chair.',
    price: 199.99,
    discountPercentage: 0,
    rating: 4.1,
    stock: 10,
    brand: 'Lorell',
    category: 'chairs',
    thumbnail: lorellImg,
    images: [lorellImg],
  },
  {
    id: 4,
    title: 'Corsair T1 Race (2023) Gaming Chair, One Size, Bla...',
    description: 'Corsair T1 Race (2023) Gaming Chair.',
    price: 79.99,
    discountPercentage: 0,
    rating: 4.4,
    stock: 10,
    brand: 'Corsair',
    category: 'chairs',
    thumbnail: corsairImg,
    images: [corsairImg],
  },
  {
    id: 5,
    title: 'WorkPro 1000 Series Ergonomic Mesh/Mesh Mid...',
    description: 'WorkPro 1000 Series Ergonomic Mesh/Mesh Mid-Back Task Chair, Black/Black, BIFMA Compliant.',
    price: 179.99,
    discountPercentage: 0,
    rating: 4.6,
    stock: 10,
    brand: 'WorkPro',
    category: 'chairs',
    thumbnail: workproImg,
    images: [workproImg],
  },
  {
    id: 6,
    title: 'Realspace® Srvad Big & Tall Bonded Leather High-Back...',
    description: 'Realspace Srvad Big & Tall Bonded Leather High-Back Chair.',
    price: 149.99,
    discountPercentage: 0,
    rating: 4.0,
    stock: 10,
    brand: 'Realspace',
    category: 'chairs',
    thumbnail: realspaceImg,
    images: [realspaceImg],
  },
  {
    id: 7,
    title: 'Alera ALEEL41ME10B Elusion Series High-Back Multifunc...',
    description: 'Alera ALEEL41ME10B Elusion Series High-Back Multifunction Mesh Chair - Black.',
    price: 79.99,
    discountPercentage: 0,
    rating: 4.2,
    stock: 10,
    brand: 'Alera',
    category: 'chairs',
    thumbnail: aleraImg,
    images: [aleraImg],
  },
  {
    id: 8,
    title: 'Sharkoon Skiller SGS4 Gaming Chair, 58 × 62.5 × 1...',
    description: 'Sharkoon Skiller SGS4 Gaming Chair.',
    price: 208.00,
    discountPercentage: 0,
    rating: 4.3,
    stock: 10,
    brand: 'Sharkoon',
    category: 'chairs',
    thumbnail: sharkoonImg,
    images: [sharkoonImg],
  },
  {
    id: 9,
    title: 'itoki YES-A-WH-A61 Gaming Chair, Office Chair, Cross F...',
    description: 'itoki YES-A-WH-A61 Gaming Chair, Office Chair, Cross Functional Chair.',
    price: 237.00,
    discountPercentage: 0,
    rating: 4.1,
    stock: 10,
    brand: 'itoki',
    category: 'chairs',
    thumbnail: itoliImg,
    images: [itoliImg],
  },
  {
    id: 10,
    title: 'RILOOP Computer Chair, Gaming Chair, Ergonomic S...',
    description: 'RILOOP Computer Chair, Gaming Chair, Ergonomic Swivel Chair with Footrest version 2.',
    price: 259.99,
    discountPercentage: 0,
    rating: 4.5,
    stock: 10,
    brand: 'RILOOP',
    category: 'chairs',
    thumbnail: riloop2Img,
    images: [riloop2Img],
  },
];

/**
 * Custom hook that returns local chair products with images from assets.
 */
export const useProducts = (): UseProductsResult => {
  return {
    products: LOCAL_PRODUCTS,
    loading: false,
    error: null,
  };
};

export default useProducts;
