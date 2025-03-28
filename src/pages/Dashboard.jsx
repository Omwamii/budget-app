import { Link, useLoaderData } from "react-router-dom";
import { createBudget, createExpense, deleteItem, fetchData, waait } from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
    // run when the '/dashboard' route is loaded
    const userName = fetchData("userName");
    const budgets = fetchData("budgets");
    const expenses = fetchData("expenses")

    return { userName, budgets, expenses }
}

export async function dashboardAction({request}) {
    await waait()

    const data = await request.formData();
    const {_action, ...values}= Object.fromEntries(data);

    if (_action === "newUser") {
        try {
            localStorage.setItem("userName", JSON.stringify(values.userName))
            return toast.success("Welcome", values.userName)

        } catch (error) {
            throw new Error("There was a problem creating your account");
        }
    }

    if (_action === 'addBudget') {
        console.log(values)
        try {
            createBudget(values.newBudget, values.newBudgetAmount)
            return toast.success(`Budget created!`);
        } catch (error) {
            throw new Error("There was a problem creating your budget")
        }
    }

    if (_action === 'createExpense') {
        try {
            createExpense(values.newExpense, values.newExpenseAmount, values.newExpenseBudget)
            return toast.success(`Expense ${values.newExpense} created!`)
        } catch (error) {
            throw new Error("An error occured in creating your expense")
        }
    }

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

const Dashboard = () => {
    const { userName, budgets, expenses } = useLoaderData()
    return (
        <div>
            {
                userName ? (
                    <div className="dashboard">
                        <h1>Welcome back, <span className="accent">{userName}</span></h1>
                        <div className="grid-sm">
                        {budgets && budgets.length > 0 ? (
                            <div className="grid-lg">
                            <div className="flex-lg">
                                <AddBudgetForm />
                                <AddExpenseForm budgets={budgets} />
                            </div>
                            <h2>Existing Budgets</h2>
                            <div className="budgets">
                                {budgets && 
                                    budgets.map((budget) => (
                                    <BudgetItem  key={budget} budget={budget} />
                                    ))
                                }
                            </div>
                            {
                                expenses && expenses.length > 0 && (
                                    <div className="grid-md">
                                        <h2>Recent Expenses</h2>
                                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt).slice(0, 8)}/>
                                        {expenses.length > 8 && (
                                            <Link to="expenses" className="btn btn--dark">
                                                View all expenses
                                            </Link>
                                        )}
                                    </div>
                                )
                                
                            }
                        </div>
                        ) : (
                            <div className="grid-sm">
                                <p>Personal budgeting is the secret to financial freedom.</p>
                                <p>Create a budget to get started</p>
                                <AddBudgetForm />
                            </div> 
                        )}
                        </div>
                        
                    </div>
                ) : (
                    <Intro />
                )
            }
        </div>
    )
}

export default Dashboard;