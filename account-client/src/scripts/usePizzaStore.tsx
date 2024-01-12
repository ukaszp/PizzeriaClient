import { create } from "zustand";
import api from "./api";
import Dish from "./dishInterface"

interface DishesStore {
    dishes: Dish[];
    setDishes: (dishes: Dish[]) => void;
    getAllDishes: () => void;
    setSelectedDish: (dish: Dish | null) => void;
    getDishById: (id: number) => Promise<Dish | null>;
    selectedDish: Dish | null;
    deleteDish: (id: number) => Promise<void>;    
  }

const usePizzaStore = create<DishesStore>((set) => ({

    dishes: [],
    setDishes: (dishes) => set({ dishes }),
    getAllDishes: async () => {
      try {
        const response = await api.get('/Pizzeria/dishes');
        const dishes = response.data;
        set({ dishes });
      } catch (error) {
        console.error('no data', error);
      }
    },
    setSelectedDish: (dish) => set({ selectedDish: dish }),
    selectedDish: null,
    getDishById: async (id: number) => {
        try {
            const response = await api.get(`/Pizzeria/dishes/${id}`);
            const dish = response.data;
            return dish;
        } catch (error) {
            console.error('no data', error);
        }
    }
    ,
    deleteDish: async (id: number) => {  return api.delete(`/Pizzeria/dishes/${id}`) },
  }));

  export default usePizzaStore;
