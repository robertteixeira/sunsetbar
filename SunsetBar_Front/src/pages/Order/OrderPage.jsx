import { useLocation } from "react-router-dom";
import OrderForm from "../../components/Order/Order";
function OrderPage() {
  return (
    <>
      <OrderForm orderParam={useLocation().state} />
    </>
  );
}

export default OrderPage;
