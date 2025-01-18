import "./product.css";

import React, { useEffect, useState } from "react";

const AddProduct = ({ onAddProduct }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const handleAddProduct = () => {
    if (productName && productPrice) {
      const newProduct = {
        name: productName,
        price: productPrice,
      };
      onAddProduct(newProduct);
      productName("");
      productPrice("");
    }
  };

  return (
    <form onSubmit={handleAddProduct}>
      <div>
        <label htmlFor="productName">Enter the product name</label>
        <input
          type="text"
          id="productName"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product name"
        />
      </div>
      <div>
        <label htmlFor="productPrice">Enter the product price</label>
        <input
          type="text"
          id="productPrice"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Product price"
        />
      </div>
      <button>Add Product</button>
    </form>
  );
};

const ShowProduct = ({ product }) => {
  return (
    <div className="show-product">
      {product.length > 0 ? (
        <table>
          <tr>
            <th>Sr No.</th>
            <th>Product Name</th>
            <th>Product Price (in Rs)</th>
          </tr>
          {product.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </table>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

const SearchProduct = ({ product }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProduct, setFilteredProduct] = useState(product);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProduct(product);
    } else {
      const searchedProduct = product.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProduct(searchedProduct);
    }
  }, [searchQuery, product]);

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search for product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredProduct.length > 0 ? (
        <table>
          <tr>
            <th>Sr No.</th>
            <th>Product Name</th>
            <th>Product Price (in Rs)</th>
          </tr>
          {filteredProduct.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
            </tr>
          ))}
        </table>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

function Products({ handleLogout }) {
  const [product, setProduct] = useState([]);
  const [selectedTab, setSelectedTab] = useState("show");

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("product")) || [];
    setProduct(storedProducts);
  }, []);

  const handleAddProduct = (newProduct) => {
    const isDuplicate = product.some(
      (item) => item.name.toLowerCase() === newProduct.name.toLowerCase()
    );

    if (isDuplicate) {
      alert("Same Product already exists.");
      return;
    }

    const updatedProduct = [...product, newProduct];
    setProduct(updatedProduct);
    localStorage.setItem("product", JSON.stringify(updatedProduct));
  };

  return (
    <div className="product">
      <div className="product-head">
        <h3>Prod.io</h3>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <div className="product-button">
        <button
          onClick={() => setSelectedTab("add")}
          className={selectedTab === "add" ? "active" : ""}
        >
          Add Products
        </button>
        <button
          onClick={() => setSelectedTab("search")}
          className={selectedTab === "search" ? "active" : ""}
        >
          Search Products
        </button>
        <button
          onClick={() => setSelectedTab("show")}
          className={selectedTab === "show" ? "active" : ""}
        >
          Show Products
        </button>
      </div>
      <div className="product-container">
        {selectedTab === "add" && (
          <AddProduct onAddProduct={handleAddProduct} />
        )}
        {selectedTab === "search" && <SearchProduct product={product} />}
        {selectedTab === "show" && <ShowProduct product={product} />}
      </div>
    </div>
  );
}

export default Products;
