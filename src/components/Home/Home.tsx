import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../Store/slice/product";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

  // Функция для вычисления данных для графиков доходов и расходов
  const computeChartData = (products) => {
    const income = [];
    const expense = [];
    products.forEach((product) => {
      if (product.type === "income") {
        income.push({ name: product.id.toString(), value: product.amount });
      } else if (product.type === "expense") {
        expense.push({ name: product.id.toString(), value: product.amount });
      }
    });
    setIncomeData(income);
    setExpenseData(expense);
  };

  useEffect(() => {
    computeChartData(products);
  }, [products]);

  return (
    <div id="home">
      <div className="container">
        <div className="home">
          <div className="recharts">
            <PieChart width={730} height={250}>
              <Pie
                data={incomeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={50}
                fill="#8884d8"
              />
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#82ca9d"
                label
              />
            </PieChart>
            <AreaChart width={730} height={250} data={products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="amount" stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
          </div>
          <div className="table">
            <div className="blockMain relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-[1200px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      TYPE
                    </th>
                    <th scope="col" className="px-6 py-3">
                      AMOUNT
                    </th>
                    <th scope="col" className="px-6 py-3">
                      CATEGORY
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DESCRIPTION
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DATA
                    </th>
                    <th scope="col" className="px-6 py-3">
                      DELETE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((el, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {el.type}
                      </th>
                      <td className="px-6 py-4">{el.amount}</td>
                      <td className="px-6 py-4">{el.category}</td>
                      <td className="px-6 py-4">{el.description}</td>
                      <td className="px-6 py-4">{el.data}</td>
                      <td className="px-6 py-4">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          onClick={() => dispatch(deleteProduct(el.id))}
                        >
                          DELETE
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
