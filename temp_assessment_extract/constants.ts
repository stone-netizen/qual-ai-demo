
import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What's your average ticket size?",
    options: [
      { label: "Under $5,000", points: 0 },
      { label: "$5,000 – $7,000", points: 1 },
      { label: "$8,000+", points: 2 }
    ]
  },
  {
    id: 2,
    text: "What are your gross profit margins?",
    options: [
      { label: "Less than 30%", points: 0 },
      { label: "30% – 40%", points: 1 },
      { label: "40% – 60%+", points: 2 }
    ]
  },
  {
    id: 3,
    text: "What’s your close rate on booked estimates?",
    options: [
      { label: "Less than 20%", points: 0 },
      { label: "20% – 40%", points: 1 },
      { label: "40% – 60%+", points: 2 }
    ]
  },
  {
    id: 4,
    text: "How fast do you respond to new leads?",
    options: [
      { label: "Slow (1–2+ hours)", points: 0 },
      { label: "15 – 60 minutes", points: 1 },
      { label: "< 15 minutes", points: 2 }
    ]
  },
  {
    id: 5,
    text: "What’s your hourly rate for service calls?",
    options: [
      { label: "< $100/hr", points: 0 },
      { label: "$100 – $150/hr", points: 1 },
      { label: "$150 – $250/hr", points: 2 }
    ]
  },
  {
    id: 6,
    text: "Are you willing to invest in ad spend?",
    options: [
      { label: "Unwilling / Not right now", points: 0 },
      { label: "Willing ($500 – $1,000/mo)", points: 1 },
      { label: "Willing ($1,500+/mo)", points: 2 }
    ]
  }
];

export const COLORS = {
  primary: '#0062FF',
  navy: '#003399',
  high: '#22c55e',
  mid: '#eab308',
  low: '#ef4444'
};

export const BOOKING_URL = "https://api.leadconnectorhq.com/widget/booking/86t1nPwKPa3V1sqBmr8t";
