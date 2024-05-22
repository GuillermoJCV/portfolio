import { useRef, useEffect } from "react"
import "./hire-form.css"

function HireForm() {
	const hireRef = useRef()

	useEffect(() => {
		const handleSubmit = (elem) => {
			console.log(elem.name)
		}

		hireRef.current.addEventListener('click', () => handleSubmit(hireRef.current))

		return () => {
			hireRef.current.removeEventListener('click', () => handleSubmit(hireRef.current))
		}

	}, [])

	return(
		<form ref={hireRef} className="hire-form" onSubmit={(e) => e.preventDefault()}>
			<h1>¿Quieres contratarme?</h1>
			<div className="hire-form__inputs">
				<label htmlFor="name">Nombre completo</label>
				<input type="text" name="name" id="name"/>
				<label htmlFor="email">Email de empresa</label>
				<input type="email" name="email" id="email"/>
				<label htmlFor="comments">
					
				</label>
			</div>
			<div className="hire-form__buttons">
				<button type="submit" className="main">Enviar</button>
				<button className="second">Eliminar</button>
			</div>
		</form>
	)
}

export default HireForm