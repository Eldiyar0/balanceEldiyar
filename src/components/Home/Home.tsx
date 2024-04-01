import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, sortProducts } from "../Store/slice/product";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Pie,
  Cell,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import "./Home.css";

const colors = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#AF19FF",
  "#FF00AF",
];

const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const [incomeData, setIncomeData] = useState([]);
  const [expenseData, setExpenseData] = useState([]);

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

  const data = [
    {
      name: "Meal",
      value: 2500,
    },
    {
      name: "rent of Home",
      value: 3000,
    },
    {
      name: "Clothe",
      value: 2000,
    },
    {
      name: "Invest",
      value: 1500,
    },
    {
      name: "for Petrol",
      value: 1200,
    },
    {
      name: "Entertaiment",
      value: 2000,
    },
  ];

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdditionalButtonsVisible, setIsAdditionalButtonsVisible] =
    useState(true);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isAdditionalButtonVisible, setIsAdditionalButtonVisible] =
    useState(true);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterButtonClick = () => {
    setIsFilterOpen(false);
    setIsAdditionalButtonVisible(false);
  };

  const handleAmountButtonClick = () => {
    setIsFilterOpen(true);
    setIsAdditionalButtonVisible(true);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSortButtonClick = () => {
    setIsDropdownOpen(false);
    setIsAdditionalButtonsVisible(false);
  };

  const handleSort = (type) => {
    dispatch(sortProducts({ type }));
  };

  return (
    <div id="home">
      <div className="container">
        <div className="home">
          <div className="recharts">
            <PieChart width={730} height={250}>
              <Pie data={data} cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
            </PieChart>
            <AreaChart width={730} height={250} data={products}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="id" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="amount"
                stroke="#8884d8"
                fill="#8884d8"
              />
            </AreaChart>
          </div>
          <div className="dropDownBtns">
            <div className="Filter">
              <button
                id="multiLevelDropdownButton"
                onClick={toggleFilter}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Filter{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                id="multi-dropdown"
                className={`z-10 ${
                  isFilterOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="multiLevelDropdownButton"
                >
                  <li>
                    <a
                      href="#"
                      onClick={handleFilterButtonClick}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Type
                    </a>
                  </li>
                  <li>
                    <button
                      id="doubleDropdownButton"
                      onClick={handleAmountButtonClick}
                      data-dropdown-toggle="doubleDropdown"
                      data-dropdown-placement="right-start"
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Amount
                      <svg
                        className="w-2.5 h-2.5 ms-3 rtl:rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 9 4-4-4-4"
                        />
                      </svg>
                    </button>
                    <div
                      id="doubleDropdown"
                      className={`z-10 ${
                        isAdditionalButtonVisible ? "block" : "hidden"
                      } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                    >
                      <ul
                        className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="doubleDropdownButton"
                      >
                        <li>
                          <a
                            href="#"
                            onClick={() => {
                              handleSort("min");
                              handleFilterButtonClick();
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Min
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            onClick={() => {
                              handleSort("max");
                              handleFilterButtonClick();
                            }}
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Max
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <a
                      href="#"
                      onClick={() => {
                        handleSort("category");
                        handleFilterButtonClick();
                      }}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Category
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="Sort">
              <button
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
              >
                Sort{" "}
                <svg
                  className="w-2.5 h-2.5 ms-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>

              <div
                id="dropdown"
                className={`z-10 ${
                  isDropdownOpen ? "block" : "hidden"
                } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
              >
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownDefaultButton"
                >
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        handleSort("new");
                        handleSortButtonClick();
                        setIsAdditionalButtonsVisible(true);
                      }}
                    >
                      New
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        handleSortButtonClick();
                        setIsAdditionalButtonsVisible(true);
                      }}
                    >
                      Higher
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => {
                        handleSort("lower");
                        handleSortButtonClick();
                        setIsAdditionalButtonsVisible(true); 
                      }}
                    >
                      Lower
                    </a>
                  </li>
                  <li></li>
                </ul>
              </div>

              {isAdditionalButtonsVisible && (
                <div className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                </div>
              )}
            </div>
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
