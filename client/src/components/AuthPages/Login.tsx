import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios"

type LoginData = {
  fullName: string;
  userName: string;
  password: string;
};

const Login = () => {
  const [data, setData] = useState<LoginData>({
    fullName: "",
    userName: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit =async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted: ", data);
    const res = await axios.post("http://localhost:8174/api/v1/user/login", data)
    console.log(res)
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login</h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label htmlFor="fullName" className="text-gray-700 dark:text-gray-200">Full Name</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={data.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              className="mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="userName" className="text-gray-700 dark:text-gray-200">Username</label>
            <input
              type="text"
              id="userName"
              name="userName"
              value={data.userName}
              onChange={handleChange}
              placeholder="Enter your username"
              className="mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-gray-700 dark:text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="mt-1 px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
