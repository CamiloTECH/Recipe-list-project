import style from "./LandingPage.module.css"
import { Link } from "react-router-dom"

export default function LandingPage() {
   return (
      <div>
         <div className={style.font}>
            <Link to="/home" className={style.boton}>Start</Link>
         </div>
      </div >
   )
}
