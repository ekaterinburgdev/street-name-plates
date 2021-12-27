import React from 'react';
import {ButtonSendOrderContext} from "./inputs";

const PlatePrices = {
    '1300мм': 4990,
    '1700мм': 7990,
    '2050мм': 11990
}

const Price = ({className, isTotalPrice}) => {
    const {buttonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    const [platePrice, setPlatePrice] = React.useState(4990)

    const getPlatePrice = () => {
        console.log('получаю прайс');
        let price = 4990;

        if (buttonSendOrderContext.plateLength == undefined || buttonSendOrderContext.plateLength == '1300мм') {
            price = 4990;
        } else if (buttonSendOrderContext.plateLength == '1700мм') {
            price = 7990;
        } else if (buttonSendOrderContext.plateLength == '2050мм') {
            price = 11990;
        }

        return (
            <>
                {console.log(platePrice)}
                {price} ₽
            </>
        )
    }

    return(
        <div className={className}>
            {console.log(`Длина ${buttonSendOrderContext.plateLength}`)}
            {console.log('пишу цену')}
            {buttonSendOrderContext.plateLength ? PlatePrices[buttonSendOrderContext.plateLength] : 4990} ₽
        </div>
    )
}

export default Price;