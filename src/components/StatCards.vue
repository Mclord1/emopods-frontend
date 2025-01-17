<template>
    <div :class="columnClass">
        <div v-if="textHeader" class="mt-30">
            <div>
                <h2>Hello {{ textHeader }}</h2>
                <p>How are you today?</p>
            </div>
        </div>

        <div class="card-box stats-card" :class="bgColor" v-else>
            <div class="stat-card-item">
                <p class="stat-card-header">{{ statCardText1 }}</p>
                <h2 class="stat-card-body">
                    <span data-plugin="counterup">
                        {{ statsCardNumber1 }}
                    </span>
                </h2>
            </div>

            <div class="loader-container">
                <div class="linear-loader" v-if="loading">
                    <div class="train"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        statCardText1: {
            type: String,
            default: 'Stats Card Text'
        },
        statsCardNumber1: {
            type: [Number, String],
            default: 0
        },
        columnClass: {
            type: String,
            default: 'col-lg-3 col-md-3 col-sm-12'
        },
        loading: Boolean,
        bgColor: String,
        textHeader: String,
    }
};
</script>

<style scoped>
.stats-card {
    border-radius: 10px;
    background-color: var(--v-primary-alert-warning);
}

.green {
    background-color: var(--v-primary-alert-success);
}

.purple {
    background-color: var(--v-primary-alert-purple);
}

.red {
    background-color: var(--v-primary-alert-danger);
}

.linear-loader {
    height: 4px;
    /* Adjust the height as needed */
    background-color: #1D871D;
    /* Adjust the color as needed */
    flex-grow: 1;
    position: absolute;
    top: 1px;
    left: 14px;
    right: 14px;
    overflow: hidden;
    /* animation: moveRight 1s linear infinite; Adjust the animation speed as needed */
    z-index: 9999; /* Ensure it's on top of other elements */
}

.train {
    width: 900px;
    /* Adjust the train's width */
    height: 4px;
    /* Should match the height of the loader */
    background-color: #EEFBEE;
    /* Adjust the color as needed */
    position: absolute;
    animation: moveRight 1s linear infinite;
    /* Adjust the animation speed as needed */
    top: 0;
    left: 0;
}

@keyframes moveRight {
    0% {
        left: -50px;
        /* Start off the screen to the left */
    }

    100% {
        left: 100%;
        /* Move to the right of the screen */
    }
}

.loader-container {
    display: flex;
}

.stat-card-header {
    font-size: 14px;
    margin-bottom: 0;
    color: var(--font-color-body);
}

.stat-card-body {
    font-size: 32px;
    margin-top: 0;
    font-family: 'Graphik Medium', 'Arial', sans-serif;
    color: var(--font-color-body);
}

.stat-card-item {
    margin-bottom: 32px;
}

.card-box {
    margin-bottom: 16px;
}
</style>