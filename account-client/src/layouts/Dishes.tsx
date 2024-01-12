import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import usePizzaStore from "@/scripts/usePizzaStore";
import { useEffect } from "react";

export default function Dishes(): JSX.Element {
    const {dishes, selectedDish, setDishes, getAllDishes, getDishById,deleteDish} = usePizzaStore();

    useEffect(()=>{
        getAllDishes();
    },[])


  
  return (
    <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-primary rounded-lg font-poppins max-w-[40rem]">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {dishes.map((dish) => (
            <div key={dish.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={dish.imageurl}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={dish.description}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {dish.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">{dish.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
          </div>
        </div>
    </>
  );
}