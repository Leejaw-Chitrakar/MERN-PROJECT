import EEG from '../assets/image/EEG.png'
import SFD from '../assets/image/SFD.png'
import CJ from '../assets/image/CJ.png'
import CTC from '../assets/image/CTC.png'
import BMS from '../assets/image/BMS.png'
import FSS from '../assets/image/FSS.png'
import CKS from '../assets/image/CKS.png'
import ST from '../assets/image/ST.png'
import CDJ from '../assets/image/CDJ.png'
import CS from '../assets/image/CS.png'
import TH from '../assets/image/TH.png'
import SFC from '../assets/image/SFC.png'
import LBJ from '../assets/image/LBJ.png'
import PHS from '../assets/image/PHS.png'
import SRM from '../assets/image/SRM.png'
import APS from '../assets/image/APS.png'
import CAC from '../assets/image/CAC.png'
import DRM from '../assets/image/DRM.png'

export const outfits = [
  // Women's Outfits
  {
    id: 'w_outfit1', name: 'Elegant Evening Gown', gender: 'women',
    description: 'A sophisticated floor-length gown with a sleek design, perfect for galas and black-tie events.',
    image: EEG, price: 15000
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
  {
    id: 'w_outfit7', name: 'Sweetheart Ruched Mini Dress', gender: 'women',
    description: 'A charming mini dress featuring long puff sleeves and a sweetheart ruched bodice, ideal for a romantic, vintage-inspired look.',
    image: SRM, price: 6500
  },
  {
    id: 'w_outfit8', name: 'Angel Puff Sleeve Mini Dress', gender: 'women',
    description: 'A detailed description of the style, material, and suitable occasions for the new item.',
    image: APS, price: 5500
  },
  {
    id: 'w_outfit9', name: 'Classic Academia Cardigan Set', gender: 'women',
    description: 'A stylish two-piece set featuring a cable-knit, contrast-trim cardigan and a black turtleneck top, paired with a pleated mini skirt. Perfect for achieving a refined, academic look.',
    image: CAC, price: 9500 
  },
  // Men's Outfits
  {
    id: 'm_outfit1', name: 'Formal Suit Set', gender: 'men',
    description: 'A sophisticated two-piece suit with a tailored jacket and trousers, designed for formal business and celebratory events.',
    image: FSS, price: 25000
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
  },
  {
    id: 'w_dark_tulle_mini', 
    name: 'Gothic Tulle Sleeve Off-Shoulder Mini', 
    gender: 'men',
    description: 'A charming black mini dress featuring a fitted velvet-like bodice, an off-shoulder neckline with a ruffled trim, and dramatic sheer tulle balloon sleeves. Perfect for an edgy or romantic evening out.',
    image: DRM,
    price: 7200 
},
{
    id: 'm_corduroy_shacket', 
    name: 'Tan Corduroy Overshirt', 
    gender: 'men',
    description: 'A relaxed-fit overshirt (shacket) in a rich tan wide-wale corduroy fabric. Features a chest pocket and button front, perfect for a casual, layered vintage look.',
    image: CS, // Variable for the corduroy shirt image
    price: 5400 
},
{
    id: 'm_techwear_hoodie', 
    name: 'Two-Tone Layered Street Hoodie', 
    gender: 'men',
    description: 'A contemporary tech-streetwear hoodie featuring a gray short-sleeve overlay on black long sleeves, a large pouch pocket, drawstring details, and woven utility straps at the hem.',
    image: TH, // Variable for the gray/black hoodie image
    price: 6500 
},
];
