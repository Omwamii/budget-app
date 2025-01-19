import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import Dashboard, { dashboardAction, dashboardLoader } from "./pages/Dashboard";
import Error from "./pages/Error";
import Main, { mainLoader } from "./layouts/Main";
import { logoutAction } from "./actions/logout";
import ExpensesPage, { epxensesAction, expensesPageLoader } from "./pages/ExpensesPage";
import BudgetPage, { budgetLoader, budgetPageAction } from "./pages/BudgetPage";
import deleteBudget from "./actions/deleteBudget";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        action: dashboardAction,
        loader: dashboardLoader,
        errorElement: <Error />
      },
      {
        index: "expenses",
        element: <ExpensesPage />,
        loader: expensesPageLoader,
        action: epxensesAction,
        errorElement: <Error />,
      },
      {
        index: "budget/:id",
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetPageAction,
        errorElement: <Error />,
        children: [
          {
            path: "delete",
            action: deleteBudget,
          }
        ]
      },
      {
        path: "logout",
        action: logoutAction,
      }
    ],
  },
])
function App() {
 
  return (
    <div className="App">
      <RouterProvider router={router}/>
      <ToastContainer />
    </div>
  )
}

export default App
