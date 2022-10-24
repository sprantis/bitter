const client = filestack.init('AR1vn8grlRBSDhH01k0OAz');
const options = {
    accept: ['image/*'],

    maxFiles: 1,

    fromSources: ['local_file_system'],

    onFileSelected: file => {
        if (file.size > 1000 * 1000) {
            throw new Error('File to big, select a file smaller then 1MB.')
        }
    },

    transformations: {
        crop: false,
        circle: true
    },

    onFileUploadFinished(file) {
        document.getElementById('homePagePfp').src = file.url;
        fetch('/update', {
            method: "PATCH",
            body: JSON.stringify({
                url: file.url
            }),
            headers: {
                'Content-Type': "application/json"
            }
        })
        .catch((error) => {
            console.log(error)
        }) 
    }
};


 const picBtn = document.getElementById('profilePic');
 
picBtn.onclick = function(){
    client.picker(options).open();
};

