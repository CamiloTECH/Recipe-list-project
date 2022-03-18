import Cards from "../Cards/Cards";
import style from "./Home.module.css"


function Home() {
    return ( 
        <div className={style.home}>
            <Cards/>
        </div>
     );
}

export default Home;