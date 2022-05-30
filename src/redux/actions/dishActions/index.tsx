import { apiMenuPlanner } from "../../../api";
import DishModel from "../../../models/DishModel";
import { SET_DISH } from "../../actionTypes";

export const setDish = (payload: DishModel) => {
    return {
        type: SET_DISH,
        payload,
    };
};

export const fetchDish = (id: string) => {
    return async (dispach : any) => {
        const response = await apiMenuPlanner.getDish(id);

        dispach(setDish(response.data));
    };
};