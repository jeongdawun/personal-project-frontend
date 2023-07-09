<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product.id" cols="12" sm="12" xs="12" md="3" lg="3" xl="3">
                <div class="product">
                    <v-img 
                    :src="product.mainImageName ? getImage(product.mainImageName) : ''"
                    aspect-ratio="0.8" />
                    <div class="productCategory"><Strong>{{ product.category }}</Strong></div>
                    <div class="productName">
                        <a :href="`/ProductReadPage/${product.id}`">
                            <Strong>{{ product.productName }}</Strong>
                        </a>
                    </div>
                    <div class="productprice">{{ product.minOptionPrice }}원</div>
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import AWS from 'aws-sdk'

export default {
    props: {
        products: {
            type: Array,
        },
    },
    data () {
        return {
            awsBucketName: 'vue-s3-test-3737',
            awsBucketRegion: 'ap-northeast-2',
            awsIdentityPoolId: 'ap-northeast-2:88f54e9d-6025-4bd4-8285-058401d99eb5',
            s3: null,
        }
    },
    methods: {
        getImage(imageName) {
            console.log("요청한 사진 파일명: " + imageName)
            return`https://vue-s3-test-3737.s3.ap-northeast-2.amazonaws.com/${imageName}`;
        },
        awsS3Config() {
            AWS.config.update({
                region: this.awsBucketRegion,
                credentials: new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: this.awsIdentityPoolId
                })
            })

            this.s3 = new AWS.S3({
                apiVersion: '2006-03-01',
                params: {
                    Bucket: this.awsBucketName
                }
            })
        },
    },
    async mounted(){
        this.awsS3Config()
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
.productName a {
    font-family: 'GmarketSans';
    font-weight: 200;
    text-decoration: none;
    display: inline-block;
    white-space: nowrap;
    color: black
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