import { create } from "zustand";

interface InitialState {
  selectedImages: string[];
}

interface Actions {
  addSelectedImage: (image: string) => void;
  clearImages: () => void;
}

type State = InitialState & Actions;

export const useCameraStore = create<State>()((set, get) => ({
  selectedImages: [],
  addSelectedImage: (image) => {
    set((state) => ({
      selectedImages: [...state.selectedImages, image],
    }));
  },
  clearImages: () => {
    set({
      selectedImages: [],
    });
  },
}));
