import React, {useState} from "react";

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
    return (
        <>
            {checkboxes.map((checkbox, i) => (
                <label className={'CheckboxLabel'} key={i}>
                    <input
                        className={'Checkbox'}
                        type="checkbox"
                        checked={checkbox.checked}
                        onChange={(e) => {
                            // alert(e.target.checked);
                            setCheckbox(i, e.target.checked);
                        }}
                    />
                    {checkbox.name}
                </label>
            ))}
        </>
    );
}

function FinalCheckbox() {
    const checkboxes = useCheckboxes();

    return (
        <div>
            <Checkboxes {...checkboxes} />
            {/*
        <span>
          Value:
          {checkboxes.checkboxes
            .filter((t) => t.checked)
            .map((checkbox) => checkbox.name)
            .join(", ")}
        </span>
        */}
        </div>
    );
}

function Inputs() {
    const inputNameProps = useInput();
    const inputCommProps = useInput();

    return (
        <div className={'inputs-container'}>
            <p>
                Оставьте любимый способ связи.
                <br/>
                Мы напишем или позвоним, чтобы обсудить детали и оплату.
            </p>
            <input className={'StyledInput'} {...inputNameProps} placeholder="Имя"/>
            <input
                className={'StyledInput'}
                {...inputCommProps}
                placeholder="Почта, телефон, телеграм, что угодно"
            />
            <p>Дополнительно:</p>
            <FinalCheckbox/>
        </div>
    );
}

export default Inputs;
