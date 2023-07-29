import AWS from 'aws-sdk'
import env from '../env';

export function awsS3Config() {
    AWS.config.update({
      region: env.api.MAIN_AWS_BUCKET_REGION,
      credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: env.api.MAIN_AWS_BUCKET_IDENTITY_POOL_ID,
      }),
    });
  
    return new AWS.S3({
      apiVersion: '2006-03-01',
      params: {
        Bucket: env.api.MAIN_AWS_BUCKET_NAME,
      },
    });
}
  
export function uploadAwsS3(s3, mainFile, detailsFiles) {
    s3.upload(
        {
        Key: mainFile.name,
        Body: mainFile,
        ACL: 'public-read',
        },
        (err, data) => {
        if (err) {
            console.log(err);
            return alert('메인 이미지 업로드 중 문제 발생', err.message);
        }
        console.log('메인 이미지 업로드 성공!');
        }
    );

    detailsFiles.forEach((file) => {
        s3.upload(
        {
            Key: file.name,
            Body: file,
            ACL: 'public-read',
        },
        (err, data) => {
            if (err) {
            console.log(err);
            return alert('상세 이미지 업로드 중 문제 발생', err.message);
            }
            console.log(`파일 ${file.name} 업로드 성공!`);
        }
        );
    });
}

export function uploadDetailImgAwsS3(detailsFiles) {
  const s3 = awsS3Config();

  detailsFiles.forEach((file) => {
    s3.upload({
      Key: file.name,
      Body: file,
      ACL: 'public-read',
    }, (err, data) => {
      if (err) {
        console.log(err);
        return alert("상세 이미지 업로드 중 문제 발생", err.message);
      }
      console.log(`파일 ${file.name} 업로드 성공!`);
    });
  });
}

export function deleteAwsS3File(key) {
    const s3 = awsS3Config()
    
    s3.deleteObject(
      {
        Key: key,
      },
      (err, data) => {
        if (err) {
          return alert('AWS 버킷 데이터 삭제에 문제가 발생했습니다: ' + err.message);
        }
        alert('AWS 버킷 데이터 삭제가 성공적으로 완료되었습니다');
      }
    );
  }