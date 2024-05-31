import { useRef, useEffect, useState } from "react"
import "./hire-form.css"
import { FaCheck } from "react-icons/fa";
import emailjs from '@emailjs/browser';

import ErrorMessage from "./ErrorMessage.tsx"

type HireFormElement = HTMLFormElement & {
	name : HTMLInputElement;
	email : HTMLInputElement;
	comments : HTMLTextAreaElement;
}
type FormValues = Record<string, string> & {
	"name" : string;
	"email" : string;
	"comments" : string;
}

const throttle = 0 /* 60000*60 */
const options = {
  publicKey: 'rEE4eKF3OH1kpct7r',
  blockHeadless: true,
  limitRate: {
    id: 'app',
    throttle: throttle,
  },
}

function HireForm() {
	const [errorMessage, setErrorMessage] = useState<string>("")
	const [isError, setIsError] = useState<boolean>(false)
	const hireRef = useRef<HireFormElement>(null)
	const onSuccessRef = useRef<HTMLSpanElement>(null)
	const onErrorRef = useRef<HTMLSpanElement>(null)

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault()
		if(e.target !== null) {
			const form : HireFormElement = e.target as HireFormElement
			const name : string = form.name.value
			const email : string = form.email.value
			const comments : string = form.comments.value

			sendEmail(form, onSuccessRef.current, onErrorRef.current, setIsError, setErrorMessage, {
				"name": name,
				"email": email,
				"comments": comments,
			})
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
				<input type="text" name="name" id="name" required={true}/>

				<label htmlFor="email">Email de empresa</label>
				<input type="email" name="email" id="email" required={true}/>

				<label htmlFor="comments">Comentarios</label>
				<textarea name="comments" id="comments" minLength={50} required={true}></textarea>

			</div>
			<div className="hire-form__buttons">
				<button type="submit" className="main">Enviar</button>
				<button type="button" className="second" onClick={() => HandleOnDelete(hireRef.current)}>Eliminar</button>
			</div>
			<span ref={onSuccessRef} className="hire-form__succcess circle center centered-items"><FaCheck/></span>
			<ErrorMessage title="Error" isDisplay={isError}>{errorMessage}</ErrorMessage>
		</form>
	)
}

export default HireForm

const HandleOnDelete = (element : HireFormElement | null) => {
	if(element) {
		element.name.value = ""
		element.email.value = ""
		element.comments.value = ""
	}
}

const sendEmail = async (form : HireFormElement, successIcon : HTMLSpanElement | null, errorIcon : HTMLSpanElement | null, setIsError : Function, setErrorMessage : Function, values : FormValues) => {
	const isFilled : boolean = Boolean(values.name && values.email && values.comments)

	if(form && isFilled) {
		emailjs
		.sendForm('service_k670svs', 'template_jazxkld', form, options)
		.then(() => {
				successIcon && successIcon.classList.add("hire-form__succcess--show")
				setTimeout(() => {
					successIcon && successIcon.classList.remove("hire-form__succcess--show")
				}, 500)
			},
			(error) => {
				console.log(error)
				setErrorMessage(error.text)
				setIsError(true)
				setTimeout(() => {
					setIsError(false)
				}, 1500)
			},
		)
	}
}