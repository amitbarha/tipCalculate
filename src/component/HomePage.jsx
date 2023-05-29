import './homepage.css'
import { Outlet, Link } from "react-router-dom"
function HomePage() {
    return (
        <div className="home-page">
            <div className='home-page-details'>
                <div className='title'>
                    <h1>Tip World</h1>
                    <h3> Global Tipping Guide</h3>
                </div>
            </div>
            <div className="options">
                <div className='cube-info'>
                    <h1 className='title-cube'>Tip Calculator</h1>
                    <p className='paragraph'>Calculate your tip based on your country and dining experience. Our <span class="mark">tip calculator</span> takes into account different tipping customs and practices from around the world, ensuring that you can accurately determine an appropriate gratuity amount. Additionally, we understand that the quality of your dining experience is not solely determined by the food but also by the <span className="mark">exceptional service, exquisite taste, and captivating atmosphere</span> at the restaurant.</p>
                    <div className='link-button-design'>
                        <Link to={'/tipForm'} className="cta">
                            <span>Let's calculate!</span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </Link>
                    </div>

                </div>
                <div className='cube-info'>
                    <h1 className='title-cube'>Tip guide </h1>
                    <p class="paragraph">Discover the fascinating <span className="mark">food culture</span> of different countries around the world. Enter the name of a country and explore its <span className="mark">culinary delights</span>, including traditional dishes, dining customs, and more. Get insights on expected tipping practices and find <span className="mark">recommended restaurants</span> for an authentic experience.</p>
                    <div className='link-button-design'>
                        <Link to={'/tipForm'} className="cta">
                            <span>Ready excursion</span>
                            <svg viewBox="0 0 13 10" height="10px" width="15px">
                                <path d="M1,5 L11,5"></path>
                                <polyline points="8 1 12 5 8 9"></polyline>
                            </svg>
                        </Link>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default HomePage