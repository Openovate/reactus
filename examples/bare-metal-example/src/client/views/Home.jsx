import React from 'react'
import Link from  'bare_metal/bare_components/Link.jsx'

export default function Home(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <ul>
        <li><Link history={props.history} to="/">Home</Link></li>
        <li><Link history={props.history} to="/product/1">Product 1</Link></li>
        <li><Link history={props.history} to="/product/2">Product 2</Link></li>
      </ul>
    </div>
  )
}

Home.getInitialProps = async function getInitialProps() {
  const response = await fetch('http://localhost:3000/api/home')
  return await response.json() || {}
}
