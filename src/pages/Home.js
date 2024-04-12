import {Link} from "react-router-dom"

export const Home=()=>{
    <div   style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"column",
        gap:"20px",

      }}>
        <h1>Welcome to the best website</h1>
        <p><Link to="/Recipe" >Recipe</Link>Recipe</p>
    </div>
}