import ExpandMore from "@material-ui/icons/ExpandMore";
import { useState } from "react";

export default function Article({ label, href, children }) {
	const [state, setState] = useState({
		expanded: false,
	});

	const handleArrowClick = () => {
		const inverseState = !state.expanded;
		setState({
			expanded: inverseState,
		});
	};

	const handleArticleClick = () => {
		if(href)
			document.location.pathname = href;
	}

	return (
		<div>
			<div className={`hover:bg-gray-800 hover:bg-opacity-30 rounded-lg duration-150 w-54 h-auto my-1 mx-2 mt-1 flex flex-row items-center`}>
				<h1 className={`mx-1 text-xl ${href ? "cursor-pointer" : ""}`} onClick={handleArticleClick}>
					{label}
				</h1>
				<div className={`ml-auto ${children ? "" : "hidden"} cursor-pointer`} onClick={handleArrowClick}>
					<ExpandMore />
				</div>
			</div>
			<div className={`${state.expanded ? "h-auto" : "hidden"} flex flex-col ml-4`}>
				{children}
			</div>
		</div>
	);
}