import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(value, currency = "INR", locale = "en-IN") {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

export function formatPercentage(value) {
  return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
}

export function getChangeColor(value) {
  if (value > 0) return "text-profit";
  if (value < 0) return "text-loss";
  return "text-neutral";
}

export function abbreviateNumber(value) {
  if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)}Cr`;
  if (value >= 1e5) return `₹${(value / 1e5).toFixed(2)}L`;
  if (value >= 1e3) return `₹${(value / 1e3).toFixed(2)}K`;
  return `₹${value.toFixed(2)}`;
}
