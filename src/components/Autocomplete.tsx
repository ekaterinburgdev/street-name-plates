import React from 'react';
import {ChangeColorContext} from "./ChangeColor";
import Style from '../../styles/Autocomplete.module.css'
import {ButtonSendOrderContext} from "./inputs";

export type StreetType = {
    streetName: string,
    streetType: string,
    streetLatin: string
}

export const defaultPlateLength = '1300мм';

const Autocomplete = () => {
    const [isFind, setIsFind] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<StreetType[]>([]);
    const [inputVal, setInputVal] = React.useState<string>();
    const [inputPref, setInputPref] = React.useState<string>();
    const [latinName, setLatinName] = React.useState<string>();
    const [streetType, setStreetType] = React.useState<string>();
    const [savedInnerHtml, setSavedInnerHtml] = React.useState<string>();
    const [plateLengthPX, setPlateLengthPX] = React.useState('640px');
    const [plateLengthSize, setPlateLengthSize] = React.useState('1300мм');
    const [fontSizeBuildingNumber, setFontSizeBuildingNumber] = React.useState('105px');
    const [indexActiveSuggestion, setIndexActiveSuggestion] = React.useState(0);

    const {colorContext} = React.useContext(ChangeColorContext);
    const {buttonSendOrderContext, setButtonSendOrderContext} = React.useContext(ButtonSendOrderContext);

    const changePlateLengthSize = (lengthStreetName: number) => {
        if (lengthStreetName <= 8) {
            setPlateLengthSize('1300мм');
            setPlateLengthPX('640px');
            //изменение в самую маленькую табличку
        } else if (lengthStreetName >= 9 && lengthStreetName <= 13) {
            setPlateLengthSize('1700мм');
            setPlateLengthPX('800px');
            //изменение в среднюю табличку
        } else if (lengthStreetName >= 14) {
            setPlateLengthSize('2050мм');
            setPlateLengthPX('960px');
            //изменение в сааамую большую табличку
        }

        setButtonSendOrderContext({...buttonSendOrderContext, plateLength: plateLengthSize})
    }

    const findSuggestions = async (event: React.ChangeEvent<HTMLInputElement>) => { //вообще, фильтрация же будет осуществляться на беке, значит тут нужен просто запрос
        setInputVal(undefined); // костыль... (наверное)
        setStreetType('');
        setLatinName('');
        const value: string = event.target.value || '';

        changePlateLengthSize(value.length);

        const maximumSuggestions = 4;


        changePlateLengthSize(value.length);

        let streets = await (await fetch(event.target.baseURI + `/api/autocomplete?street=${value}&maximumSuggestions=${maximumSuggestions}`)).json();
        //console.log(event.target.baseURI);
        //console.log(window.location.href);
        //console.log(document.URL);


        const newSuggestions = streets.hasOwnProperty('streets') ? streets.streets.map(s => {
            const res: StreetType = {
                streetName: s.street,
                streetType: s.type,
                streetLatin: s.english_name
            };
            return res
        }) : [];
        setSuggestions(newSuggestions);

        //Старый код:

        // const newSuggestions = STREETS.filter(street =>
        //     street.streetName.toUpperCase().indexOf(value.toUpperCase()) == 0).slice(-5);
        // setSuggestions(newSuggestions);
        // console.log('newSuggestions');
        // console.log(newSuggestions);

        if (value.length != 0 && newSuggestions.length > 0) {
            setInputPref(value);
            setIndexActiveSuggestion(0);
            setIsFind(true);
        } else {
            setIsFind(false);
        }

    }

    const getSuggestion = (suggestion: StreetType) => {
        const pref = suggestion.streetName.slice(0, inputPref?.length);
        const suf = suggestion.streetName.slice(inputPref?.length);

        return (
            <React.Fragment>
                <span className={Style.suggestion_part}>{suggestion.streetType}</span> <span
                key={suggestion.streetName + suggestion.streetType}
                className={Style.suggestion_pref}>{pref}
            </span><span className={Style.suggestion_part}>{suf}</span>
            </React.Fragment>
        )
    }

    const setStreet = (event: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const streetName = event.currentTarget.innerText.split(' ').slice(1).join(' ');

        const sug = suggestions.filter(suggestion => suggestion.streetName.toUpperCase() == streetName.toUpperCase())[0];
        changePlateLengthSize(sug.streetName.length);
        setInputVal(sug.streetName);
        setLatinName(sug.streetLatin);
        setStreetType(sug.streetType);
        setIsFind(false);

        setButtonSendOrderContext({
            ...buttonSendOrderContext, street: sug
        });
        console.log('аааааааа');
        console.log(buttonSendOrderContext);
    }

    const navOnSuggestion = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const key = event.key || '';

        if (!isFind) {
            return;
        }

        if (key == 'ArrowDown') {
            const newIndex = indexActiveSuggestion + 1;
            if (newIndex >= suggestions.length) {
                setIndexActiveSuggestion(0)
            } else {
                setIndexActiveSuggestion(newIndex)
            }
        } else if (key == 'ArrowUp') {
            const newIndex = indexActiveSuggestion - 1;
            if (newIndex < 0) {
                setIndexActiveSuggestion(suggestions.length - 1)
            } else {
                setIndexActiveSuggestion(newIndex)
            }
        } else if (key == 'Enter') {
            const sug = suggestions[indexActiveSuggestion];
            changePlateLengthSize(sug.streetName.length);
            setInputVal(sug.streetName);
            setLatinName(sug.streetLatin);
            setStreetType(sug.streetType);
            setIsFind(false);

            setButtonSendOrderContext({
                ...buttonSendOrderContext, street: sug
            });
        }
    }

    const renderSuggestion = () => {
        return (
            <ul className={Style.suggestions}>
                {suggestions.map((suggestion, index) => (
                    <li key={suggestion.streetName + suggestion.streetType}>
                        <span
                            className={index != indexActiveSuggestion ? Style.suggestion : Style.suggestion_active}
                            onClick={setStreet}
                            onMouseEnter={event => {
                                const sug = event.currentTarget.innerText;
                                setSavedInnerHtml(event.currentTarget.innerHTML);
                                event.currentTarget.innerText = sug;
                            }}
                            onMouseLeave={event => {
                                // @ts-ignore
                                event.currentTarget.innerHTML = savedInnerHtml;
                            }}
                        >
                        {getSuggestion(suggestion)}
                    </span>
                    </li>
                ))}
            </ul>
        )
    }

    const adjustFrontSize = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setButtonSendOrderContext({...buttonSendOrderContext, build: val}); //нужно поменять название метода из-за этой строчки

        if (val.length <= 2) {
            setFontSizeBuildingNumber('105px');
        } else if (val.length == 3) {
            setFontSizeBuildingNumber('80px');
        } else if (val.length == 4) {
            setFontSizeBuildingNumber('60px');
        } else if (val.length == 5) {
            setFontSizeBuildingNumber('50px');
        } else if (val.length == 6) {
            setFontSizeBuildingNumber('40px');
        }

    }

    return (
        // @ts-ignore
        <div className={Style.plate_container} style={{'--font-color': colorContext.fontColor}}>
            <span className={Style.plate_width_size}>320мм</span>
            <div className={Style.plate} style={{width: plateLengthPX}}>
                <div className={Style.street}>
                    <input
                        className={Style.street_type}
                        value={streetType}
                        readOnly={true}
                        placeholder={'улица'}
                    />
                    <input
                        className={Style.street_name}
                        type={'text'}
                        onChange={findSuggestions}
                        onKeyDown={navOnSuggestion}
                        value={inputVal}
                        placeholder={'8 Марта'}
                    />
                    <input
                        className={Style.street_latin}
                        value={latinName}
                        readOnly={true}
                        placeholder={'8 MARTA STREET'}
                    />
                    {isFind && renderSuggestion()} {/*пока пускай будет тут, или навсегда будет тут...*/}
                </div>
                <div className={Style.separator}></div>
                <div className={Style.building}>
                    <input
                        type={'text'}
                        maxLength={6}
                        className={Style.building_number}
                        placeholder={'7'}
                        onChange={adjustFrontSize}
                        style={{fontSize: fontSizeBuildingNumber}}
                    />
                    {/*<div>*/}
                    {/*    <input className={'building-near-number'} placeholder={'7'}/>*/} {/*Вроде решили это убрать*/}
                    {/*    →*/}
                    {/*    <input className={'building-near-number'} placeholder={'7'}*/}
                    {/*           style={{marginLeft: '0px', textAlign: "right"}}/>*/}
                    {/*</div>*/}
                </div>

            </div>
            <span className={Style.plate_length_size}>{plateLengthSize}</span>
            <div>{}</div>
        </div>
    )
};

export default Autocomplete;