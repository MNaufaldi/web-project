import { Link } from "react-router-dom"

const Navbar = () => {
    return (
        <div>
            <div className="ui left fluid vertical menu vertical-menu" >
                <div className="item acc">
                    Acc info
                </div>
                <Link to='/' className="item">Home</Link>
                <a className="item">
                    Schedule / Calendar (Undecided)
                </a>
                
                <Link to='/score' className="item">Scores</Link>

            </div>
        </div>
    )
}

export default Navbar
