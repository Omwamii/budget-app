import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const expensesPageLoader = () => {
    const userName = fetchData("username");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses");

    return { userName, budgets, expenses }
}

export async function expensesAction({ request }){
    const data = await request.formData();
    const {_action, ...values } = Object.fromEntries(data);

    if (_action === 'deleteExpense') {
        try {
            deleteItem({
                key: "expenses",
                id: values.expenseId,
            })
            
            return toast.success(`Expense deleted!`)
        } catch (error) {
            throw new Error("An error occured in deleting your expense")
        }
    }
}

const ExpensesPage = () => {
    const { expenses } = useLoaderData();

    return (
        <div className="grid-lg">
            <h1>All expenses</h1>
            {
                expenses && expenses.length > 0 ? (
                    <div className="grid-md">
                        <h2>Recent expenses <small>({expenses.length} total)</small></h2>
                        <Table expenses={expenses} />
                    </div>
                ) : (
                    <p>No expenses to show</p>
                )
            }
        </div>
    )
}

export default ExpensesPage;