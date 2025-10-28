// src/app/App.tsx
import React from 'react';
import TextControl from './components/TextControl/TextControl';
import { store } from './store/TextControlStore';
import AutoCompleteControl from './components/AutocompleteControl/AutocompleteControl';
import './App.css';

const App: React.FC = () => {
  function validateText(input: string) {
    if (input.trim().length === 0) return 'Строка пустая';
    return isNaN(Number(input)) ? 'Не число!' : `${input} - число`;
  }

  return (
    <div>
      <section className='container'>
        <h2>Контрол с двумя кнопками справа:</h2>
        <TextControl
          store={store}
          rightButtons={[
            { label: 'Очистить', handler: store.resetText },
            { label: 'Привет мир!', handler: store.helloWorld },
          ]}
        />
        <h2>Контрол с одной кнопкой слева и одной справа:</h2>
        <TextControl
          store={store}
          leftButtons={[{ label: 'Проверить число', handler: () => alert(validateText(store.text)) }]}
          rightButtons={[{ label: 'Показать текст', handler: () => alert(store.text) }]}
        />
      </section>
      <section className='container'>
        {/* можно было для maxResults сделать отдельный инпут */}
        <h2>Контрол-автокомплит maxResults=3</h2>
        <AutoCompleteControl
          maxResults={3}
        />
        <h2>Контрол-автокомплит maxResults=10</h2>
        <AutoCompleteControl
          maxResults={10}
        />
      </section>

    </div>
  );
};

export default App;