import celoraImg from '../assets/products/celora.jpeg';
import vioreaImg from '../assets/products/viorea.jpeg';
import iryneImg from '../assets/products/iryne.jpeg';
import orchindraImg from '../assets/products/orchindra.jpeg';
import lioraImg from '../assets/products/liora.jpeg';
import iriscentImg from '../assets/products/iriscent.jpeg';

export interface Scent {
  index: string;
  name: string;
  notes: string;
  line: string;
  image: string;
  accent: string;
  notesPyramid: {
    top: string[];
    middle: string[];
    base: string[];
  };
}

export const scents: Scent[] = [
  {
    index: '01',
    name: 'CELORA',
    notes: 'Tobacco · Saffron · Oud',
    line: 'Warm and grounding. A fragrance for those who leave a room changed.',
    image: celoraImg,
    accent: 'from-amber-950/70 via-amber-900/40 to-transparent',
    notesPyramid: {
      top: ['Tobacco', 'Amber'],
      middle: ['Saffron'],
      base: ['Oud', 'Musk'],
    },
  },
  {
    index: '02',
    name: 'VIOREA',
    notes: 'Rose · Powdery Floral · White Floral',
    line: 'Soft authority. Floral clarity that lingers without asking.',
    image: vioreaImg,
    accent: 'from-violet-950/70 via-violet-800/30 to-transparent',
    notesPyramid: {
      top: ['Rose', 'Musk'],
      middle: ['Powdery', 'Floral'],
      base: ['White Floral'],
    },
  },
  {
    index: '03',
    name: 'IRYNE',
    notes: 'Labdanum · Agarwood · Sandalwood',
    line: 'Ancient resins, modern restraint. Worn close to the skin.',
    image: iryneImg,
    accent: 'from-rose-950/70 via-rose-900/30 to-transparent',
    notesPyramid: {
      top: ['Labdanum'],
      middle: ['Agarwood (Oud)', 'Olibanum', 'Cedar'],
      base: ['Sandalwood', 'Cedar'],
    },
  },
  {
    index: '04',
    name: 'ORCHINDRA',
    notes: 'Lemon · Rose & Sugar · Vanilla',
    line: 'Sun-lit sweetness, never saccharine. A scent that smiles.',
    image: orchindraImg,
    accent: 'from-yellow-950/60 via-orange-900/25 to-transparent',
    notesPyramid: {
      top: ['Lemon'],
      middle: ['Rose', 'Sugar'],
      base: ['Vanilla', 'White Musk', 'Cedar'],
    },
  },
  {
    index: '05',
    name: 'LIORA',
    notes: 'Bergamot · Lavender · Ambroxan',
    line: 'Edged with pepper, settled in amber. Confidence in a bottle.',
    image: lioraImg,
    accent: 'from-indigo-950/70 via-purple-900/30 to-transparent',
    notesPyramid: {
      top: ['Calabrian Bergamot', 'Pepper'],
      middle: ['Sichuan Pepper', 'Lavender', 'Pink Pepper', 'Patchouli', 'Geranium'],
      base: ['Labdanum', 'Cedar', 'Ambroxan'],
    },
  },
  {
    index: '06',
    name: 'IRISCENT',
    notes: 'Pineapple · Iris & Jasmine · Vetiver',
    line: 'Timeless. Refined. Irresistible. The signature others notice first.',
    image: iriscentImg,
    accent: 'from-neutral-900/60 via-stone-800/25 to-transparent',
    notesPyramid: {
      top: ['Pineapple', 'Hyacinth'],
      middle: ['Iris', 'Pink Pepper', 'Jasmine'],
      base: ['Musk', 'Vetiver', 'Amber', 'Vanilla', 'Patchouli'],
    },
  },
];
