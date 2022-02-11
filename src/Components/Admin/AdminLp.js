import React, {useEffect, useState} from 'react'
import {Container, Image} from 'react-bootstrap'
import {RiListSettingsLine} from 'react-icons/ri'
import {VscHistory} from 'react-icons/vsc'
import {BiChevronDown} from 'react-icons/bi'
import {BsArrowDown} from 'react-icons/bs'
import NumberFormat from 'react-number-format'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

// svgs
import USDC from '../../Assets/money/usdc.svg'
import RecentTransactions from '../Modals/RecentTransactions/RecentTransactions'
import SettingsModal from '../Modals/SettingsModal/SettingsModal'
import {addLiquidityTokens, REMOVE_hash} from '../../Redux/Swap/actions'
import {numberFormate} from '../../Utilities/Util'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import SwapSuccess from '../Modals/SwapModals/SwapSuccess'
import ReactLoading from 'react-loading'

const AdminLp = () => {
  // Redux State
  const dispatch = useDispatch()
  const {
    swapHash,
    swapLoading,
    usdcBNBBalance,
    ccptBNBBalance,
    balanceLoading,
  } = useSelector((state) => state.swap)
  const [price, setPrice] = useState('')
  const [secondPrice, setSecondPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)
  const [swapLoad, setSwapLoad] = useState(false)
  const [errors, setErrors] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const {userAddress} = useSelector((state) => state.profile)

  useEffect(() => {
    if (time === '') {
      setTime(0)
    }
  }, [time])

  useEffect(() => {
    if (swapLoading) {
      setSwapLoad(true)
    } else {
      setSwapLoad(false)
    }
  }, [swapLoading])

  useEffect(() => {
    if (swapHash) {
      setSwapSucc(true)
      setPrice('')
      setSecondPrice('')
    } else {
      setSwapSucc(false)
    }
  }, [swapHash])

  const handlePriceChange = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
    }
  }

  const handlePriceChangeTwo = (e) => {
    const {value} = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setSecondPrice(value)
    }
  }
  const handleTimeChange = (number) => {
    setTime(number.value)
  }

  const makeLiquidity = () => {
    dispatch(addLiquidityTokens(secondPrice, price, time))
  }

  // useEffect(() => {
  //   if (setFirstInp) {
  //     if (price === '') {
  //       setSecondPrice('')
  //     } else {
  //       setSecondPrice(ccptPrice)
  //     }
  //   }
  // }, [price, ccptPrice, setFirstInp])

  // useEffect(() => {
  //   if (setSecondInp) {
  //     if (secondPrice === '') {
  //       setSecondPrice('')
  //     } else {
  //       setSecondPrice(usdcPrice)
  //     }
  //   }
  // }, [secondPrice, usdcPrice, setSecondInp])

  useEffect(() => {
    if (
      price === '' ||
      secondPrice === '' ||
      price === '0' ||
      secondPrice === '0' ||
      usdcBNBBalance === '0' ||
      ccptBNBBalance === '0' ||
      !userAddress ||
      balanceLoading ||
      Number(price) > Number(usdcBNBBalance) ||
      Number(secondPrice) > Number(ccptBNBBalance)
    ) {
      setErrors(true)
    } else {
      setErrors(false)
    }
  }, [
    usdcBNBBalance,
    ccptBNBBalance,
    userAddress,
    price,
    secondPrice,
    balanceLoading,
  ])

  return (
    <>
      <div className='swap'>
        <Container>
          {/* <div className='toggle_buttons'>
            <Link to='/swap'>
              <div className='toggle_wrapper'>
                <h6>Swap</h6>
              </div>
            </Link>
            <Link to='/liquidity'>
              <div className='toggle_wrapper active'>
                <h6>Liquidity</h6>
              </div>
            </Link>
          </div> */}
          <div className='box_wrapper'>
            <div className='box_wrapper_header'>
              <div className='box_wrapper_header_left'>
                <h1>Liquidity</h1>
                <p>Add Liquidity to receive tokens</p>
              </div>
              <div className='box_wrapper_header_right'>
                <RiListSettingsLine onClick={() => setOpenSet(true)} />
                {/* <VscHistory onClick={() => setOpenTrans(true)} /> */}
              </div>
            </div>
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Amount</h4>
                <h4
                  className='d-flex align-items-start'
                  style={{cursor: 'pointer'}}
                  onClick={() => setPrice(usdcBNBBalance)}
                >
                  Balance:{' '}
                  {balanceLoading ? (
                    <ReactLoading
                      type='bars'
                      color='#ffffff'
                      height={0}
                      width={30}
                      className='load'
                    />
                  ) : (
                    numberFormate(usdcBNBBalance)
                  )}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={price}
                    onChange={handlePriceChange}
                  />
                  {/* <NumberFormat
                    disabled={false}
                    thousandsGroupStyle='thousand'
                    value={price}
                    decimalSeparator='.'
                    displayType='input'
                    type='text'
                    thousandSeparator={true}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    allowLeadingZeros={false}
                    decimalScale={4}
                    onValueChange={handlePriceChange}
                    placeholder='0.0000'
                    className='shadow-none form-control'
                  /> */}
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {/* <h4>MAX</h4> */}
                  <Image src={USDC} alt='' />
                  <h4>USDC </h4>
                </div>
              </div>
            </div>

            {/* <div className='box_wrapper_circle'>
              <BsArrowDown />
            </div> */}
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Amount</h4>
                <h4
                  className='d-flex align-items-start'
                  style={{cursor: 'pointer'}}
                  onClick={() => setSecondPrice(ccptBNBBalance)}
                >
                  Balance:{' '}
                  {balanceLoading ? (
                    <ReactLoading
                      type='bars'
                      color='#ffffff'
                      height={0}
                      width={30}
                      className='load'
                    />
                  ) : (
                    numberFormate(ccptBNBBalance)
                  )}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={secondPrice}
                    onChange={handlePriceChangeTwo}
                  />
                  {/* <NumberFormat
                    disabled={false}
                    thousandsGroupStyle='thousand'
                    value={price}
                    decimalSeparator='.'
                    displayType='input'
                    type='text'
                    thousandSeparator={true}
                    allowNegative={false}
                    fixedDecimalScale={true}
                    allowLeadingZeros={false}
                    decimalScale={4}
                    onValueChange={handlePriceChange}
                    placeholder='0.0000'
                    className='shadow-none form-control'
                  /> */}
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {/* <Image src={USDC} alt='' /> */}
                  <h4>CAPL </h4>
                </div>
              </div>
            </div>
            <div className='box_wrapper_button'>
              <button
                className={
                  errors ? 'btn_brand btn_brand_disabled' : 'btn_brand'
                }
                disabled={errors}
                onClick={makeLiquidity}
              >
                Add Liquidity
              </button>
            </div>
          </div>
        </Container>
      </div>
      <RecentTransactions
        show={openTrans}
        handleClose={() => setOpenTrans(false)}
      />
      <SettingsModal
        handleTimeChange={handleTimeChange}
        time={time}
        show={openSet}
        handleClose={() => setOpenSet(false)}
      />
      <SwapLoading show={swapLoad} handleClose={() => setSwapLoad(false)} />
      <SwapSuccess
        show={swapSucc}
        handleClose={() => {
          setSwapSucc(false)
          dispatch(REMOVE_hash())
        }}
      />
    </>
  )
}

export default AdminLp
