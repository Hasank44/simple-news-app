import React from 'react'
import News from '../News/News'

const Home = ({ category }) => {

  return (
    <section>
      <News country={'us'} category={category}/>
    </section>
  )
}

export default Home