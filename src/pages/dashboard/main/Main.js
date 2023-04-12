import {useEffect} from 'react'

function Main({setSelectedLink, link}) {
  useEffect(() => {
    setSelectedLink(link)
  }, [])

  return <div>Main</div>
}

export default Main
