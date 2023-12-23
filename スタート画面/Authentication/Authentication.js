const icon_input = document.querySelector('input#input_icon');
const name_input = document.querySelector('input[name="name_input"]');

icon_input.addEventListener('change',(e)=>{

  const selectedFile = e.target.files[0];
  const uploadTask = storage.child("images/" + selectedFile.name).put(selectedFile);

  uploadTask.on("state_changed",
  (snapshot) => {
    // アップロード中の進捗を監視
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log("アップロード進捗: " + progress + "%");
  },
  (error) => {
    // エラーハンドリング
    console.error("アップロードエラー: " + error);
  },
  () => {
    // アップロードが完了したときの処理
    console.log("アップロードが完了しました");

    uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
      // ダウンロードURLをユーザーのphotoURLに設定
      firebase.auth().currentUser.updateProfile({
        photoURL: downloadURL
      }).then(function () {

        console.log("プロフィール写真が設定されました");
      }).catch(function (error) {
        console.error("プロフィール情報の更新エラー: " + error);
      });
    });

  }
);
})

name_input.addEventListener('change',(e)=>{
  firebase.auth().currentUser.updateProfile({
    displayName: e.target.value
  }).then(()=>{
    alert(e.target.value + "に設定しました")
  });
})

// ボタンのクリックイベントを処理
document.getElementById('login-logout-button').addEventListener('click', function() {
    const user = firebase.auth().currentUser;
    if (user) {
      // ログインしている場合、ログアウト処理を行う
      firebase.auth().signOut()
        .then(function() {
          // ログアウト成功時の処理
          alert('ログアウトしました。');
          // ボタンのラベルを「ログイン」に変更
          document.getElementById('login-logout-button').textContent = 'ログイン';
        })
    } else {
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
        // ログイン成功時の処理
        var user = result.user;
        main(user)

        })
        .catch(function(error) {
        // ログインエラー時の処理
        var errorCode = error.code;
        var errorMessage = error.message;
        console.error('ログインエラー: ' + errorMessage);
        });
    }
  });
  
  function main(user){
    if(user){
      user = firebase.auth().currentUser;
    }
    console.log(firebase.auth().currentUser)

  }
document.addEventListener('DOMContentLoaded',()=>{

  const auth = firebase.auth();

  auth.onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('login-logout-button').textContent = 'ログアウト';
      document.getElementById('display_name').textContent = user.displayName;
      document.getElementById('icon').setAttribute('src',user.photoURL);
    } else {
    }
  });

});


