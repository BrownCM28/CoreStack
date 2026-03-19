"use client";

// Auth temporarily disabled — stubs to keep build passing
const noop = async () => ({ data: null, error: { message: "Auth coming soon" } });

export const signIn = {
  email: noop,
  social: noop,
};

export const signUp = {
  email: noop,
};

export const signOut = noop;

export const useSession = () => ({ data: null, isPending: false });
