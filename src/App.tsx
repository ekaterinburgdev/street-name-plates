import React from 'react';
import './App.css';
//массивы для тестов
const STREETS = ['Бажова', 'Ленина', 'Московская', "Бабина", "Баровая", "Базовый", '8 марта']
const LATIN = {'Бажова': 'street bajova', 'Ленина': 'Lenina Avenue', 'Базовый': 'Bazovy Lane'}

const Autocomplete = () => {
    const [isFind, setIsFind] = React.useState(false);
    const [suggestions, setSuggestions] = React.useState<string[]>([]);
    const [inputVal, setInputVal] = React.useState<string>();
    const [inputPref, setInputPref] = React.useState<string>();
    const [latinName, setLatinName] = React.useState('in eng')

    const findSuggestions = (event: React.ChangeEvent<HTMLInputElement>) => { //вообще, фильтрация же будет осуществляться на беке, значит тут нужен просто запрос
        setInputVal(undefined); // костыль... (наверное)
        const value: string = event.target.value;
        const newSuggestions = STREETS.filter(street => street.indexOf(value) == 0); //ещё нужно добавить как минимум каст appercase или down
        setSuggestions(newSuggestions);

        if (value.length != 0 && newSuggestions.length > 0) {
            setInputPref(value);
            setIsFind(true);
        } else {
            setIsFind(false);
            setLatinName('in eng');
        }

    }

    const getSuggestion = (suggestion: string) => {
        const pref = inputPref;
        const suff = suggestion.slice(pref?.length);

        return (
            <React.Fragment>
                <span className={'suggestion-pref'}>{pref}</span>{suff}
            </React.Fragment>
        )
    }

    const renderSuggestion = () => {
        let savedInnerHtml: string;
        return (
            <ul className={'suggestions'}>
                {suggestions.map(suggestion => (
                    <li>
                        <span
                            className={'suggestion-active'}
                            key={suggestion}
                            onClick={event => {
                                // @ts-ignore //<-- первый раз помогло)
                                setLatinName(LATIN[event.currentTarget.innerText]);
                                setInputVal(event.currentTarget.innerText);
                                setIsFind(false);
                            }} //вылитает варнинг, неконталируемове изменение инпута, это норма?
                            onMouseEnter={event => {
                                const sug = event.currentTarget.innerText;
                                savedInnerHtml = event.currentTarget.innerHTML;
                                event.currentTarget.innerHTML = sug;
                            }}
                            onMouseLeave={event => {
                                const sug = event.currentTarget.innerText;
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
            <div className={'plate'}>
                <div className={'street'}>
                    <input
                        className={'street-type'}
                        value={'Улица'}
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
            <span className={'plate-height-size'}>1700мм</span>
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

// ReactDOM.render(
//     <div>
//     <h1>Начинай вводить</h1>
//     <Autocomplete
//         suggestions={["Ленина", "Бажова", "Тургеньева", "Московская", "Космонавтов"]}/>
//     </div>,
//     document.getElementById("root"));

export default App;
