import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBR(n: number, opts?: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat("pt-BR", opts).format(n);
}
