import { useRef, useEffect } from "react"
import "./hire-form.css"

function HireForm() {
	const hireRef = useRef<HTMLFormElement>(null)

/*	const HandleOnDelete = (element : HTMLFormElement | null) => {
		if(element !== null) {
			if(element.name instanceof HTMLInputElement) element.name.value = ""

			if(element.email instanceof HTMLInputElement) element.email.value = ""
			
			if(element.comments instanceof HTMLTextareaElement) element.comments.innerText = ""
		}
	}*/

	useEffect(() => {
		const handleSubmit = (e: Event) => {
			e.preventDefault()
			if(e.target !== null) {
				//e.target.comments.innerText = "El formulario es totalmente de prueba, aún no funciona"
				console.log("El formulario es totalmente de prueba, aún no funciona")
			}
		}

		if(hireRef.current !== null) hireRef.current.addEventListener('submit', handleSubmit)

	}, [])

	return(
		<form ref={hireRef} className="hire-form" onSubmit={(e) => e.preventDefault()}>
			<h1>¿Quieres contratarme?</h1>
			<div className="hire-form__inputs">

				<label htmlFor="name">Nombre completo</label>
				<input type="text" name="name" id="name" value=""/>

				<label htmlFor="email">Email de empresa</label>
				<input type="email" name="email" id="email" value=""/>

				<label htmlFor="comments">Comentarios</label>
				<textarea name="comments" id="comments"></textarea>

			</div>
			<div className="hire-form__buttons">
				<button type="submit" className="main">Enviar</button>
				<button className="second" /*onClick={() => HandleOnDelete(hireRef?.current)}*/>Eliminar</button>
			</div>
		</form>
	)
}

export default HireForm