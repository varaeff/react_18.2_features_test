import React, { useState } from "react";
import { Iproduct } from "../models";
import axios from "axios";
import { ErrorMessage } from "./ErrorMessage";

const productData: Iproduct = {
  title: "",
  price: 13.5,
  description: "lorem ipsum set",
  image: "https://i.pravatar.cc",
  category: "electronic",
  rating: {
    rate: 42,
    count: 10,
  },
};

interface CreateProductProps {
  onCreate: (product: Iproduct) => void;
}

export function CreateProduct({ onCreate }: CreateProductProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  async function submitHandler(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    if (value.trim().length === 0) {
      setError("Enter valid title");
      return;
    }
    productData.title = value;

    const response = await axios.post<Iproduct>(
      "https://fakestoreapi.com/products",
      productData
    );

    onCreate(response.data);
  }

  function changeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        className="border py-2 px-4 mb-2 w-full outline-0"
        placeholder="Enter product title..."
        value={value}
        onChange={changeHandler}
      />
      {error && <ErrorMessage error={error} />}
      <button
        type="submit"
        className="border py-2 px-4 bg-yellow-400 hover:text-white active:text-black"
      >
        Create
      </button>
    </form>
  );
}
