<script lang="ts">
	if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js');
    }

	import Test from './Test.svelte';
	import Game from './game/Game.svelte';
	export let name: string;
	export let test: string[];
	let checked: boolean;

	$: {
		console.log("Ez lényegében egy listener", checked);
	}

	$: {
		console.error('ez is figyel');
	}

	$: {
		console.warn('ez is figyel', checked);
	}

	$: createdName = `${checked} + added`;

	export function change (v) {
		checked = v.target.checked;
	}
</script>

<main>
	{#if false}
		<h1>Hello {name}!</h1>
		<span>{createdName}</span>

		<ul>
			{#each test as r}
				<li>{r}</li>
			{/each}
		</ul>

		<div>
			<input type="checkbox" id="scales" name="scales" on:change={change}>
			<label for="scales">CHECK ME!</label>
		</div>

		{#if checked}
			<div>
				TEST

				<button on:click={console.log}>
					teste
				</button>
			</div>
		{/if}

		<Test/>
	{:else}
		<Game/>
	{/if}
</main>

<style>

</style>