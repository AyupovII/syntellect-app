import React from 'react';
import { observer } from 'mobx-react-lite';
import style from './TextControl.module.scss';

interface ButtonConfig {
  label: string;
  handler: () => void;
}

interface TextControlProps {
  leftButtons?: ButtonConfig[];
  rightButtons?: ButtonConfig[];
  store: any;
}

const TextControl: React.FC<TextControlProps> = observer(({ leftButtons = [], rightButtons = [], store }) => {
  return (
    <div className={style.textControl} >
      {leftButtons.length > 0 && <div className={style.textControl__buttons}>
        {leftButtons.map((button, index) => (
          <button key={index} onClick={button.handler}>
            {button.label}
          </button>
        ))}
      </div>}
      <input
        placeholder='Введите число'
        type="text"
        value={store.text}
        onChange={(e) => store.setText(e.target.value)}
      />
      {rightButtons.length > 0 && <div className={style.textControl__buttons}>
        {rightButtons.map((button, index) => (
          <button key={index} onClick={button.handler}>
            {button.label}
          </button>
        ))}
      </div>}
    </div>
  );
});

export default TextControl;