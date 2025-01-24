export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const waait = () =>  new Promise(res => setTimeout(res, Math.random() * 2000))

const generateRandomColor = () => {
    const existingBudgetsLength = fetchData("budgets")?.length ?? 0;
    return `${existingBudgetsLength * 34} 65% 50%`;
}

export const createBudget = (name, amount) => {
    console.log('in create budget function');
    console.log(name, amount)
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        color: generateRandomColor()
    }
    const existingBudgets = fetchData("budgets") ?? []
    return localStorage.setItem("budgets", JSON.stringify([...existingBudgets, newItem]))
}

export const createExpense = (name, amount, budgetId) => {
    const newItem = {
        id: crypto.randomUUID(),
        name: name,
        createdAt: Date.now(),
        amount: +amount,
        budgetId: budgetId,
    }
    const existingExpenses = fetchData("expenses") ?? []
    return localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]))
}

export const formatCurrency = (amnt) => {
    return amnt.toLocaleString(undefined, {
        style: "currency",
        currency: "KES"
    })
}

export const calculateSpentByBudget = (budgetId) => {
    const expenses = fetchData("expenses") ?? [];
    const budgetSpent = expenses.reduce((total, expense) => {
        if (expense.budgetId !== budgetId) return total;
        return total += expense.amount
    }, 0)
    return budgetSpent;
}

export const formatPercentage = (amnt) => {
    return amnt.toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
    })
}

export const formatDate = (epoch) => {
    return new Date(epoch).toLocaleDateString();
}

export const getAllMatchingItems = ({ category, key, value }) => {
    const data = fetchData(category) ?? [];
    return data.filter((item) => item[key] === value);
}

export const deleteItem = ({ key, id}) => {
    console.log('deleting...')
    console.log(key, id)
    const existingData = fetchData(key);
    if (id) {
        const newData = existingData.filter((item) => item.id !== id)
        return localStorage.setItem(key, JSON.stringify(newData))
    }
    return localStorage.removeItem(key);
}