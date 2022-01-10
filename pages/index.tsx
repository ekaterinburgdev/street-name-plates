import StreetPlate from "../src/components/StreetPlate";
import OrderForm, {defaultMessageData, ButtonSendOrderContext} from '../src/components/OrderForm';
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
        <>
            <div className={Style.header}>
            </div>
            <div className={Style.description_wrapper}>
                <h1 className={Style.description_heading}>Адресные таблички</h1>
                <p className={Style.description_text}>
                    В Екатеринбурге несколько тысяч зданий, на каждом
                    из них висит как минимум одна адресная табличка.
                    Мы смотрим на них каждый день и с их помощью
                    ориентируемся в улицах и номерах домов. Это одна
                    из самых часто встречающихся деталей городской
                    навигации. Таблички могли бы выполнять не только
                    функциональную роль, но и воспитывать вкус
                    и насмотренность у жителей и гостей города.
                </p>
            </div>
            <div className={Style.bad_plates_container}></div>
            <ButtonSendOrderContext.Provider value={valueButtonSendOrderContext}>
                <ChangeColorContext.Provider value={valueColorContext}>
                    <div style={{margin: '0px', padding: '0px'}}>
                        <div style={{backgroundImage: `url("${colorContext.frontImage}")`}} className={Style.front}>
                            <div className={Style.front_wrapper}>
                                <h1 className={Style.h1_wrapper}>Заказ адресной<br/>таблички</h1>
                                <p className={Style.p_wrapper}>Введите название улицы и номер дома</p>
                                <StreetPlate/>
                            </div>
                        </div>
                        <div className={Style.inputs}>
                            <div className={Style.change_color_container}>
                                <p className={Style.inputs_p_wrapper}>Фасад</p>
                                <ChangeColor/>
                            </div>
                            <OrderForm/>
                        </div>
                    </div>
                </ChangeColorContext.Provider>
            </ButtonSendOrderContext.Provider>
        </>
    )
}

export default Home;