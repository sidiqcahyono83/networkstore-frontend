import { Accordion } from "flowbite-react";

export function Component() {
	return (
		<Accordion>
			<Accordion.Panel>
				<Accordion.Title>What is Flowbite?</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Flowbite is an open-source library of interactive
						components built on top of Tailwind CSS including
						buttons, dropdowns, modals, navbars, and more.
					</p>
					<p className="text-gray-500 dark:text-gray-400">
						Check out this guide to learn how to&nbsp;
						<a
							href="https://flowbite.com/docs/getting-started/introduction/"
							className="text-cyan-600 hover:underline dark:text-cyan-500"
						>
							get started&nbsp;
						</a>
						and start developing websites even faster with
						components on top of Tailwind CSS.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
			<Accordion.Panel>
				<Accordion.Title>
					Is there a Figma file available?
				</Accordion.Title>
				<Accordion.Content>
					<p className="mb-2 text-gray-500 dark:text-gray-400">
						Flowbite is first conceptualized and designed using the
						Figma software so everything you see in the library has
						a design equivalent in our Figma file.
					</p>
					<p className="text-gray-500 dark:text-gray-400">
						Check out the
						<a
							href="https://flowbite.com/figma/"
							className="text-cyan-600 hover:underline dark:text-cyan-500"
						>
							Figma design system
						</a>
						based on the utility classes from Tailwind CSS and
						components from Flowbite.
					</p>
				</Accordion.Content>
			</Accordion.Panel>
		</Accordion>
	);
}
