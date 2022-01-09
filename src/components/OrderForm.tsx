import React, {createContext, useState} from "react";
import OrderButton from "./OrderButton";
import {StreetType} from "./StreerPlate";
import {ExportPrice} from "./StreerPlate";
import {IsPressedButton} from "./OrderButton";

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
    setButtonSendOrderContext: (messageData: MessageDataType) => {}
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

const checkboxesList = [
    "Демонтаж старой таблички",
    "Монтаж новой таблички"
];

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
    const {
        buttonSendOrderContext,
        setButtonSendOrderContext
    } = React.useContext(ButtonSendOrderContext);

    return (
        <>
            {checkboxes.map((checkbox, i) => (
                <label className={'check option'} key={i}>
                    <input
                        className={`check__input__${i}`}
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={(e) => {
                            if (checkbox.name == 'Монтаж новой таблички') {
                                setButtonSendOrderContext({...buttonSendOrderContext, montagePlate: e.target.checked});
                            } else if (checkbox.name == 'Демонтаж старой таблички') {
                                setButtonSendOrderContext({
                                    ...buttonSendOrderContext,
                                    dismantlingOldPlate: e.target.checked
                                });
                            }
                            // alert(checkbox.name);
                            setCheckbox(i, e.target.checked);
                        }}
                    />
                    <span className={`check__box__${i}`}>
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

function OrderForm() {
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

        color: "#FFFFFF"
    };

    function calculateFinalPrice(price : number) {
        if (buttonSendOrderContext.dismantlingOldPlate) {
            price += 2990
        }

        if (buttonSendOrderContext.montagePlate) {
            price += 6990
        }

        return price
    }

    function FinalPrice() {
        return (
            <div>
                <p style={{
                    fontFamily: "Iset Sans",
                    fontStyle: "normal",
                    fontWeight: "normal",
                    display: "inline-block",
                    color: "white",
                    fontSize: "40px",
                    lineHeight: "140%",
                    margin: "40px 20px 20px 20px"
                }}>
                    Общая стоимость<span style={{marginLeft: "90px"}}/>{
                    ExportPrice == undefined ? calculateFinalPrice(4990)
                        : calculateFinalPrice(ExportPrice)
                } ₽
                </p>
            </div>)
    }

    function FinalPriceWithDismountingOrMounting() {
        return <p style={{
            fontFamily: "Iset Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            display: "inline-block",
            color: "white",
            fontSize: "40px",
            lineHeight: "140%",
            margin: "40px 20px 20px 20px"
        }}>
            Общая стоимость<span style={{marginLeft: "70px"}}/>до {
            ExportPrice == undefined ? calculateFinalPrice(4990)
                : calculateFinalPrice(ExportPrice)
        } ₽ <br/>
            <span style={{fontSize: "20px !important", opacity: "0.5"}}>
                зависит от сложности работ
            </span>
        </p>
    }

    function Text() {
        return <p style={{
            fontFamily: "Iset Sans",
            fontStyle: "normal",
            fontWeight: "normal",
            display: "inline-block",
            color: "white",
            fontSize: "40px",
            lineHeight: "140%",
            textAlign: "center",
            margin: "40px 20px 20px 20px"
        }}>Мы свяжемся с вами и расскажем, что дальше
        </p>
    }

    function RenderFinalPrice(props) {
        const isMounting = props.isMounting;
        const isDismounting = props.isDismounting;

        if (IsPressedButton) {
            return <Text/>
        }

        if (isMounting || isDismounting) {
            return <FinalPriceWithDismountingOrMounting/>
        } else {
            return <FinalPrice/>
        }
    }

    let IsSendMail = false

    return (
        <div className={'inputs-container'}>
            <form onSubmit={ event => event.preventDefault() }>
                <p style={styleInfoText}>
                    Оставьте любимый способ связи.
                    <br/>
                    Мы напишем или позвоним, чтобы обсудить детали и оплату.
                </p>
                <input required={true}
                       autoComplete="none"
                       className={'StyledInput'} {...inputNameProps}
                       placeholder="Имя"
                       onChange={event => setButtonSendOrderContext({
                           ...buttonSendOrderContext,
                           clientName: event.target.value,
                       })}/>
                <input required={true}
                    className={'StyledInput'}
                    {...inputCommProps}
                    placeholder="Способ связи. Например, email"
                    autoComplete="none"
                    onChange={event => setButtonSendOrderContext({
                        ...buttonSendOrderContext,
                        clientContact: event.target.value
                    })}
                />
                <FinalCheckbox/>
                <OrderButton onClickHandler={
                    (event) => {
                        if (!IsSendMail) {
                            IsSendMail = true
                            sendMail(event)
                                .then(_ => console.log("Email send successful"))
                                .catch(_ => console.log("Something went wrong"))
                        } else {
                            console.log("Email has already been sent")
                        }
                    }
                }/>
                <RenderFinalPrice isMounting={buttonSendOrderContext.montagePlate}
                                  isDismounting={buttonSendOrderContext.dismantlingOldPlate}/>
                <br/>
            </form>
        </div>
    );
}
export default OrderForm;
