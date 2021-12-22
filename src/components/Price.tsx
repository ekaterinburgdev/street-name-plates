import React from 'react';
import {ButtonSendOrderContext} from "./inputs";

const Price = ({className, isTotalPrice}) => {
    const {buttonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    const [platePrice, setPlatePrice] = React.useState(4990)

    const getPlatePrice = () => {
        if (buttonSendOrderContext.plateLength == '1300мм') {
            setPlatePrice(4990);
        } else if (buttonSendOrderContext.plateLength == '1700мм') {
            setPlatePrice(7990);
        } else if (buttonSendOrderContext.plateLength == '2050мм') {
            setPlatePrice(11990);
        }

        return (
            <>
                {platePrice} ₽
            </>
        )
    }

    return(
        <div className={className}>{getPlatePrice}</div>
    )
}

export default Price;