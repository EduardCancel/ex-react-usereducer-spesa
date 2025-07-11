import { useState } from "react";
import './App.css';

function App() {
  const products = [
    { name: 'Mela', price: 0.5 },
    { name: 'Pane', price: 1.2 },
    { name: 'Latte', price: 1.0 },
    { name: 'Pasta', price: 0.7 },
  ];

  const [addedProduct, setAddedProduct] = useState([]);

  const addToCart = product => {
    const isProductAlreadyAdded = addedProduct.some(p => p.name === product.name);
    if (isProductAlreadyAdded) {
      return;
    }

    const productToAdd = {
      ...product,
      quantity: 1,
    }

    setAddedProduct(curr => [...curr, productToAdd]);
  }


  return (
    <>
      <h1>Lista della Spesa</h1>
      <ul>
        {products.map((p, i) => (
          <li key={i}>
            {p.name} - €{p.price.toFixed(2)}
            <button onClick={() => addToCart(p)}>
              Aggiungi
            </button>
          </li>
        ))}
      </ul>
      <h2>Carrello</h2>
      {addedProduct.length > 0 ? (
        <ul>
          {addedProduct.map((p, i) => (
            <li key={i}>
              {p.name} - €{p.price.toFixed(2)} x {p.quantity}
            </li>
          ))}
        </ul>
      ) : (
        <p>Il carrello è vuoto</p>
      )}
    </>
  )
}

export default App
