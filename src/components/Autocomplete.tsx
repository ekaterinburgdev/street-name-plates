import React from 'react';
import {ChangeColorContext} from "./ChangeColor";

type StreetType = {
    streetName: string,
    streetType: string,
    streetLatin: string
}
const STREETS: StreetType[] = require('../../public/sign-suggest-list.json');

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

    const {colorContext} = React.useContext(ChangeColorContext);

    const changePlateLengthSize = (lengthStreetName: number) => {
        if (lengthStreetName <= 8){
            setPlateLengthSize('1300мм');
            setPlateLengthPX('640px');
            //изменение в самую маленькую табличку
        } else if (lengthStreetName >= 9 && lengthStreetName <=13){
            setPlateLengthSize('1700мм');
            setPlateLengthPX('800px');
            //изменение в среднюю табличку
        } else if (lengthStreetName >= 14){
            setPlateLengthSize('2050мм');
            setPlateLengthPX('960px');
            //изменение в сааамую большую табличку
        }
    }

    const findSuggestions = (event: React.ChangeEvent<HTMLInputElement>) => { //вообще, фильтрация же будет осуществляться на беке, значит тут нужен просто запрос
        setInputVal(undefined); // костыль... (наверное)
        const value: string = event.target.value || '';
        console.log(value);

        changePlateLengthSize(value.length);

        const newSuggestions = STREETS.filter(street =>
            street.streetName.toUpperCase().indexOf(value.toUpperCase()) == 0).slice(-5);
        setSuggestions(newSuggestions);
        console.log('newSuggestions');
        console.log(newSuggestions);

        if (value.length != 0 && newSuggestions.length > 0) {
            setInputPref(value);
            setIsFind(true);
        } else {
            setIsFind(false);
            setLatinName(undefined);
            setStreetType(undefined);
        }

    }

    const getSuggestion = (suggestion: StreetType) => {
        const pref = inputPref; //делать первую букву заглавной...
        const suf = suggestion.streetName.slice(pref?.length);

        return (
            <React.Fragment>
                {suggestion.streetType} <span className={'suggestion-pref'}>{pref}</span>{suf}
            </React.Fragment>
        )
    }

    const setStreet = (event:  React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
        const streetName = event.currentTarget.innerText.split(' ').slice(1).join(' ');
        console.log(streetName);
        console.log(suggestions);
        const sug = suggestions.filter(suggestion => suggestion.streetName.toUpperCase() == streetName.toUpperCase())[0];
        console.log(sug);
        changePlateLengthSize(sug.streetName.length);
        setInputVal(sug.streetName);
        setLatinName(sug.streetLatin);
        setStreetType(sug.streetType);
        setIsFind(false);
    }

    const renderSuggestion = () => {
        return (
            <ul className={'suggestions'}>
                {console.log('suggestions')}
                {console.log(suggestions)}
                {suggestions.map(suggestion => (
                    <li key={suggestion.streetName + suggestion.streetType}>
                        <span
                            className={'suggestion-active'}
                            key={suggestion.streetName + suggestion.streetType}
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
        if(val.length <= 2){
            setFontSizeBuildingNumber('105px');
        } else if (val.length == 3){
            setFontSizeBuildingNumber('80px');
        } else if (val.length == 4){
            setFontSizeBuildingNumber('60px');
        } else if (val.length == 5){
            setFontSizeBuildingNumber('50px');
        } else if (val.length == 6){
            setFontSizeBuildingNumber('40px');
        }

    }

    return (
        //очень много дивов, возможно, есть смысл юзать React.Fragment
        <div className={'plate-container'}>
            <span className={'plate-width-size'}>320мм</span>
            <div className={'plate'} style={{width: plateLengthPX}}>
                <div className={'street'}>
                    <input
                        className={'street-type'}
                        value={streetType}
                        readOnly={true}
                        placeholder={'улица'}
                        style={{color: colorContext.fontColor}}
                    />
                    <input
                        className={'street-name'}
                        type={'text'}
                        onChange={findSuggestions}
                        value={inputVal}
                        placeholder={'8 Марта'}
                        style={{color: colorContext.fontColor}}
                    />
                    <input
                        className={'street-latin'}
                        value={latinName}
                        readOnly={true}
                        placeholder={'8 MARTA STREET'}
                        style={{color: colorContext.fontColor}}
                    />
                    {isFind && renderSuggestion()} {/*пока пускай будет тут, или навсегда будет тут...*/}
                </div>
                <div className={'separator'} style={{backgroundColor: colorContext.fontColor, borderColor: colorContext.fontColor}}></div>
                <div className={'building'}>
                    <input
                        type={'text'}
                        maxLength={6}
                        className={'building-number'}
                        placeholder={'7'}
                        onChange={adjustFrontSize}
                        style={{fontSize: fontSizeBuildingNumber, color: colorContext.fontColor}}
                    />
                    {/*<div>*/}
                    {/*    <input className={'building-near-number'} placeholder={'7'}/>*/} {/*Вроде решили это убрать*/}
                    {/*    →*/}
                    {/*    <input className={'building-near-number'} placeholder={'7'}*/}
                    {/*           style={{marginLeft: '0px', textAlign: "right"}}/>*/}
                    {/*</div>*/}
                </div>

            </div>
            <span className={'plate-length-size'}>{plateLengthSize}</span>
        </div>
    )
};

export default Autocomplete;