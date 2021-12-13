import React, {useState} from "react";
import Button from "./Button";
import {StreetType} from "./Autocomplete";

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
            <p>
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
            тип улицы: ${buttonSendOrderContext.street.streetType || 'не нашёл'},
            название улицы: ${buttonSendOrderContext.street.streetName || 'не нашёл'},
            улица на латинице: ${buttonSendOrderContext.street.streetLatin || 'не нашёл'},
            дом: ${buttonSendOrderContext.build},
            цвет: ${buttonSendOrderContext.color},
            Монтаж: ${buttonSendOrderContext.montagePlate},
            Демонтаж: ${buttonSendOrderContext.dismantlingOldPlate}
            `)
            }
                    labelColor={undefined} disabled={undefined}
                    type={undefined} style={undefined}/>
        </div>
    );
}

export default Inputs;
