import React, {useEffect, useState} from 'react'
import {Image, Modal} from 'react-bootstrap'
import {CgClose} from 'react-icons/cg'

// image
import MetaMaskFox from '../../Assets/MetaMask.svg'

// redux imports
import {useDispatch} from 'react-redux'
import {connToMetaMask, connToCoinbase} from '../../Redux/Profile/actions'
import MetaMaskNotFound from './MetaMaskNotFound'

import Coinbase_wallet from '../../Assets/coinbase_Wallet.svg'
import getContracts from '../../Redux/Blockchain/contracts'
import {useSelector} from 'react-redux'

const Wallets = ({show, handleClose}) => {
  const [meatMaskShow, setMeatMaskShow] = useState(false)
  const dispatch = useDispatch()
  const {walletType} = useSelector((state) => state.profile)

  const connectToMetaMask = () => {
    if (typeof window.ethereum !== 'undefined') {
      dispatch(connToMetaMask())
    } else {
      openMetaMaskModal()
    }
  }

  //   Connecting to Coinbase
  const connectToCoinbase = () => {
    dispatch(connToCoinbase())
    handleClose()
  }

  //  MetaMAsk PopUP
  const closeMetaMaskModal = () => {
    setMeatMaskShow(false)
  }
  const openMetaMaskModal = (e) => {
    setMeatMaskShow(true)
    handleClose()
  }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', () => {
        dispatch(connToMetaMask())
      })
    }
  }, [])

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('chainChanged', () => {
        window.location.reload()
      })
    }
  }, [])

  // useEffect(() => {
  //   const checkIt = async () => {
  //     const {web3} = getContracts(walletType)
  //     if (typeof window.ethereum !== 'undefined') {
  //       // dispatch(connToMetaMask())
  //       const accounts = await web3.eth.getAccounts()
  //       if (accounts[0]) {
  //         dispatch(connToMetaMask())
  //       }
  //     }
  //   }
  //   checkIt()
  // }, [])

  return (
    <>
      <Modal
        className='buy__token__modal successModal wallets'
        show={show}
        onHide={handleClose}
      >
        <div className='buy__cpt__modal'>
          <div className='buy__cpt__header'>
            <div className='buy__cpt__header__tile'>
              <h4>Connect To a Wallet</h4>
            </div>
            <div className='buy__cpt__header__close' onClick={handleClose}>
              <CgClose />
            </div>
          </div>
          <div className='success__body'>
            <div className='wallet' onClick={connectToMetaMask}>
              <h5>MetaMask</h5>
              <Image src={MetaMaskFox} alt='' />
            </div>
            <div className='wallet' onClick={connectToCoinbase}>
              <h5>Coinbase</h5>
              <Image src={Coinbase_wallet} alt='' />
            </div>
          </div>
        </div>
      </Modal>
      <MetaMaskNotFound show={meatMaskShow} handleClose={closeMetaMaskModal} />
    </>
  )
}

export default Wallets
