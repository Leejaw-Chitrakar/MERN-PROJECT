import EEG from '../assets/image/EEG.png'
import SFD from '../assets/image/SFD.png'
import CJ from '../assets/image/CJ.png'
import CTC from '../assets/image/CTC.png'
import BMS from '../assets/image/BMS.png'
import CKS from '../assets/image/CKS.png'
import ST from '../assets/image/ST.png'
import CDJ from '../assets/image/CDJ.png'
import SFC from '../assets/image/SFC.png'
import LBJ from '../assets/image/LBJ.png'
import PHS from '../assets/image/PHS.png'

export const outfits = [
  // Women's Outfits
  {
    id: 'w_outfit1', name: 'Elegant Evening Gown', gender: 'women',
    description: 'A sophisticated floor-length gown with a sleek design, perfect for galas and black-tie events.',
    image: EEG, price: 15000, 
  },
  {
    id: 'w_outfit2', name: 'Summer Floral Dress', gender: 'women',
    description: 'A light and breezy dress adorned with a vibrant floral print, ideal for garden parties and warm-weather outings.',
    image: SFD, price: 9800
  },
  {
    id: 'w_outfit3', name: 'Chic Jumpsuit', gender: 'women',
    description: 'A modern, one-piece outfit with a structured silhouette, offering a polished look for any casual or dressy occasion.',
    image: CJ, price: 12500
  },
  {
    id: 'w_outfit4', name: 'Classic Trench Coat', gender: 'women',
    description: 'An essential piece of outerwear, this timeless trench coat features a double-breasted front and belted waist.',
    image: CTC, price: 18000
  },
  {
    id: 'w_outfit5', name: 'Bohemian Maxi Skirt', gender: 'women',
    description: 'A long, flowing skirt with an intricate pattern and relaxed fit, perfect for a carefree, festival-ready style.',
    image: BMS, price: 7500
  },
  {
    id: 'w_outfit6', name: 'Cozy Knit Sweater', gender: 'women',
    description: 'A soft and warm oversized sweater, featuring a chunky knit texture that’s perfect for layering on a chilly day.',
    image: CKS, price: 6200
  },
  // Men's Outfits
  {
    id: 'm_outfit1', name: 'Formal Suit Set', gender: 'men',
    description: 'A sophisticated two-piece suit with a tailored jacket and trousers, designed for formal business and celebratory events.',
    image: ST, price: 25000
  },
  {
    id: 'm_outfit2', name: 'Casual Denim Jacket', gender: 'men',
    description: 'A durable and versatile denim jacket, ideal for a relaxed, everyday look that never goes out of style.',
    image: CDJ, price: 11000
  },
  {
    id: 'm_outfit3', name: 'Sporty Tracksuit', gender: 'men',
    description: 'A lightweight and breathable tracksuit, perfect for exercise, lounging, or a comfortable, athletic-inspired outfit.',
    image: ST, price: 8500
  },
  {
    id: 'm_outfit4', name: 'Slim-Fit Chinos', gender: 'men',
    description: 'A modern, tapered pair of chino pants that provide a sleek fit and can be effortlessly styled for any occasion.',
    image: SFC, price: 9500
  },
  {
    id: 'm_outfit5', name: 'Leather Biker Jacket', gender: 'men',
    description: 'A classic leather jacket with an asymmetrical zipper and bold collar, designed for a rebellious and cool aesthetic.',
    image: LBJ, price: 32000
  },
  {
    id: 'm_outfit6', name: 'Printed Hawaiian Shirt', gender: 'men',
    description: 'A loose, button-down shirt with a bold tropical pattern, perfect for a vacation or a fun, relaxed weekend look.',
    image: PHS, price: 5800
  }
];
