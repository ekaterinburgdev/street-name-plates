import React from 'react';
import './App.css';
import {type} from "os";
//массивы для тестов
type StreetType = {
    streetName: string,
    streetType: string,
    streetLatin: string}
const STREETS: StreetType[] = require('./sign-suggest-list.json');
// const STREETS = ['Бажова', 'Ленина', 'Московская', "Бабина", "Баровая", "Базовый", '8 марта']
// const LATIN = {'Бажова': 'street bajova', 'Ленина': 'Lenina Avenue', 'Базовый': 'Bazovy Lane'}

const Autocomplete = () => {
    const [isFind, setIsFind] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<StreetType[]>([]);
    const [inputVal, setInputVal] = React.useState<string>();
    const [inputPref, setInputPref] = React.useState<string>();
    const [latinName, setLatinName] = React.useState('in eng');
    const [streetType, setStreetType] = React.useState('Тип улицы');
    const [savedInnerHtml, setSavedInnerHtml] = React.useState<string>();
    const [plateLengthPX, setPlateLengthPX] = React.useState('640px');
    const [plateLengthSize, setPlateLengthSize] = React.useState('1300мм');

    const changePlateLengthSize = (lengthStreetName: number) => {
        if (lengthStreetName <= 8){
            setPlateLengthSize('1300мм');
            setPlateLengthPX('640px');
            //измененеие в самую маленькую табличку
        } else if (lengthStreetName >= 9 && lengthStreetName <=13){
            setPlateLengthSize('1700мм');
            setPlateLengthPX('800px');
            //изменения в среднюю табличку
        } else if (lengthStreetName >= 14){
            setPlateLengthSize('2050мм');
            setPlateLengthPX('960px');
            //изменения в сааамую большую табличку
        }
    }

    const findSuggestions = (event: React.ChangeEvent<HTMLInputElement>) => { //вообще, фильтрация же будет осуществляться на беке, значит тут нужен просто запрос
        console.log('тут на')
        setInputVal(undefined); // костыль... (наверное)
        const value: string = event.target.value;

        changePlateLengthSize(value.length);

        const newSuggestions = STREETS.filter(street => street.streetName.toUpperCase().indexOf(value.toUpperCase()) == 0).slice(-5); //ещё нужно добавить как минимум каст appercase или down
        setSuggestions(newSuggestions);

        if (value.length != 0 && newSuggestions.length > 0) {
            setInputPref(value);
            setIsFind(true);
        } else {
            setIsFind(false);
            setLatinName('in eng');
            setStreetType('Тип улицы');
        }

    }

    const getSuggestion = (suggestion: StreetType) => {
        const pref = inputPref; //делать первую букву заглавной...
        const suff = suggestion.streetName.slice(pref?.length);

        return (
            <React.Fragment>
                {suggestion.streetType} <span className={'suggestion-pref'}>{pref}</span>{suff}
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
                {suggestions.map(suggestion => (
                    <li key={suggestion.streetName}>
                        <span
                            className={'suggestion-active'}
                            key={suggestion.streetName}
                            onClick={setStreet} //вылитает варнинг, неконталируемове изменение инпута, это норма?
                            onMouseEnter={event => {
                                const sug = event.currentTarget.innerText;
                                setSavedInnerHtml(event.currentTarget.innerHTML);
                                event.currentTarget.innerHTML = sug;
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
                    />
                    <input
                        className={'street-name'}
                        type={'text'}
                        onChange={findSuggestions}
                        value={inputVal}
                        placeholder={'8 Марта'}
                    />
                    <input
                        className={'street-latin'}
                        value={latinName}
                        readOnly={true}
                    />
                    {isFind && renderSuggestion()} {/*пока пускай будет тут, или навсегда будет тут...*/}
                </div>
                <div className={'separator'}></div>
                <div className={'building'}>
                    <input className={'building-number'} placeholder={'7'}/>
                    <div>
                        <input className={'building-near-number'} placeholder={'7'}/>
                        →
                        <input className={'building-near-number'} placeholder={'7'}
                               style={{marginLeft: '0px', textAlign: "right"}}/>
                    </div>
                </div>

            </div>
            <span className={'plate-length-size'}>{plateLengthSize}</span>
        </div>
    )
};

function App() {
    return (
        <div>
            <h1>Начинай вводить</h1>
            <Autocomplete/>
        </div>
    );
}

export default App;
