import React from 'react';
import Style from '../../styles/ChangeColor.module.css';
import {type} from "os";

type ColorChangeType = {
    color: string,
    fontColor: string,
    frontColor: string,
    checked: boolean
}

export const COLORS: ColorChangeType[] = [
    {color: '#CCCCCC', frontColor: '#EBEAE8', fontColor: '#26255D', checked: true},
    {color: '#DED7BA', frontColor: '#BFAA40', fontColor: '#8F7D24', checked: false},
    {color: '#C9D4C4', frontColor: '#79936C', fontColor: '#536B47', checked: false},
    {color: '#D6C2C2', frontColor: '#A65959', fontColor: '#993333', checked: false},
    {color: '#9CBAC9', frontColor: '#598CA6', fontColor: '#26255D', checked: false}
]

export const ChangeColorContext = React.createContext({
    colorContext: COLORS[0],
    setColorContext: (color: ColorChangeType) => {
    }
});

const ChangeColor = (props) => {

    const {setColorContext} = React.useContext(ChangeColorContext);

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
                                    setColorContext(color)
                                }}
                            />
                            <span className={Style.checkmark} style={{backgroundColor: color.color}}></span>
                        </label>
                    ))
                }
            </div>
        </div>
    );
}

export default ChangeColor;