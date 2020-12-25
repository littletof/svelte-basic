<script lang="ts">

    let size = {width: 4, height: 4};
    let hidden: (any[])[] = [];
    let grid: {name: string, value?: any, found?: boolean}[][] = [];
    
    $: opened = grid.map(r => r.filter(i => !!i.value).length).reduceRight((pr, c) => pr+c, 0);
    $: showGrid = grid;
    let canOpen = true;

    for(let y = 0; y < size.height; y++){
        grid.push([]);
        for(let x = 0; x < size.height; x++){
            grid[y].push({name: `${x}-${y}`});
        }   
    }

    const colors = ['#fff', '#e23b3b', '#50fc50', '#2b5fdb', '#000914', '#dd55dd', '#ffff48', '#32d5d5'];

    const set = [...colors, ...colors];
    console.log(set);

    for(let y = 0; y < size.height; y++){
        hidden.push([]);
        for(let x = 0; x < size.height; x++){
            hidden[y].push(set.splice(Math.floor(Math.random()*set.length), 1)[0]);
        }   
    }

    console.log(hidden);

    function itemClick(item, x, y) {
        if(canOpen && !grid[y][x].value && !grid[y][x].found) {
            const cellValue = getItem(x,y);
            grid[y][x].value = cellValue;

            if(grid.map(r => r.filter(i => i.value == cellValue).length).reduceRight((pr, c) => pr+c, 0) === 2) { // TODO or more
                grid.forEach(r => r.forEach(i => {
                    if(i.value == cellValue) {
                        i.found = true;
                    } 
                }));
                setTimeout(() => {
                    grid.forEach(r => r.forEach(i => {
                        if(i.value == cellValue) {
                            i.value = undefined;
                        } 
                    }));
                    grid = grid;
                }, 1000);
            }

            if(opened === 1) {
                canOpen = false;
                setTimeout(() => {
                    canOpen = true;
                    grid.forEach(r => r.forEach(i => i.value = undefined));
                    // grid = grid;
                }, 200);
            }
        }
    }

    function getItem(x: number, y: number) {
        return hidden[y][x];
    }

</script>

<!-- Template -->
<section>

    <div class="grid">
        {#each showGrid as rows, y }
            <div class="row">
                {#each rows as item, x (item.name)}
                    <div class="item" on:click="{() => itemClick(item, x,y)}">
                        {#if !!item.value}
                            <div class="icon" style="background-color: {item.value}">
                            </div>
                        {:else}
                            {#if !item.found}
                                <div class="placeholder">
                                </div>
                            {/if}
                        {/if}
                        
                    </div>
                {/each}
            </div>
        {/each}
    </div>

</section>

<style>
    section {
        margin: 15px;
    }

    .grid {
        width: min-content;
        margin: auto;
        display: flex;
        flex-direction: column;

        background-color: #5a595936;
    }

    .row {
        display: flex;
        flex-direction: row;
    }

    .item {
        --size: calc((100vw - 2rem - 30px - 3*10px)/4);
        width: var(--size);
        height: var(--size);
        max-height: 15vh;
        max-width: 15vh;
    }

    .row:not(:last-child) .item:not(:last-child) {
        margin: 0 10px 10px 0;
    }

    .row:last-child .item {
        margin: 0 10px 0 0;
    }

    .row:last-child .item:last-child {
        margin: 0;
    }

    .icon {
        width: 60%;
        height: 60%;
        border-radius: 90%;
        background-color: red;
        margin: 20%;
    }

    .placeholder {
        background-color: #535361;
        width: 100%;
        height: 100%;
    }

</style>