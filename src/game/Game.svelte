<script lang="ts">
    import Level from './Level.svelte';


    let gameStarted: boolean;
</script>

<style>

section {
    height: 100%;
    background-color: #20242f;
    color: white;
    padding: 1rem;
    display: flex;
    flex-direction: column;
}

.start {
    margin: auto;
}

</style>

<!-- Template -->
<section>
    Level 1

    {#if !gameStarted}
        <div class="start">
            <button on:click="{() => gameStarted = true}">Start Game</button>
        </div>
    {:else}
        <div>
            <Level/>

            <button on:click="{() => gameStarted = false}">Exit</button>
        </div>
    {/if}

    

</section>