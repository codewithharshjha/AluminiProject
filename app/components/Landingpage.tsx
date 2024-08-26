import React from 'react'
import { LampDemo } from './Lampdemo'

import { InfiniteMovingCardsDemo } from './InfiniteMovingCardsDemo'
import { StickyScrollRevealDemo } from './StickyScrollRevealDemo'
import { FocusCardsDemo } from './FocusCardDemo'
import { BentoGridDemo } from './BentoGridDemo'

function Landingpage() {
  return (
    <div className='bg-black'>
<LampDemo/>
<InfiniteMovingCardsDemo/>
<StickyScrollRevealDemo/>
<h1 className=' text-4xl font-bold text-white p-5 m-10 text-center'>Our Alumini</h1>
<FocusCardsDemo/>
{/* <BentoGridDemo/> */}
    </div>
  )
}

export default Landingpage
