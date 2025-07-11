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
      updateProductQuantity(product.name);
      return;
    }

    const productToAdd = {
      ...product,
      quantity: 1,
    }

    setAddedProduct(curr => [...curr, productToAdd]);
  }

  const updateProductQuantity = (productName) => {
    setAddedProduct(curr =>
      curr.map(product =>
        product.name === productName
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  }

  const removeFromCart = (productName) => {
    setAddedProduct(curr => curr.filter(product => product.name !== productName));
  }

  const calculateTotal = () => {
    return addedProduct.reduce((total, product) => {
      return total + (product.price * product.quantity);
    }, 0);
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
        <>
          <ul>
            {addedProduct.map((p, i) => (
              <li key={i}>
                {p.name} - €{p.price.toFixed(2)} x {p.quantity}
                <button onClick={() => removeFromCart(p.name)}>
                  Rimuovi dal carrello
                </button>
              </li>
            ))}
          </ul>
          <h3>Totale: €{calculateTotal().toFixed(2)}</h3>
        </>
      ) : (
        <p>Il carrello è vuoto</p>
      )}
    </>
  )
}

export default App
