import React, {useState} from "react";
import Button from "./Button";
import {StreetType} from "./Autocomplete";
import {FinalPrice} from "./FinalPrice";

type MessageDataType = {
    street: StreetType,
    build: string,
    color: string,
    plateLength: string,
    clientName: string,
    clientContact: string,
    montagePlate: boolean,
    dismantlingOldPlate: boolean,
    platePrice: number
}

export const defaultMessageData: MessageDataType = {
    street: undefined,
    build: undefined,
    color: undefined,
    plateLength: undefined,
    clientName: undefined,
    clientContact: undefined,
    montagePlate: false,
    dismantlingOldPlate: false,
    platePrice: 0
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
                        className={`check__input`}
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

    const sendMail = async (event) => {
        const a = await fetch(/*event.target.baseURI*/'https://eplates.vercel.app/api/request', {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-type': 'text'
            },
            body: `user_data: {"type": "${buttonSendOrderContext.street.streetType}", "street_name": "${buttonSendOrderContext.street.streetName}", "customer_name": "${buttonSendOrderContext.clientName}", "number": ${buttonSendOrderContext.build}, "dismanting": ${buttonSendOrderContext.dismantlingOldPlate}, "mounting": ${buttonSendOrderContext.montagePlate}, "color-code": "${buttonSendOrderContext.color}", "communication": "${buttonSendOrderContext.clientContact}"}`
        });
    }

    const styleInfoText = {
        marginTop: "120px",
        marginBottom: "40px",

        fontFamily: "Iset Sans",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "40px",
        lineHeight: "140%",

        color: "rgba(255, 255, 255, 0.8)"
    };

    return (
        <div className={'inputs-container'}>
            <p style={styleInfoText}>
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
            <p style={{color: "white"}}>Дополнительно:</p>
            <FinalCheckbox/>
            <Button name={"Оформить заявку на табличку"} onClick={(event) => sendMail(event)}
                    labelColor={undefined} disabled={undefined}
                    type={undefined} style={undefined}/>
        </div>
    );
}

export default Inputs;
