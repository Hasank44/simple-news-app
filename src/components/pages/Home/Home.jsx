import React from 'react'
import News from '../News/News'

const Home = ({ category, news, setNews }) => {

  return (
    <section>
      <News country={'us'} category={category} news={news} setNews={setNews} />
    </section>
  )
}

export default Home