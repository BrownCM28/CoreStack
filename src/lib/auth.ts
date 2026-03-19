// Auth temporarily disabled — stub to keep build passing
export const auth = {
  api: {
    getSession: async (_opts: unknown) => null,
  },
};

export type Session = { user: { id: string; email: string; role: string } };
