import { useRef, useEffect } from "react"
import "./hire-form.css"
import { FaCheck, FaTimes } from "react-icons/fa";
import emailjs from '@emailjs/browser';

type HireFormElement = HTMLFormElement & {
	name : HTMLInputElement;
	email : HTMLInputElement;
	comments : HTMLTextAreaElement;
}

function HireForm() {
	const hireRef = useRef<HireFormElement>(null)

	const sendEmail = (form : HireFormElement | null) => {

		if(form) {
			emailjs
			.sendForm('service_k670svs', 'template_jazxkld', form, {
				publicKey: 'rEE4eKF3OH1kpct7r',
			})
			.then(() => {
					console.log('SUCCESS!');
				},
				(error) => {
				console.log('FAILED...', error.text);
				},
			);
		}
	}

	const HandleOnDelete = (element : HireFormElement | null) => {
		if(element) {
			element.name.value = ""
			element.email.value = ""
			element.comments.value = ""
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
			<span className="hire-form__succcess "><FaCheck/></span>
			<span className="hire-form__error "><FaTimes/></span>
		</form>
	)
}

export default HireForm