import { Link } from "react-router-dom"


const NotFound = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'gray' }}>
      <div style={{ textAlign: 'center', lineHeight: '100vh' }}>
        Page NotFound...
        <Link to="/">
          ホームへ
        </Link>
      </div>
    </div>
    )

}


export default NotFound;
