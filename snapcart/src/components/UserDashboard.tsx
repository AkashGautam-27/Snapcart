import React from 'react'
import HeroSection from './HeroSection'
import CategorySlider from './CategorySlider'
import connectDb from '../lib/db'
import Grocery, { IGrocery } from '../models/grocery.model'
import GroceryCard from './GroceryCard'

async function UserDashboard({groceryList}:{groceryList:IGrocery[]}) {
  await connectDb()

    const planeGrocery = JSON.parse(JSON.stringify(groceryList))

  
  return (
    <>
      <HeroSection/>
      <CategorySlider/>
     <div className='w-[90%] md:w-[80%] mx-auto mt-10'>
      <h2 className='text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center'>Grocery Items</h2>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6'>
         {planeGrocery.map((item:any,index:number)=>{
        return <GroceryCard key={index} item={item}/>
      })}
      </div>
     </div>
    </>
  )
}

export default UserDashboard
