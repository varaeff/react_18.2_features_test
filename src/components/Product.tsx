import { useState } from "react";
import { Iproduct } from "../models";

interface ProductProps {
  product: Iproduct;
}

export function Product({ product }: ProductProps) {
  const [details, setDetails] = useState(false);

  const btnBgClassName = details ? "bg-yellow-400" : "bg-blue-400";
  const btnClasses = [btnBgClassName, "py-2 px-4 border"].join(" ");

  return (
    <div className="border py-2 px-4 rounded flex flex-col items-center mb-2">
      <img src={product.image} alt={product.title} className="w-1/6"></img>
      <p>{product.title}</p>
      <p className="font-bold">{product.price}$</p>
      <button
        onClick={() => setDetails((prev) => !prev)}
        className={btnClasses}
      >
        {!details ? "Show" : "Hide"} details
      </button>
      {details && (
        <div>
          <p>{product.description}</p>
          <p>
            Rate:{" "}
            <span style={{ fontWeight: "bold" }}>{product?.rating?.rate}</span>
          </p>
        </div>
      )}
    </div>
  );
}
