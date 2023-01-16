import React, {useEffect, useState} from 'react'
import metamask from '../assets/metamask.svg';
import { ethers } from "ethers";

const Wallet = () => {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState('')
  const [balance, setBalance] = useState('')
  const [ngrBalance, setNgrBalance] = useState('')
  
  const truncate = (str, length) => {
    return str.length > length
      ? str.slice(0, length) + '...'
      : str;
  }

  const currencyFormat = (num)=> {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }
  
  useEffect(() => {
    const chainId =  window.ethereum.request({ method: 'eth_chainId'});
    if(chainId !== '0x9b75') {
      setIsConnected(false);
    }
    window.ethereum.request({
      method:'eth_getBalance', 
      params: [address, 'latest']
    }).then(balance => {
      setBalance(balance)
      setNgrBalance(ethers.utils.formatEther(balance))
    })
  }, [])

    const connectWallet = async () => {
      if(window.ethereum) {
        const accounts = await window.ethereum.request({method:'eth_requestAccounts'})
        const chainId = await window.ethereum.request({ method: 'eth_chainId'});
        // Check if user is connected to Mainnet
        if(chainId !== '0x9b75') {
          setIsConnected(false)
        } else {
          let wallet = accounts[0];
          setAddress(wallet);
          setIsConnected(true);
        }
      }
  }

  return (
    <div className='wallet-connect-container'>
      {
        !isConnected && !address ? (
          <>
            <img className='mm-logo' src={metamask} alt='metamask' />
            <button className='connect-btn' onClick={connectWallet}>Connect wallet</button>
          </>
        )
        : 
        <div className='in-walllet-container'>
          <div className='in-wallet-header-bar'>
            <p>Energi Network</p>
            <p style={{color: 'green', marginRight: "50px"}}>&#x2022; Connected</p>
          </div>
          <div className='in-wallet-second-bar'>
            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <img className='mm-logo' src={metamask} alt='metamask' style={{width: '30px', height: '30px'}}/>
              <p style={{marginLeft: '10px'}}>{truncate(address, 20)}</p>
            </div>
          </div>
          <div className='main-body-wallet'>
              <h2>Total Balance</h2>
              <h3 style={{colore: '#5A678A'}}>NGR {ngrBalance}</h3>
              <>{balance ? currencyFormat(parseInt(balance)/ Math.pow(10, 18)) : '$0'}</>
          </div>
        </div>
      }
    </div>
  )
}

export default Wallet
