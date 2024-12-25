import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { IconButton, ListItemButton, Typography } from "@mui/material";
import Badge from "@mui/material/Badge";
import React from "react";
import { formatNumber } from "../service/Util";
import Styles from "./Item.module.css";

function ItemCard({ onIncrement, onDecrement, description, quantity, price }) {
  return (
    <div
      className={
        quantity <= 0 ? Styles.list : `${Styles.list} ${Styles.listActive}`
      }
    >
      <div onClick={onIncrement} className={Styles.buttonAdd}>
        <div className={Styles.divCart}>
          <Badge badgeContent={quantity} color="primary">
            <IconButton
              sx={{
                padding: "0em 0.1em 0em 0em",
              }}
            >
              <AddShoppingCartIcon />
            </IconButton>
          </Badge>
        </div>
        <div className={Styles.divDescription}>
          {description}
        </div>
        <div className={Styles.divPrice}>
          {formatNumber(price)}
        </div>
        <div className={Styles.divTotal}>
            {formatNumber(price * quantity)}
        </div>
      </div>
      <div>
        <ListItemButton>
          <ProductionQuantityLimitsIcon
            fontSize="medium"
            color="secondary"
            onClick={onDecrement}
            opacity={0.7}
          />
        </ListItemButton>
      </div>
    </div>
  );
}

export default ItemCard;
