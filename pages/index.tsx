import Autocomplete from "../src/components/Autocomplete";
import Inputs, {defaultMessageData, ButtonSendOrderContext} from '../src/components/inputs';
import Window from "../src/components/Window";
import ChangeColor from "../src/components/ChangeColor";
import {COLORS, ChangeColorContext} from "../src/components/ChangeColor";
import React from "react";
import Style from '../styles/Home.module.css';


const Home = () => {
    const [colorContext, setColorContext] = React.useState(COLORS[0]);  //насколько костыль так делать???
    const valueColorContext = {colorContext, setColorContext};

    const [buttonSendOrderContext, setButtonSendOrderContext] = React.useState(defaultMessageData);
    const valueButtonSendOrderContext = {buttonSendOrderContext, setButtonSendOrderContext};

    return (
        <ButtonSendOrderContext.Provider value={valueButtonSendOrderContext}>
            <ChangeColorContext.Provider value={valueColorContext}>
                <div style={{backgroundColor: colorContext.frontColor}}>
                    <div className={Style.container_start}>
                        <div>
                            <h1>Заказ адресной таблички</h1>
                            <p>Введите название улицы и номер дома</p>
                        </div>
                        <ChangeColor className={Style.change_color}/>
                    </div>
                    <div className={Style.container_start}>
                        <div>
                            <Autocomplete/>
                            <Inputs/>
                        </div>
                        <Window/>
                    </div>
                </div>
            </ChangeColorContext.Provider>
        </ButtonSendOrderContext.Provider>
    )
}

export default Home;