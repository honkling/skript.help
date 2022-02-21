import { useEffect, useState } from "react";
import Article from "./article";

export default function Sidebar() {
	const [state, setState] = useState({
		articles: null,
	});

	useEffect(async () => {
		const request = await fetch("/api/fetch");
		const articles = await request.json();
		setState({
			articles,
		});
	}, []);

	const mapArticles = (articles, path) => {
		const mappedArticles = [];

		const properCase = (raw) => {
			const chunks = raw.split(" ");
			const toBeConcatenated = [];
			for(const chunk of chunks)
				toBeConcatenated.push(chunk.charAt(0).toUpperCase() + chunk.slice(1).toLowerCase());
			return toBeConcatenated.join(" ");
		}

		const mapArticle = (slug, href) => {
			return (
				<Article label={properCase(slug.replace(/-+/g, " "))} href={href.replace(/\.mdx?$/, "")}></Article>
			);
		}

		for(const articlesKey of Object.keys(articles)) {
			const articlesList = articles[articlesKey];
			const newPath = `${path}/${articlesKey === "_directoryRoot" ? "" : articlesKey}`;
			if(Array.isArray(articlesList))
				for(const article of articlesList) {
					const articleRename = article.replace(/\.mdx$/, "");
					mappedArticles.push(mapArticle(articleRename, `${newPath}/${articleRename}`));
				}
			else {
				const premappedArticles = mapArticles(articlesList, newPath);
				if(articlesKey === "_directoryRoot")
					mappedArticles.push(premappedArticles);
				else
					mappedArticles.push(<Article label={properCase(articlesKey.replace(/-+/g, " "))}>
						{premappedArticles}
					</Article>);
			}
		}

		return mappedArticles;
	}

	return (
		<div className="fixed left-0 top-0 w-48 h-screen bg-gray-700">
    		{mapArticles(state.articles ? state.articles.files : {}, "/")}
    	</div>
	);
}