const postList=document.querySelector('.posts-list')
const addPostForm=document.querySelector('.add-post-form')
const titleValue=document.getElementById('title-value')
const bodyValue=document.getElementById('body-value')
const btnSubmit=document.querySelector('.btn')

const url='https://nodeapitodo.herokuapp.com/api/posts/'
let output=''

postList.addEventListener('click',(e)=>{
    e.preventDefault()
    let deleteButtonIsPressed=e.target.id=='delete-post'
    let editButtonIsPressed=e.target.id=='edit-post'

    let id=e.target.parentElement.dataset.id


    // delete post
    if(deleteButtonIsPressed){
        fetch(`${url}/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    }

    // patching
    if(editButtonIsPressed){
        const parent=e.target.parentElement
        let titleContent=parent.querySelector('.card-title').textContent
        let bodyContent=parent.querySelector('.card-text').textContent
        titleValue.value=titleContent
        bodyValue.value=bodyContent
    }

    // update existing post
    btnSubmit.addEventListener('click',(e)=>{
        e.preventDefault()
        fetch(`${url}/${id}`,{
            method:'PATCH',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                title:titleValue.value,
                body:bodyValue.value
            })
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    })

})



const renderPosts=(posts)=>{
    
    posts.forEach(post=>{
        output +=`
        <div class="card mt-4 col-md-6 bg-ligt" >
            <div class="card-body" data-id=${post._id}>
              <h5 class="card-title">${post.title}</h5>
              <h6 class="card-subtitle mb-2 text-muted">${post.date}</h6>
              <p class="card-text">${post.body}</p>
              <a href="#" class="card-link" id="edit-post">Edit</a>
              <a href="#" class="card-link" id="delete-post">Delete</a>
            </div>
        </div>
        
        
        
        
        
        
        `
    })
    postList.innerHTML=output;
}
// method get
fetch(url)
    .then(res=>res.json())
    .then(data=>renderPosts(data))

//insert new post 
addPostForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:titleValue.value,
            body:bodyValue.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        const datArr=[];
        datArr.push(data)
        renderPosts(datArr)

    })
    // reset input fields 
    titleValue.value=''
    bodyValue.value=''
})