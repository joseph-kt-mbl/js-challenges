

const getUser = async id => {
    // const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
    // return await response.json();

    // const ax_response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
    // return ax_response.data;
    return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    .then(ax_response => ax_response.data);
}
const getUserPosts = async id =>{
    // const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    // return await response.json();
    //     const ax_response = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    //     return ax_response.data;

    return axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
    .then(ax_response => {
        console.log(ax_response);
        return ax_response.data
    })
    .catch(error => console.error("something went wrong in the request sending",error));
}
const customizeUserPosts = id => {
    getUserPosts(id)
    .then(posts => {
        const PostContainer = document.querySelector('.content');
        PostContainer.innerHTML = ''
        posts.forEach(post =>{
            const POST = document.createElement('div');
                POST.classList.add('post')

            const id = document.createElement('span');
            const idText = document.createTextNode(post.id);
            id.append(idText);
            id.style.fontWeight ='bold';
            id.style.fontSize = '20px'
            const Title = document.createElement('h3');
                Title.classList.add('center')

                Title.textContent = post.title;
            const Body = document.createElement('p');
                Body.textContent = post.body;

            POST.append(id,Title,Body);
            
            PostContainer.append(POST);
        })

    })
    .catch(error => console.error("something went wrong ",error))
}
function getNodeIndex(node) {
    // Get the parent node of the provided node
    const parent = node.parentNode;

    // If there is no parent or the parent has no children, return -1
    if (!parent || !parent.childNodes) {
        return -1;
    }

    // Loop through the parent's child nodes to find the index of the provided node
    for (let i = 0; i < parent.childNodes.length; i++) {
        if (parent.childNodes[i] === node) {
            // Return the index of the node
            return i;
        }
    }

    // If the provided node is not found among the parent's child nodes, return -1
    return -1;
}




const customizeUser = id =>{
    
getUser(id)
.then(user => {
    // console.log(user);
    const userDiv = document.createElement('div')
    userDiv.classList.add('user');
    


    const username = document.createElement('h3');
    username.textContent = user.username;
    username.style.marginBottom = '.75rem'

    const name = document.createElement('h5');
    name.textContent = user.name;
    name.style.color = '#0f0f3f'

    const infos = document.createElement('p')

    const spanID = document.createElement('span')
    spanID.textContent = `id : ${user.id}`;
    spanID.style.color = 'rgb(114, 17, 205)';
    spanID.style.marginRight = '0.5rem';
    spanID.style.fontWeight = 'bold'

    
    const spanEMAIL = document.createElement('span')
    spanEMAIL.textContent = `email : ${user.email}`;
    spanEMAIL.style.color = 'orangered';
    spanEMAIL.style.textDecoration = 'underline';
    spanEMAIL.style.marginLeft = '0.75rem'
    spanEMAIL.style.fontSize = '12px'

    infos.appendChild(spanID)
    infos.appendChild(document.createTextNode(' ‣ '));
    infos.appendChild(spanEMAIL);

    const father = document.querySelector('.sidebar');
    userDiv.appendChild(username)
    userDiv.appendChild(name)
    userDiv.appendChild(infos);
    
    father.append(userDiv);

})
.catch(error => {
    console.error('Failed to fetch user:', error);
});
}




let myUsers = [];

const customizeUserPromise = id => {
    return new Promise((resolve, reject) => {
        customizeUser(id);
        // Assuming customizeUser completes its asynchronous operations and updates myUsers array.
        // For demonstration purposes, I'm simulating a delay here using setTimeout.
        setTimeout(() => {
            resolve();
        }, 1000); // Adjust the delay time according to your requirements
    });
};

// Create an array of promises
const userPromises = [];
for (let i = 1; i <= 10; ++i) {
    userPromises.push(customizeUserPromise(i));
}

// Wait for all promises to resolve
Promise.all(userPromises)
    .then(() => {
        // console.log([...document.getElementsByClassName('user')]);

        myUsers.forEach((userDiv , index,arr )=>{
            userDiv.addEventListener('click', _ =>{
                arr.forEach(item=>{
                    item.classList.remove('selected');
                })
                    userDiv.classList.toggle('selected');
            })
        })

    })
    .catch(error => {
        console.error('Failed to fetch user:', error);
    });


// =========================================
document.addEventListener('DOMContentLoaded', _ =>{

    // Create a new observer
    const observer = new MutationObserver(function(mutationsList, observer) {
        // Loop through each mutation
        mutationsList.forEach(function(mutation) {
            // Check if nodes were added
            if (mutation.type === 'childList') {
                // Loop through added nodes
                mutation.addedNodes.forEach(function(node) {
                    // Check if the added node has the class "user"
                    if (node.classList && node.classList.contains('user')) {
                        node.addEventListener('click', function(e){
                            const TargetId = getNodeIndex(node)+1;
                            customizeUserPosts(TargetId);
                        })
                        myUsers.push(node);
                    }
                });
            }
        });
    });

    // Start observing changes to the body
    observer.observe(document.body, { childList: true, subtree: true });
})
