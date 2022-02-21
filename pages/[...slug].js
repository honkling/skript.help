import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";

export default function Slug() {
	const router = useRouter();
	const { slug } = router.query;
	const [state, setState] = useState({ content: "" });

	useEffect(async () => {
		if(!router.isReady) return;
		const request = await fetch(`/api/fetch/${slug.join("/")}.mdx`);
		const { content } = await request.json();
		setState({
			content,
		});
	}, [router.isReady]);

	return (
		<main>
			<ReactMarkdown
				remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
			 	components={{
					h1({ level, children, ...props }) {
						return <b><h1 className="text-3xl" {...props}>{children}</h1></b>;
					},
					h2({ level, children, ...props }) {
						return <b><h2 className="text-2xl" {...props}>{children}</h2></b>;
					},
					h3({ level, children, ...props }) {
						return <b><h3 className="text-xl" {...props}>{children}</h3></b>;
					},
					h4({ level, children, ...props }) {
						return <b><h4 className="text-lg" {...props}>{children}</h4></b>;
					},
					h5({ level, children, ...props}) {
						return <b><h5 className="text-md" {...props}>{children}</h5></b>;
					},
					h6({ level, children, ...props}) {
						return <b><h6 className="text-sm" {...props}>{children}</h6></b>
					},
					code({ children, inline, className, ...props }) {
						return !inline ? (
							<code className="my-2 bg-gray-800 text-gray-400 w-[80vw] h-auto py-1 px-1 rounded-lg block" {...props}>
								{children}
							</code>
						) : (
							<code className="bg-gray-800 text-gray-400 w-auto h-auto py-1 px-1 rounded-lg" {...props}>
								{children}
							</code>
						);
					},
					ul({ depth, ordered, className, children, ...props }) {
						return <ul className="list-disc list-outside" {...props}>{children}</ul>;
					},
					ol({ _depth, _ordered, children, ...props }) {
						return <ol className="list-disc list-outside" {...props}>{children}</ol>;
					},
					li({ index, ordered, children, className, ...props }) {
						return <li {...props}>{children}</li>;
					},
					hr({ ...props }) {
						return <><hr {...props}></hr><br /></>;
					},
					blockquote({ children, ...props }) {
						return <blockquote {...props}><p>{children}</p></blockquote>;
					}
				 }}
				>{state.content}
			</ReactMarkdown>
		</main>
	);
}