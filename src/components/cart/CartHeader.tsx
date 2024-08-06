const items = ["Product", "Price", "Quantity", "Subtotal"];

const CartHeader = () => {
  return (
    <thead>
      <tr>
        {items.map((item) => (
          <th key={item}>{item}</th>
        ))}
      </tr>
    </thead>
  );
};

export default CartHeader;
