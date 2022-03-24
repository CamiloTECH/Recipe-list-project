import style from "./Createrecipe.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getTypesDiet } from "../../redux/actions"
import { Link } from "react-router-dom"

function CreateRecipe() {
  const diets = useSelector(store => store.types)
  const dispatch = useDispatch()
  const [error, setError] = useState({
    title: null,
    score: null,
    healthScore: null,
    image: null,
    summary: null,
    steps: null,
    diets: null
  })
  const [state, setState] = useState({
    title: "",
    score: 0,
    healthScore: 0,
    image: "",
    summary: "",
    steps: "",
    diets: []

  })

  useEffect(() => {
    if (diets.length === 0) dispatch(getTypesDiet())
    // eslint-disable-next-line
  }, [])

  const handleBlur = (e) => {
    const name = e.target.name
    if (state[name]) {
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
  }

  const validation = (e) => {
    const value = e.target.value
    const name = e.target.name
    switch (name) {
      case "title":
      case "summary":
      case "steps":
        if (value.length > 0) {
          setState({
            ...state,
            [name]: value
          })
        }
        break;
      case "score":
      case "healthScore":
        if (parseInt(value) > 0) {
          setState({
            ...state,
            [name]: parseInt(value)
          })
        }
        break
      case "image":
        const regex = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
        if (regex.test(value)) {
          setState({
            ...state,
            [name]: value
          })
        }
        break
      case "diets":
        const id = e.target.id
        if (state[name].includes(id)) {
          setState({
            ...state,
            [name]: state[name].filter(diet => diet !== id)
          })
        } else {
          setState({
            ...state,
            [name]: state[name].push(id)
          })
        }
        break
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }


  return (
    <form onSubmit={handleSubmit} className={style.form} >
      <h2>Create a new recipe</h2>
      <div className={style.data}>
        <label htmlFor="title">Name</label>
        {error.title
          ? <label className={style.labelError}>Invalid name</label>
          : null
        }
        <input type="text" name="title" id="title" placeholder="Enter the name" autoFocus
          onChange={validation} onBlur={handleBlur}
        />

        <label htmlFor="score">Score</label>
        {error.score
          ? <label className={style.labelError}>Invalid score</label>
          : null
        }
        <input type="number" name="score" id="score" placeholder="Enter the score" onChange={validation}
          onBlur={handleBlur} />

        <label htmlFor="healthScore">Health Score</label>
        {error.healthScore
          ? <label className={style.labelError}>Invalid health score</label>
          : null
        }
        <input type="number" name="healthScore" id="healthScore" placeholder="Enter the health score"
          onChange={validation} onBlur={handleBlur}
        />

        <label htmlFor="image">Image</label>
        {error.image
          ? <label className={style.labelError}>Invalid URL</label>
          : null
        }
        <input type="url" name="image" id="image" placeholder="Enter the image by url"
          onChange={validation} onBlur={handleBlur}
        />
      </div>

      <div className={style.image}>
        <img src={state.image} alt="" />
      </div>

      <div className={style.large}>
        <label htmlFor="summary">Summary</label>
        {error.summary
          ? <label className={style.labelError}>Invalid summary</label>
          : null
        }
        <textarea name="summary" placeholder="Enter the summary" rows={5} onChange={validation}
          onBlur={handleBlur}
        />

        <label htmlFor="steps">Steps</label>
        {error.steps
          ? <label className={style.labelError}>Invalid steps</label>
          : null
        }
        <textarea name="steps" placeholder="Enter the steps" rows={5} onChange={validation}
          onBlur={handleBlur}
        />
      </div>

      <div className={style.diets}>
        <label htmlFor="" className={style.title}>Diets</label>
        {error.diets
          ? <label className={style.labelError}>Invalid diets</label>
          : null
        }
        {
          diets.length > 0 && diets.map(diet => (
            <div className={style.diet} key={diet.id}>
              < input type="checkbox" name="diets" id={diet.id} onChange={validation} />
              <label htmlFor="diets">{diet.name}</label>
            </div>
          ))
        }
      </div>

      <div className={style.buttons}>
        <input type="submit" value="Create" className={error ? style.error : style.submit} disabled={error} />
        <Link to="/home" className={style.link}>Home</Link>
      </div>
    </form>
  );
}

export default CreateRecipe;