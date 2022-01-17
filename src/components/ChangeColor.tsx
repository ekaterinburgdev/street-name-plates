import React from 'react';
import Style from '../styles/ChangeColor.module.css';
import {ButtonSendOrderContext} from "./OrderForm";

type ColorChangeType = {
    color: string,
    fontColor: string,
    frontImage: string,
    checked: boolean
}

export const COLORS: ColorChangeType[] = [
    {color: '#4E4D4B', frontImage: 'gray.webp', fontColor: '#26255D', checked: true},
    {color: '#BFAA40', frontImage: 'yellow.webp', fontColor: '#8F7D24', checked: false},
    {color: '#658655', frontImage: 'green.webp', fontColor: '#536B47', checked: false},
    {color: '#953737', frontImage: 'red.webp', fontColor: '#993333', checked: false},
    {color: '#266D90', frontImage: 'blue.webp', fontColor: '#26255D', checked: false}
]

export const DEFAULTCOLOR = COLORS[0]

export const ChangeColorContext = React.createContext({
    colorContext: COLORS[0],
    setColorContext: (color: ColorChangeType) => {
    }
});

const ChangeColor = (props) => {

    const {setColorContext} = React.useContext(ChangeColorContext);
    const {buttonSendOrderContext, setButtonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    return (
        <div className={props.className}>
            <div className={Style.change_color_container}>
                {
                    COLORS.map(color => (
                        <label className={Style.color_container} key={color.color}>
                            <input
                                type={"radio"}
                                name={'color'}
                                defaultChecked={color.checked}
                                onClick={() => {
                                    setColorContext(color);
                                    setButtonSendOrderContext({...buttonSendOrderContext, color: color.fontColor})
                                }}
                            />
                            <span className={Style.checkmark} style={{backgroundColor: color.color}}/>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default ChangeColor;
