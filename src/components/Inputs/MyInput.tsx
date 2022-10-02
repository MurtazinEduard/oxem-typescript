import React, { FC } from 'react';

import style from './Input.module.sass';
import { MySlider } from './MySlider';

interface InputProps {
  children: React.ReactNode;
  handleChangeInput: any;
  inputValue: number
  sliderValues: {
    step: number;
    min: number;
    max: number;
  };
  inputTitle: string;
}

const MyInput: FC<InputProps> = ({
  children,
  handleChangeInput,
  inputValue,
  sliderValues,
  inputTitle,
}) => {
  const handleSlider = (event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      handleChangeInput(newValue);
    }
  };
  const handleInput = (newValue: number) => {
    if (newValue) {
      handleChangeInput(newValue);
    } else {
      handleChangeInput('');
    }
  };
  const handleBlurInput = () => {
    if (inputValue < +sliderValues.min) {
      handleChangeInput(sliderValues.min)
    }
    if (inputValue > +sliderValues.max) {
      handleChangeInput(sliderValues.max)
    }
  }

  return (
    <div className={style.main}>
      <span className={style.main_title}>{inputTitle}</span>
      <div >
        <input
          onBlur={handleBlurInput}
          autoFocus
          value={inputValue}
          onChange={(e) => handleInput(e.target.valueAsNumber)}
          type="number"
          className={style.main_input}
        />
        <label className={style.main_label}>{children}</label>
        <div className={style.main_slider}>
          <MySlider
            onChange={(event: Event, newValue: number | number[]) =>
              handleSlider(event, newValue)
            }
            valueLabelDisplay="auto"
            value={+inputValue}
            size="small"
            aria-label="Small"
            min={sliderValues.min}
            max={sliderValues.max}
            step={sliderValues.step}
          />
        </div>
      </div>
    </div>
  );
};

export default MyInput;
