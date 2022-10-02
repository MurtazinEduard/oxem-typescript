import { Button, ButtonProps, styled } from '@mui/material';
import { useState } from 'react';
import MyInput from '../components/Inputs/MyInput';
import style from './MainPage.module.sass';
const MainPage = () => {
  const ColorButton = styled(Button)<ButtonProps>(() => ({
    color: '#fff',
    backgroundColor: '#FF9514',
    width: '100%',
    borderRadius: '30px',
    fontWeight: '900',
    fontSize: '30px',
    boxSizing: 'border-box',
    '&:hover': {
      backgroundColor: '#111',
      color: '#fff',
    },
  }));
  const [carPrice, setCarPrice] = useState<number>(1000000);
  const [firstPayment, setFirstPayment] = useState<number>(100000);
  const [month, setMonth] = useState<number>(1);

  const firstPay = (cent: number) => {
    return (carPrice / 100) * cent;
  };
  const monthPay = () => {
    return Math.round(
      (carPrice - firstPayment) *
        ((0.035 * Math.pow(1 + 0.035, month)) /
          (Math.pow(1 + 0.035, month) - 1)),
    );
  };
  const maxSum = () => {
    return Math.round(firstPayment + month * monthPay());
  };
  const { default: axios } = require('axios');

  const onSendData = async () => {
    const myData = {
      carPrice,
      firstPayment,
      month,
    };
    await axios.post('https://eoj3r7f3r4ef6v4.m.pipedream.net', myData, {
      headers: { 'Content-Type': 'application/json' },
    }).then((response: any) => {
      console.log(response)
    })
    .catch((error: any) => {
      console.log(error)
    })
  };

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        <h1 className={style.main_title}>
          Расчитайте стоимость
          <br /> автомобиля в лизинг
        </h1>
        <div className={style.main_inputs}>
          <MyInput
            sliderValues={{ step: 100000, min: 1000000, max: 6000000 }}
            inputValue={carPrice}
            handleChangeInput={setCarPrice}
            inputTitle="Стоимость автомобиля">
            ₽
          </MyInput>
          <MyInput
            sliderValues={{ step: 10000, min: firstPay(10), max: firstPay(60) }}
            inputValue={firstPayment}
            handleChangeInput={setFirstPayment}
            inputTitle="Первоначальный взнос">
            {Math.round((firstPayment / carPrice) * 100)}%
          </MyInput>
          <MyInput
            sliderValues={{ step: 1, min: 1, max: 60 }}
            inputValue={month}
            handleChangeInput={setMonth}
            inputTitle="Срок лизинга">
            мес.
          </MyInput>
        </div>
        <div className={style.footer}>
          <div className={style.footer_price}>
            <span className={style.footer_price__title}>
              Сумма договора лизинга
            </span>
            <span className={style.footer_price__value}>{maxSum()} ₽</span>
          </div>
          <div className={style.footer_price}>
            <span className={style.footer_price__title}>
              Ежемесячный платеж от
            </span>
            <span className={style.footer_price__value}>{monthPay()} ₽</span>
          </div>
          <div className={style.footer_button}>
            <ColorButton onClick={onSendData}>Оставить заявку</ColorButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
