import { CheckCircleOutlineOutlined } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useOrderService from "../hooks/useOrderService";
import ItemCard from "../Item/Item";
import { formatNumber } from "../service/Util";
import Styles from "./Order.module.css";

function OrderForm({ orderParam }) {
  const navigateTo = useNavigate();
  const { createOrder, updateOrder, getAllItems } = useOrderService();
  const [order, setOrder] = useState({ id: "", client: "", paid: false });
  const [items, setItems] = useState([]);
  const [isError, setValidationError] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const fetchItems = async () => {
    setIsLoading(true);
    try {
      const itemsData = await getAllItems();
      setItems(itemsData);
    } catch (err) {
      setValidationError(true);
      setHelperText("Erro ao carregar os itens dos pedidos!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (orderParam) {
      setOrder(orderParam);
      setItems(orderParam.items);
    } else {
      fetchItems();
    }
  }, [orderParam]);

  const handleClientChange = (event) => {
    const updatedClient = event.target.value;
    setOrder((prevOrder) => ({ ...prevOrder, client: updatedClient }));
  };

  function handleIncrement(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }

  function handleDecrement(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  }

  const validateErrors = () => {
    let isError = false;
    let errorMsg = "";
    if (order.client.trim() === "") {
      isError = true;
      errorMsg = "Informe o cliente!";
    } else if (items.length < 1) {
      isError = true;
      errorMsg = "Pedido não possui itens!";
    }
    setValidationError(isError);
    setHelperText(errorMsg);

    return !isError;
  };

  const calculateTotal = () => {
    return items.reduce(
      (sum, item) => sum + item.quantity * parseFloat(item.price || 0),
      0
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateErrors()) {
      const newOrder = {
        client: order.client,
        paid: order.paid,
        items: items,
        total: calculateTotal(),
      };

      try {
        if (orderParam) {
          // Update Order
          await updateOrder(orderParam.id, newOrder);
        } else {
          //New Order
          await createOrder(newOrder);
        }
        navigateTo("/");
      } catch (error) {
        setValidationError(true);
        setHelperText("Erro ao salvar o pedido!");
      }
    }
  };

  const handlePayment = () => {
    const updatedPaid = !order.paid;
    setOrder((prevOrder) => ({ ...prevOrder, paid: updatedPaid }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={Styles.form}>
        <div className="inputText">
          <TextField
            name="client"
            variant="standard"
            disabled={!!orderParam}
            autoFocus
            size="small"
            label="Nome do Cliente"
            value={order.client}
            onChange={handleClientChange}
            error={isError}
            helperText={helperText}
            sx={{ width: "50%" }}
          />
          <TextField
            name="totalValue"
            variant="standard"
            disabled
            size="small"
            label="Valor total: "
            value={formatNumber(calculateTotal())}
            sx={{
              width: "40%",
              marginLeft: 3,
            }}
          />
        </div>
        {isLoading ? (
          <p>Carregando itens...</p>
        ) : (
          <ul className={Styles.ul}>
            {items.map((item) => (
              <li className={Styles.li} key={item.id}>
                <ItemCard
                  description={item.description}
                  quantity={item.quantity}
                  price={item.price}
                  onIncrement={() => handleIncrement(item.id)}
                  onDecrement={() => handleDecrement(item.id)}
                />
              </li>
            ))}
          </ul>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Confirmar
        </Button>
        <br />
        <Button
          type="button"
          variant="contained"
          color={order.paid ? "success" : "secondary"}
          fullWidth
          onClick={handlePayment}
        >
          {order.paid ? <CheckCircleOutlineOutlined /> : null}
          Efetuar Pagamento
          {order.paid ? <CheckCircleOutlineOutlined /> : null}
        </Button>
      </form>
    </div>
  );
}

export default OrderForm;
