import React, { useEffect, useState } from 'react'
import { Container, Image } from 'react-bootstrap'
import { RiListSettingsLine } from 'react-icons/ri'
import { VscHistory } from 'react-icons/vsc'
import { BiChevronDown } from 'react-icons/bi'
import { BsArrowDown } from 'react-icons/bs'
import ReactLoading from 'react-loading'

import { Link } from 'react-router-dom'
import RecentTransactions from '../Modals/RecentTransactions/RecentTransactions'
import SettingsModal from '../Modals/SettingsModal/SettingsModal'
import { useDispatch, useSelector } from 'react-redux'
import {
  convertTokenValue,
  REMOVE_hash,
  swapTokens,
} from '../../Redux/Swap/actions'
import SwapLoading from '../Modals/SwapModals/SwapLoading'
import SwapSuccess from '../Modals/SwapModals/SwapSuccess'

// svgs
import USDC from '../../Assets/money/usdc.svg'
import { numberFormate } from '../../Utilities/Util'

const SwapPool = () => {
  // Redux State
  const dispatch = useDispatch()
  const {
    swapHash,
    swapLoading,
    ccptPrice,
    usdcPrice,
    usdcBNBBalance,
    balanceLoading,
    ccptBNBBalance,
  } = useSelector((state) => state.swap)
  const { userAddress } = useSelector((state) => state.profile)
  const [price, setPrice] = useState('')
  const [secondPrice, setSecondPrice] = useState('')
  const [openTrans, setOpenTrans] = useState(false)
  const [openSet, setOpenSet] = useState(false)
  const [time, setTime] = useState(20)
  const [firstToken, setFirstToken] = useState('USDC')
  const [secondToken, setSecondToken] = useState('CAPL')

  const [swapLoad, setSwapLoad] = useState(false)
  const [swapSucc, setSwapSucc] = useState(false)
  const [errors, setErrors] = useState(false)

  const [firstAvailableForChange, setFirstAvailableForChange] = useState(false)
  const [secondAvailableForChange, setSecondAvailableForChange] =
    useState(false)
  const [toggle, setToggle] = useState(false)

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
    const { value } = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
      dispatch(convertTokenValue(value, firstToken))
      setFirstAvailableForChange(false)
      setSecondAvailableForChange(true)
    }
  }

  const handlePriceChangeTwo = (e) => {
    const { value } = e.target
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setSecondPrice(value)
      dispatch(convertTokenValue(value, secondToken))
      setFirstAvailableForChange(true)
      setSecondAvailableForChange(false)
    }
  }
  const handleTimeChange = (number) => {
    setTime(number.value)
  }
  const toggleTokens = () => {
    setFirstToken(secondToken)
    setSecondToken(firstToken)
    setToggle((prevState) => !prevState)
    setPrice('')
    setSecondPrice('')
  }

  const MaxValue = (value) => {
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setPrice(value)
      dispatch(convertTokenValue(value, firstToken))
      setFirstAvailableForChange(false)
      setSecondAvailableForChange(true)
    }
  }
  const MaxCAPLValue = (value) => {
    const priceRegex = /^[0-9]*\.?[0-9]*$/
    if (value === '') {
      setPrice('')
      setSecondPrice('')
    } else if (priceRegex.test(value)) {
      setSecondPrice(value)
      dispatch(convertTokenValue(value, secondToken))
      setFirstAvailableForChange(true)
      setSecondAvailableForChange(false)
    }
  }

  const makeSwap = () => {
    dispatch(swapTokens(price, toggle ? 'CAPL' : 'USDC', time))
  }

  useEffect(() => {
    if (!toggle) {
      if (
        Number(price) > Number(usdcBNBBalance) ||
        price === '' ||
        parseFloat(price) === 0 ||
        parseFloat(usdcBNBBalance) === 0 ||
        !userAddress ||
        balanceLoading
      ) {
        setErrors(true)
      } else {
        setErrors(false)
      }
    } else if (toggle) {
      if (
        Number(price) > Number(ccptBNBBalance) ||
        balanceLoading ||
        price === '' ||
        parseFloat(price) === 0 ||
        parseFloat(ccptBNBBalance) === 0 ||
        !userAddress
      ) {
        setErrors(true)
      } else {
        setErrors(false)
      }
    }
  }, [toggle, price, ccptBNBBalance, usdcBNBBalance, balanceLoading, userAddress])
  return (
    <>
      <div className='swap'>
        <Container>
          <div className='toggle_buttons'>
            <Link to='/swap'>
              <div className='toggle_wrapper active'>
                <h6>Swap</h6>
              </div>
            </Link>
            <Link to='/liquidity'>
              <div className='toggle_wrapper'>
                <h6>Liquidity</h6>
              </div>
            </Link>
          </div>
          <div className='box_wrapper'>
            <div className='box_wrapper_header'>
              <div className='box_wrapper_header_left'>
                <h1>Swap</h1>
                <p>Instantly swap tokens on Credit Capital</p>
              </div>
              <div className='box_wrapper_header_right'>
                <RiListSettingsLine onClick={() => setOpenSet(true)} />
              </div>
            </div>






            {/* ---------------------------------------------------------------------------------------------------- */}






            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Send</h4>
                <h4
                  className='d-flex align-items-start'
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    MaxValue(
                      firstToken === 'USDC'
                        ? usdcBNBBalance
                        : firstToken === 'CAPL'
                          ? ccptBNBBalance
                          : 0
                    )
                  }
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
                  ) : firstToken === 'USDC' ? (
                    numberFormate(usdcBNBBalance)
                  ) : firstToken === 'CAPL' ? (
                    numberFormate(ccptBNBBalance)
                  ) : null}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={
                      firstAvailableForChange &&
                        (price != '' || secondPrice != '')
                        ? toggle
                          ? ccptPrice
                          : usdcPrice
                        : price
                    }
                    onChange={handlePriceChange}
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {firstToken === 'USDC' && <Image src={USDC} alt='' />}
                  <h4>{firstToken} </h4>
                </div>
              </div>
            </div>

            <div className='box_wrapper_circle' onClick={toggleTokens}>
              <BsArrowDown />
            </div>
            <div className='box_wrapper_container'>
              <div className='box_wrapper_container_top'>
                <h4>Receive (estimated)</h4>
                <h4
                  className='d-flex align-items-start'
                  style={{ cursor: 'pointer' }}
                  onClick={() =>
                    MaxCAPLValue(
                      secondToken === 'CAPL'
                        ? ccptBNBBalance
                        : secondToken === 'USDC'
                          ? usdcBNBBalance
                          : 0
                    )
                  }
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
                  ) : secondToken === 'CAPL' ? (
                    numberFormate(ccptBNBBalance)
                  ) : secondToken === 'USDC' ? (
                    numberFormate(usdcBNBBalance)
                  ) : null}
                </h4>
              </div>
              <div className='box_wrapper_container_bottom'>
                <div className='box_wrapper_container_bottom_left'>
                  <input
                    placeholder='0.0000'
                    className='shadow-none form-control'
                    value={
                      secondAvailableForChange &&
                        (price != '' || secondPrice != '')
                        ? toggle
                          ? usdcPrice
                          : ccptPrice
                        : secondPrice
                    }
                    onChange={handlePriceChangeTwo}
                  />
                </div>
                <div className='box_wrapper_container_bottom_right'>
                  {secondToken === 'USDC' && <Image src={USDC} alt='' />}
                  <h4>{secondToken} </h4>
                </div>
              </div>
            </div>

            <div className='box_wrapper_button'>
              <button
                className={
                  errors ? 'btn_brand btn_brand_disabled' : 'btn_brand'
                }
                disabled={errors}
                onClick={makeSwap}
              >
                Swap
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

export default SwapPool
