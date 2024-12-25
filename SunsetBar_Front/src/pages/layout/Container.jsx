import Styles from "./Container.module.css";
function Container(props) {
  return (
    <div className={Styles.container}>
      {props.children}
    </div>
  );
}

export default Container;
