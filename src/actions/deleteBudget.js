import { toast } from "react-toastify";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { redirect } from "react-router-dom";

export default function({params}) {
    try {
        deleteItem({
            key: "budgets",
            id: params.id,
         })    

        const associatedExpenses = getAllMatchingItems({
            category: "expenses",
            key: "budgetId",
            value: params.id,
        })

        console.log('Associated expenses:', associatedExpenses)

        for (const expense of associatedExpenses) {
            console.log('in expense', expense);
            deleteItem({
                key: "expenses",
                id: expense.id,
            })
        }

        toast.success("Budget deleted successfuly") 
    } catch (error) {
        throw new Error("An error occured in deleting budget", error)
    }
    return redirect('/');
}