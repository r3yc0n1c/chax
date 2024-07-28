import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

// Check if the code is running in a browser environment
export const isBrowser = typeof window !== "undefined";

// Utility functions for working with local storage
export class LocalStorage {
    // Get a value from local storage by key
    static get(key: string) {
        if (!isBrowser) return;
        const value = localStorage.getItem(key);
        if (value) {
            try {
                return JSON.parse(value);
            } catch (err) {
                return null;
            }
        }
        return null;
    }

    // Set a value in local storage by key
    static set(key: string, value: any) {
        if (!isBrowser) return;
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Remove a value from local storage by key
    static remove(key: string) {
        if (!isBrowser) return;
        localStorage.removeItem(key);
    }

    // Clear all items from local storage
    static clear() {
        if (!isBrowser) return;
        localStorage.clear();
    }
}
