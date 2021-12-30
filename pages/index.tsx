import Autocomplete from "../src/components/Autocomplete";
import Inputs, {defaultMessageData, ButtonSendOrderContext} from '../src/components/inputs';
import Window from "../src/components/Window";
import ChangeColor from "../src/components/ChangeColor";
import Price from "../src/components/Price";
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
                <div style={{margin: '0px', padding: '0px'}}>
                    <div style={{backgroundImage: `url("${colorContext.frontImage}")`}} className={Style.front}>
                        <div className={Style.front_wrapper}>
                            <h1 className={Style.h1_wrapper}>Заказ адресной<br/>таблички</h1>
                            <p className={Style.p_wrapper}>Введите название улицы и номер дома</p>
                            <Autocomplete/>
                        </div>
                    </div>
                    <div className={Style.inputs}>
                        <div className={Style.change_color_container}>
                            <p className={Style.inputs_p_wrapper}>Фасад</p>
                            <ChangeColor/>
                        </div>
                        <Inputs/>
                    </div>
                </div>
                {/*<div style={{backgroundImage: `url("${colorContext.frontImage}")`}}>*/}
                {/*    <div className={Style.container_start}>*/}
                {/*        <div>*/}
                {/*            <h1>Заказ адресной таблички</h1>*/}
                {/*            <p>Введите название улицы и номер дома</p>*/}
                {/*        </div>*/}
                {/*        <ChangeColor className={Style.change_color}/>*/}
                {/*    </div>*/}
                {/*    <div className={Style.container_start}>*/}
                {/*        <div>*/}
                {/*            <Autocomplete/>*/}
                {/*            <Inputs/>*/}
                {/*        </div>*/}
                {/*        <Window/>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </ChangeColorContext.Provider>
        </ButtonSendOrderContext.Provider>
    )
}

export default Home;