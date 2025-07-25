// src/helpers/receipts.helper.ts
import { IReceipt } from "@/interface/types";

export const sampleReceipts: IReceipt[] = [
  {
    id: '1',
    date: '2023-05-15',
    amount: 150.50,
    imageUrl: '/receipts/receipt1.jpg',
    description: 'Pago de matrícula'
  },
  {
    id: '2',
    date: '2023-06-20',
    amount: 200.00,
    imageUrl: '/receipts/receipt2.jpg',
    description: 'Pago de mensualidad'
  },
  {
    id: '3',
    date: '2023-07-10',
    amount: 180.75,
    imageUrl: '/receipts/receipt3.jpg',
    description: 'Materiales educativos'
  },
  {
    id: '4',
    date: '2023-08-05',
    amount: 220.00,
    imageUrl: '/receipts/receipt4.jpg',
    description: 'Actividades extracurriculares'
  },
  {
    id: '5',
    date: '2023-09-12',
    amount: 95.30,
    imageUrl: '/receipts/receipt5.jpg',
    description: 'Uniforme escolar'
  },
  {
    id: '6',
    date: '2023-10-18',
    amount: 175.25,
    imageUrl: '/receipts/receipt6.jpg',
    description: 'Excursión educativa'
  }
];