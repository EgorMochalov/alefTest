<template>
    <div class="container">
        <div class="content">
            <h3 class="title">Персональные данные</h3>
            <span class="prew-text" v-if="data.name && data.age">{{ data.name }}, {{  plural(data.age) }}</span>
            <p v-else>Данные не заполнены</p>
        </div>
        <div class="content">
            <h3 class="title">Дети</h3>
            <ul class="prew-list" v-if="data.child.length">
                <li class="prew-item" v-for="child in data.child" :key="child.id">{{ child.name }}, {{ plural(child.age) }}</li>
            </ul>
            <p v-else>Детей нет</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PrewievPage',
    data() {
        return {
            data: {},
            declension : ['год', 'года', 'лет']
        }
    },
    created() {
        this.data = this.$store.state.data
    },
    methods: {
        plural(number) {
            let cases = [2, 0, 1, 1, 1, 2];
            return number+" "+this.declension[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.prew-text {
    text-align: start;
    color: #111;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}

.prew-list {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
}

.prew-item {
    padding: 10px 20px;
    background-color: #F1F1F1;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
}
</style>