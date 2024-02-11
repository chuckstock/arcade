import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type NextServerPageProps = {
  params: {
    slug: string
  }
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}
