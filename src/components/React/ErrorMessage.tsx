import { useEffect, useRef } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";

type ErrorMessageProps = {
	title?: string;
	children: string;
	isDisplay : boolean;
}

function ErrorMessage({title, isDisplay, children} : ErrorMessageProps) {
	const errorComponentRef = useRef<HTMLElement>(null)

	const handleOnAppear = (elemRef : HTMLElement, add : boolean) => {
		if(add) elemRef.classList.add("hire-form__error--show")
		else elemRef.classList.remove("hire-form__error--show")
	}

	useEffect(() => {
		if(errorComponentRef.current) handleOnAppear(errorComponentRef.current, isDisplay)
	}, [isDisplay])

	return(
		<section ref={errorComponentRef} className="hire-form__error center">
			<span className="circle centered-items">
				<FaTimes/>
			</span>
			<article className="hire-form__error__article">
				<h3>{title}</h3>
				<p>{children}</p>
			</article>
		</section>
	)
}

export default ErrorMessage