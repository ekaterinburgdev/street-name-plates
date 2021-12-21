import React, {useState} from "react";
import Button from "./Button";
import {StreetType} from "./Autocomplete";
import {COLORS} from "./ChangeColor";
import Style from '../../styles/Home.module.css' // так делать плохо, но я  так сделал, нужно будет переделать...

type MessageDataType = {
    street: StreetType,
    build: string,
    color: string,
    clientName: string,
    clientContact: string,
    montagePlate: boolean,
    dismantlingOldPlate: boolean
}

export const defaultMessageData: MessageDataType = {
    street: undefined,
    build: undefined,
    color: undefined,
    clientName: undefined,
    clientContact: undefined,
    montagePlate: false,
    dismantlingOldPlate: false
};

export const ButtonSendOrderContext = React.createContext({
    buttonSendOrderContext: defaultMessageData,
    setButtonSendOrderContext: (messageData: MessageDataType) => {
    }
})

function useInput(defaultValue) {
    const [value, setValue] = useState(defaultValue);

    function onChange(e) {
        setValue(e.target.value);
    }

    return {
        value,
        onChange,
    };
}

const checkboxesList = ["Монтаж", "Демонтаж"];

const getDefaultCheckboxes = () =>
    checkboxesList.map((checkbox) => ({
        name: checkbox,
        checked: false,
    }));

function useCheckboxes(defaultCheckboxes) {
    const [checkboxes, setCheckboxes] = useState(
        defaultCheckboxes || getDefaultCheckboxes()
    );

    function setCheckbox(index, checked) {
        const newCheckboxes = [...checkboxes];
        newCheckboxes[index].checked = checked;
        setCheckboxes(newCheckboxes);
    }

    return {
        setCheckbox,
        checkboxes,
    };
}

function Checkboxes({checkboxes, setCheckbox}) {
    const {buttonSendOrderContext, setButtonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    return (
        <>
            {checkboxes.map((checkbox, i) => (
                <label className={'check option'} key={i}>
                    <input
                        className={'check__input'}
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={(e) => {
                            if (checkbox.name == 'Монтаж') {
                                setButtonSendOrderContext({...buttonSendOrderContext, montagePlate: e.target.checked});
                            } else if (checkbox.name == 'Демонтаж') {
                                setButtonSendOrderContext({
                                    ...buttonSendOrderContext,
                                    dismantlingOldPlate: e.target.checked
                                });
                            }
                            // alert(checkbox.name);
                            setCheckbox(i, e.target.checked);
                        }}
                    />
                    <span className="check__box">
                    </span>{checkbox.name}
                </label>
            ))}
        </>
    );
}

function FinalCheckbox() {
    // @ts-ignore
    const checkboxes = useCheckboxes();

    return (
        <div>
            <Checkboxes {...checkboxes} />
        </div>
    );
}

function Inputs() {
    // @ts-ignore
    const inputNameProps = useInput();
    // @ts-ignore
    const inputCommProps = useInput();

    const {buttonSendOrderContext, setButtonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    return (
        <div className={'inputs-container'}>
            <p className={Style.p_wrapper}>
                Оставьте любимый способ связи.
                <br/>
                Мы напишем или позвоним, чтобы обсудить детали и оплату.
            </p>
            <input className={'StyledInput'} {...inputNameProps} placeholder="Имя"
                   onChange={event => setButtonSendOrderContext({
                       ...buttonSendOrderContext,
                       clientName: event.target.value
                   })}/>
            <input
                className={'StyledInput'}
                {...inputCommProps}
                placeholder="Почта, телефон, телеграм, что угодно"
                onChange={event => setButtonSendOrderContext({
                    ...buttonSendOrderContext,
                    clientContact: event.target.value
                })}
            />
            <p>Дополнительно:</p>
            <FinalCheckbox/>
            <Button name={"Оформить заявку на табличку"} onClick={() =>
                alert(`
            тип улицы: ${buttonSendOrderContext.street.streetType},
            название улицы: ${buttonSendOrderContext.street.streetName},
            улица на латинице: ${buttonSendOrderContext.street.streetLatin},
            дом: ${buttonSendOrderContext.build},
            цвет: ${buttonSendOrderContext.color || COLORS[0].fontColor},
            имя клиента: ${buttonSendOrderContext.clientName},
            любимый способ связи: ${buttonSendOrderContext.clientContact},
            Монтаж: ${buttonSendOrderContext.montagePlate},
            Демонтаж: ${buttonSendOrderContext.dismantlingOldPlate}
            `) //в поле цвет - костыль... тут
            }
                    labelColor={undefined} disabled={undefined}
                    type={undefined} style={undefined}/>
        </div>
    );
}

export default Inputs;
