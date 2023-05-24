import './homepage.css'
import { Outlet, Link } from "react-router-dom"
function HomePage(){
    return(
        <div className="home-page">
           <div className='home-page-details'>
            <div className='title'>
                <h1>Tip World</h1>
                <h3> Global Tipping Guide</h3>
            </div>
           </div>
           <div className="options">
            <div className='cube-info'>hello</div>
            <div className='cube-info'>hellohello</div>
                
            </div>
           
        </div>
    )
}
export default HomePage