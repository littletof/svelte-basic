import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world',
		test: ['alma', 'körte', 'kutya', 'macska']
	}
});

export default app;