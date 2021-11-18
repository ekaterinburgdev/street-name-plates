import React from "react";
import Style from '../../styles/Window.module.css';
import '../../styles/Window.module.css'; //по какой-то причине это не работает(, приходить юзать вариант выше

const Window = () => {
    return (
        <div className={Style.window} >
            <div className={Style.window_frame}>
                <div className={Style.window_glass_top}></div>
                <div className={Style.window_glass_bottom_container}>
                    <div className={Style.window_glass_bottom}></div>
                    <div className={Style.window_glass_bottom}></div>
                </div>
            </div>
            <div className={Style.window_sill}></div>
        </div>
    );
}

export default Window;