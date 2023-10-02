import { create } from "zustand";

const useStore = create((set) => ({
  relatedPosts: [],
  categories: [],
  featuredPosts: [],
  dataLoaded: false,
}));

export default useStore;
