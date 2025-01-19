import { toast } from "react-toastify";
import { deleteItem, getAllaMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export default function({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
         })    

        const associatedExpenses = getAllaMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        associatedExpenses.array.forEach(expense => {
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        });
        toast.success("Budget deleted successfuly") 
    } catch (error) {
        throw new Error("An error occured in deleting budget")
    }
    return redirect('/');
}