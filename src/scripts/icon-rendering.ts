const hobbies : HtmlElement = document.querySelector("details.hobbies")
const skills : HtmlElement = document.querySelector("details.skills")
const icon : HtmlSpanElement = document.querySelector("react-icon.icon")

const handleOnClick = async () => {
	const width : number = window.innerWidth
	if((hobbies.open || skills.open) && width > 810) {
		icon.classList.remove("hide")
	} else {
		icon.classList.add("hide")
	}
}
hobbies.addEventListener('click', handleOnClick)
skills.addEventListener('click', handleOnClick)