import Autocomplete from "../src/components/Autocomplete";
import Inputs from '../src/components/inputs';
import Window from "../src/components/Window";
import ChangeColor from "../src/components/ChangeColor";
import {COLORS, ChangeColorContext} from "../src/components/ChangeColor";
import React from "react";
import Style from '../styles/Home.module.css';


const Home = () => {
    const [colorContext, setColorContext] = React.useState(COLORS[0]);  //насколько костыль так делать???
    const value = {colorContext, setColorContext}

    return (
        <ChangeColorContext.Provider value={value}>
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
    )
}

export default Home;