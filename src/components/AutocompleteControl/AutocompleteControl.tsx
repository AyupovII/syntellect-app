import React, { useEffect, useRef, useCallback, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { AutoCompleteStore } from '../../store/AutoCompleteStore';
import style from './AutocompleteControl.module.scss';

interface AutoCompleteControlProps {
  maxResults?: number
}

const AutoCompleteControl: React.FC<AutoCompleteControlProps> = observer(({ maxResults = 5 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const store = useMemo(() => new AutoCompleteStore(), []);
  const [openOption, setOpenOption] = React.useState(false);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const targetNode = event.target as Node;
      if (ref.current && typeof ref.current === 'object') {
        if (!ref.current.contains(targetNode)) {
          setTimeout(() => setOpenOption(false), 100); // Задерживаем закрытие на 100 мс
        }
      }
    },
    []
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div ref={ref} className={style.autocomplete}>
      <input
        placeholder='Введите страну'
        className={style.autocomplete__input}
        type="text"
        value={store.query.text ?? ""}
        onClick={() => setOpenOption(true)} // Открывает выпадающий список при клике
        onChange={(e) => store.setQuery({ text: e.target.value, maxResults })}
      />
      {store.results.length > 0 && openOption && (
        <ul className={`${style.autocomplete__results} ${openOption ? style.autocomplete__results_visible : ""}`}>
          {store.results.map((item, index) => (
            <li
              className={style.autocomplete__item}
              key={index}
              onClick={() => {
                store.selectResult(item);
                setOpenOption(false); // Закрывается после выбора варианта
              }}
            >
              <img src={item.flag} alt={item.name} />
              {item.name} ({item.fullName})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
});

export default AutoCompleteControl;