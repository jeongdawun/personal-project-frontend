<template>
    <v-container>
        <v-row>
            <v-col v-for="product in products" :key="product.id">
                <div>
                    <v-img 
                    :src="product.mainImageName ? getImage(product.mainImageName) : ''"
                    aspect-ratio="1" />
                    <div><Strong>{{ product.productName }}</Strong></div>
                    <div>{{ product.minOptionPrice }}</div>
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
            console.log("되나?")
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
        }
    },
    async mounted(){
        this.awsS3Config()
        await this.getImage()
    }
}
</script>

<style scoped>
</style>