import useUserStore from "@/scripts/usersStore";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { useEffect, useState } from "react";
import Dish from "@/scripts/dishInterface";
import usePizzaStore from "@/scripts/usePizzaStore";
import { CheckCheckIcon, CheckCircle, CheckCircleIcon, Plus, PlusCircle, PlusCircleIcon } from "lucide-react";
import { Order } from "./orderInterface";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";

const NewOrder = () => {
    const { selectedDish, dishes, getAllDishes, setSelectedDish } = usePizzaStore();
    const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);
    const [addedDishes, setAddedDishes] = useState<number[]>([]);

    useEffect(() => {
        getAllDishes();
    }, []);

    const isDishAdded = (dishId: number) => addedDishes.includes(dishId);

    const handleUserClick = (dish: Dish) => {
        setSelectedDish(dish);
    };

    const handleAddToOrder = (dish: Dish) => {
        if (isDishAdded(dish.id)) {
            setSelectedDishes((prevDishes) => prevDishes.filter((selectedDish) => selectedDish.id !== dish.id));
            setAddedDishes((prevAddedDishes) => prevAddedDishes.filter((addedDishId) => addedDishId !== dish.id));
        } else {
            setSelectedDishes((prevDishes) => [...prevDishes, dish]);
            setAddedDishes((prevAddedDishes) => [...prevAddedDishes, dish.id]);
        }

        console.log('addedDishes:', addedDishes);
    };

    return (
        <div className="flex w-[70rem] bg-opacity-90 bg-primary rounded-xl p-7  text-secondary justify-center max-h-[48rem] min-h-[40rem]">
            <div>
                <p className="p-1 uppercase border-b-2 border-transparent hover:border-b-2 hover:border-secondary transition duration-500 text-xl flex justify-center pb-5">
                    Select Dishes
                </p>
                <ScrollArea.Root className="w-[65rem] border-secondary border-2 rounded-lg">
                    <ScrollArea.Viewport className="w-full max-h-[35rem] rounded">
                        <div className="p-4 flex flex-wrap">
                            {dishes.map((dish) => (
                                <div
                                    key={dish.id}
                                    className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-4"
                                >
                                    <div className="max-w-sm bg-white bg-opacity-70 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                                        <div>
                                            <img className="rounded-t-lg" src={dish.imageurl} alt="" />
                                        </div>
                                        <div className="p-5">
                                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{dish.name}</h5>
                                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{dish.description}</p>
                                            <button
                                            onClick={() => handleAddToOrder(dish)}
                                            className="gap-3 inline-flex items-center px-3 py-2 text-lg font-medium text-center text-white bg-primary rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                {isDishAdded(dish.id) ? 'Dodano': 'Dodaj'}
                                                {isDishAdded(dish.id) ? (<CheckCircle/>): (<PlusCircle/>)}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar
                        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
                        orientation="horizontal"
                    >
                        <ScrollArea.Thumb className="flex-1 bg-gray-500 bg-opacity-30 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
                    </ScrollArea.Scrollbar>
                    <ScrollArea.Corner className="bg-blackA5" />
                </ScrollArea.Root>
            </div>
            
        </div>
    );
};

export default NewOrder;
