import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {

  const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox 
            type="greeting"
            title="Welcome"
            user= {loggedIn?.name || 'Guest'}
            subtext= "Managing your back account and transactions got a whole lot easier!"
          />

          <TotalBalanceBox 
            accounts={[]}
            totalBanks = {1}
            totalCurrentBalance={2500}  
          />
        </header>

        Recent Transactions
      </div>

      <RightSidebar 
        user={loggedIn}
        transaction={[]}
        banks={[{currentBalance: 2500}, {currentBalance: 3750}]}
      />
    </section>
  )
}

export default Home