import React, {useContext, useState} from "react";
import {ButtonSendOrderContext} from "./OrderForm";

export let IsButtonPressed = false

const OrderButton = ({ onClickHandler }) => {
    let [style, setStyle] = useState("OrderButton")
    let [val, setVal] = useState("Оформить заявку на табличку")
    let [className, setClassName] = useState("")
    const buttonSendOrderContext = React.useContext(ButtonSendOrderContext);

    function animationButton(func) {
        return function () {
            if (buttonSendOrderContext.buttonSendOrderContext.clientContact && buttonSendOrderContext.buttonSendOrderContext.clientName) {
                IsButtonPressed = true
                setStyle("OrderButtonAnimation")
                setVal("Спасибо!")
                setClassName("StyledSubmitButton")
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