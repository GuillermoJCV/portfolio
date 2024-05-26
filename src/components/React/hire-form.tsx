import { useRef, useEffect } from "react"
import "./hire-form.css"

type HireFormElement = HTMLFormElement & {
	name : HTMLInputElement;
	email : HTMLInputElement;
	comments : HTMLTextAreaElement;
}

function HireForm() {
	const hireRef = useRef<HireFormElement>(null)

	const HandleOnDelete = (element : HireFormElement | null) => {
		if(element) {
			element.name ? element.name.value = "" : console.log("name ins't an instance of HTMLInputElement")

			element.email ? element.email.value = "" : console.log("email ins't an instance of HTMLInputElement")

			element.comments ? element.comments.value = "" : console.log("comments ins't an instance of HTMLTextAreaElement")

		}
	}

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault()
		if(e.target !== null) {
			const form : HireFormElement = e.target as HireFormElement
			form.comments.value = 'Este formulario aún es de prueba; por favor,\nintente contactarme por ahora por mi correo\nmemo92975@gmail.com'
		}
	}

	useEffect(() => {
		const hireFormulary : HireFormElement | null = hireRef.current

		if(hireFormulary) hireFormulary.addEventListener('submit', (e) => handleSubmit(e))

		return () => {
			if(hireFormulary) hireFormulary.addEventListener('submit', (e) => handleSubmit(e))
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

				<label htmlFor="comments">Comentarios</label>
				<textarea name="comments" id="comments"></textarea>

			</div>
			<div className="hire-form__buttons">
				<button type="submit" className="main">Enviar</button>
				<button type="button" className="second" onClick={() => HandleOnDelete(hireRef.current)}>Eliminar</button>
			</div>
		</form>
	)
}

export default HireForm