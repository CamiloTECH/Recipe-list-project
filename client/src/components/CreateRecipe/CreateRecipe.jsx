import style from "./Createrecipe.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTypesDiet, addRecipe, clearUser, cleaningRecipes } from "../../redux/actions"
import { Link, useNavigate } from "react-router-dom"

function CreateRecipe() {
  const navigate = useNavigate()
  const { diets, user } = useSelector(store => {
    return {
      diets: store.types,
      user: store.createUser
    }
  })
  const dispatch = useDispatch()
  const [activeSubmit, setActiveSubmit] = useState(true)
  const [error, setError] = useState({
    title: false,
    score: false,
    healthScore: false,
    image: false,
    summary: false,
    steps: false,
    diets: false
  })
  const [state, setState] = useState({
    title: "",
    score: 0,
    healthScore: 0,
    image: "",
    summary: "",
    steps: "",
    diets: ""
  })

  useEffect(() => {
    if (diets.length === 0) dispatch(getTypesDiet())

    const llaves = Object.keys(state)
    for (const key of llaves) {
      if (state[key] && !error[key]) {
        setActiveSubmit(false)
      }
      else {
        setActiveSubmit(true)
        break
      }
    }
    // eslint-disable-next-line
  }, [state, error])

  useEffect(() => {
    if (user.id) {
      navigate(`/home/details/${user.id}`, { replace: true })
    }
    // eslint-disable-next-line
  }, [user])

  useEffect(() => {
    return () => dispatch(clearUser())
    // eslint-disable-next-line
  }, [])

  const validation = (e) => {
    const value = e.target.value
    const name = e.target.name
    switch (name) {
      case "title":
      case "summary":
      case "steps":
        setState({
          ...state,
          [name]: value
        })
        if (value.length > 0) {
          setError({
            ...error,
            [name]: false
          })
        } else {
          setError({
            ...error,
            [name]: true
          })
        }
        break;
      case "score":
      case "healthScore":
        setState({
          ...state,
          [name]: parseInt(value)
        })
        if (parseInt(value) >= 1 && parseInt(value) <= 100 && !value.includes(".")) {
          setError({
            ...error,
            [name]: false
          })
        } else {
          setError({
            ...error,
            [name]: true
          })
        }
        break
      case "image":
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
        setState({
          ...state,
          [name]: value
        })
        if (regex.test(value)) {
          setError({
            ...error,
            [name]: false
          })
        } else {
          setError({
            ...error,
            [name]: true
          })
        }
        break
      case "diets":
        let id = e.target.id
        id = parseInt(id)
        let newDiets = [...state[name]]
        if (state[name].includes(id)) {
          newDiets = newDiets.filter(diet => diet !== id)

          if (newDiets.length > 0) {
            setState({
              ...state,
              [name]: newDiets
            })
            setError({
              ...error,
              [name]: false
            })
          } else {
            setState({
              ...state,
              [name]: ""
            })
            setError({
              ...error,
              [name]: true
            })
          }

        } else {
          setState({
            ...state,
            [name]: [...state[name], id]
          })
          setError({
            ...error,
            [name]: false
          })
        }
        break
      default:
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(addRecipe(state))
    dispatch(cleaningRecipes())
  }


  return (
    <form onSubmit={handleSubmit} className={style.form} >
      <h2>Create a new recipe</h2>
      <div className={style.data}>
        <div className={style.message}>
          <label htmlFor="title" className={style.name}>Name</label>
          {error.title
            ? <label className={style.labelError}>Invalid | Enter a name</label>
            : null
          }
        </div>
        <input type="text" name="title" id="title" placeholder="Enter the name" autoFocus
          onChange={validation}
          style={error.title ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
        />

        <div className={style.message}>
          <label htmlFor="score" className={style.name}>Score⭐</label>
          {error.score
            ? <label className={style.labelError}>Invalid | Min: 1 - Max: 100</label>
            : null
          }
        </div>
        <input type="number" defaultValue={0} name="score" id="score" placeholder="Enter the score" onChange={validation}
          style={error.score ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
        />

        <div className={style.message}>
          <label htmlFor="healthScore" className={style.name}>HealthScore🌿</label>
          {error.healthScore
            ? <label className={style.labelError}>Invalid | Min:1 - Max:100</label>
            : null
          }
        </div>
        <input type="number" defaultValue={0} name="healthScore" id="healthScore" placeholder="Enter the health score"
          style={error.healthScore ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
          onChange={validation}
        />

        <div className={style.message}>
          <label htmlFor="image" className={style.name}>Image</label>
          {error.image
            ? <label className={style.labelError}>Invalid | Wrong URL</label>
            : null
          }
        </div>
        <input type="url" name="image" id="image" placeholder="Enter the image by url"
          onChange={validation}
          style={error.image ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
        />
      </div>

      <div className={style.image}>
        <img src={state.image} alt="" />
      </div>

      <div className={style.large}>
        <div className={style.message}>
          <label htmlFor="summary" className={style.name}>Summary</label>
          {error.summary
            ? <label className={style.labelError}>Invalid | Enter a summary</label>
            : null
          }
        </div>
        <textarea name="summary" placeholder="Enter the summary" rows={5} onChange={validation}
          style={error.summary ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
        />

        <div className={style.message}>
          <label htmlFor="steps" className={style.name}>Steps</label>
          {error.steps
            ? <label className={style.labelError}>Invalid | Enter the steps</label>
            : null
          }
        </div>
        <textarea name="steps" placeholder="Enter the steps" rows={5} onChange={validation}
          style={error.steps ? { "borderBottomColor": "#E8FF06", "backgroundColor": "#E8FF0638" } : {}}
        />
      </div>

      <div className={style.diets}>
        <div className={style.gridDiet}>
          <label htmlFor="" className={style.name}>Diets</label>
          {error.diets
            ? <label className={style.labelError}>Invalid | Select at least one</label>
            : null
          }
        </div>
        {
          diets.length > 0 && diets.map(diet => (
            <div className={style.diet} key={diet.id}>
              < input type="checkbox" value={diet.id} name="diets" id={diet.id} onChange={validation} />
              <label htmlFor="diets">{diet.name}</label>
            </div>
          ))
        }
      </div>

      <div className={style.buttons}>
        <input type="submit" value="Create" className={activeSubmit ? style.error : style.submit} disabled={activeSubmit} />
        <Link to="/home" className={style.link}>Home</Link>
      </div>
    </form>
  );
}

export default CreateRecipe;