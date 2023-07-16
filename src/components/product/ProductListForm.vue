<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="12" xs="12" md="3" lg="3" xl="3">
                <div class="product">
                    <router-link :to="{ 
                            name: 'ProductReadPage', 
                            params: { id: product.id }}">
                    <v-img 
                    :src="product.mainImageName ? getImage(product.mainImageName) : ''"
                    aspect-ratio="0.8"
                    />
                    </router-link>

                    <div class="productCategory"><Strong>{{ product.category }}</Strong></div>
                    <div class="productName">
                        <router-link :to="{ 
                            name: 'ProductReadPage', 
                            params: { id: product.id }}">
                            <p>{{ product.productName }}</p>
                        </router-link>
                    </div>
                    <div class="productprice">{{ product.minOptionPrice }}원</div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {
        products: {
            type: Array,
        },
    },
    data () {
        return {
            s3: null,
        }
    },
    methods: {
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
    },
    async mounted(){
        await this.getImage()
    },
}
</script>

<style scoped>
@import "../../assets/styles/fonts.css";
.product {
    padding-top: 60px;
}
.productName {
    padding-top: 10px;
    font-family: 'GmarketSans';
    font-weight: 200;
}
.productName p {
    font-family: 'GmarketSans';
    font-weight: 400;
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
    color: black;
    margin-bottom: 0;
}
.productprice {
    padding-top: 4px;
    font-family: 'GmarketSans';
    font-weight: 200;
}
.productCategory {
    padding-top: 10px;
    font-size: 16px;
}
.productCategory Strong {
    text-align: center;
    color: rgb(167, 167, 167);
    font-family: 'SUIT-Regular';
    font-weight: 100;
}
</style>