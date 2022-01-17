import React, {useState} from "react";
import {ButtonSendOrderContext} from "./OrderForm";

export let IsPressedButton = false

const OrderButton = ({ onClickHandler }) => {
    let [style, setStyle] = useState("OrderButton")
    let [val, setVal] = useState("Оформить заявку на табличку")
    let [className, setClassName] = useState("")
    const buttonSendOrderContext = React.useContext(ButtonSendOrderContext);

    function animationButton(func) {
        return function () {
            if (buttonSendOrderContext.buttonSendOrderContext.clientContact && buttonSendOrderContext.buttonSendOrderContext.clientName) {
                setStyle("OrderButtonAnimation")
                setVal("Спасибо!")
                setClassName("StyledSubmitButton")
                IsPressedButton = true
                return func.apply(this, arguments)
            }
        }
    }

    return (
        <div className={style}>
            <input type={"submit"}
                   onClick={animationButton(onClickHandler)}
                   value={val} className={className}/>
        </div>
    );
};

export default OrderButton;
