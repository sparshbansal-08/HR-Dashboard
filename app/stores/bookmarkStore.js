import { create } from 'zustand';

   export const useBookmarkStore = create((set) => ({
  bookmarks: [],
  
  addBookmark: (user) => {
    set((state) => ({
      bookmarks: [...state.bookmarks, user],
    }));
  },
  removeBookmark: (id) => {
    set((state) => ({
      bookmarks: state.bookmarks.filter((b) => b.id !== id),
    }));
  },

  isBookmarked: (id) => (state) => {
    const result = state.bookmarks.some((b) => b.id === id);
    console.log('isBookmarked check for id', id, 'Result:', result);
    return result;
  },
}));