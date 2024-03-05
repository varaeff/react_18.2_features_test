import { useContext } from "react";
import { useProducts } from "../hooks/products";
import { Loader } from "../components/Loader";
import { ErrorMessage } from "../components/ErrorMessage";
import { Product } from "../components/Product";
import { Modal } from "../components/Modal";
import { CreateProduct } from "../components/CreateProduct";
import { Iproduct } from "../models";
import { ModalContext } from "../context/ModalContext";
// import { products } from "./data/products";

export function ProductPage() {
  const { loading, products, error, addProduct } = useProducts();
  const { modal, open, close } = useContext(ModalContext);

  function createHandler(product: Iproduct) {
    close();
    addProduct(product);
  }

  return (
    <div className="container mx-auto max-w-2xl pt-5">
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {products.map((product) => (
        <Product product={product} key={product.id} />
      ))}
      {modal && (
        <Modal title="Create new Product" onClose={close}>
          <CreateProduct onCreate={createHandler} />
        </Modal>
      )}
      <button
        className="fixed bottom-5 right-5 rounded-full bg-red-700 text-white text-2xl px-6"
        onClick={open}
      >
        +
      </button>
    </div>
  );
}
