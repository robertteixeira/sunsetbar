import React from "react";
import { formatNumber } from "../service/Util";
import Styles from "./OrderCard.module.css";

function StartCard({ order, onClickStartCard }) {
  return (
    <div key={order.id} className={Styles.orderCard} onClick={onClickStartCard}>
      <h3>{order.client}</h3>
      <p>{formatNumber(order.total)}</p>
    </div>
  );
}

export default StartCard;
