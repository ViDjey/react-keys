import { IItem } from './index';
import { useEffect, useState } from 'react';

export function Keys(props: { initialData: IItem[]; sorting: 'ASC' | 'DESC' }) {
    const [listItems, setListItems] = useState(props.initialData);
    const [idClick, setIdClick] = useState(0);
    const [inputValue, setInputvalue] = useState('');

    const handlerClick = (elem: number) => {
        setIdClick(elem);
    };

    const handlerEnterEscape = (event: any) => {
        if (event.keyCode === 13) {
            setListItems(
                listItems.map((item) => {
                    if (idClick == item.id) {
                        item.name = inputValue;
                    }
                    return item;
                }),
            );
            setIdClick(0);
        }
        if (event.keyCode === 27) setIdClick(0);
    };
    useEffect(() => {
        if (props.sorting === 'ASC') setListItems(props.initialData);
        else {
            setListItems(props.initialData.slice().reverse());
        }
    }, [props.sorting]);
    let something = listItems.map((item: IItem) => {
        if (idClick != item.id)
            return (
                <p onClick={() => handlerClick(item.id)} key={item.id}>
                    {item.name}
                </p>
            );
        return (
            <input
                type="text"
                defaultValue={item.name}
                key={item.id}
                onChange={(event) => setInputvalue(event.target.value)}
                onKeyDown={handlerEnterEscape}
            />
        );
    });

    return <div>{something}</div>;
}
