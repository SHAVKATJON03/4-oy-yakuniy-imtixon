


const password=document.querySelector("#password")
const username=document.querySelector("#name")
const login=document.querySelector(".login")

const messageToast=document.querySelector(".message")

const toasts=document.querySelector(".toasts")
const loading=document.querySelector('.loading')
const activeToast=(mesage)=>{
    messageToast.textContent=mesage;
    toasts.classList.add('toasts-active')
    setTimeout(()=>{
        toasts.classList.remove('toasts-active')
    messageToast.textContent="";

    },3000)
}


const loadingActive=(active)=>{
    if(active){
        loading.classList.add("loading-active")
    }else{
        loading.classList.remove("loading-active")

    }
}

const getLocalStorage=(key)=>{
    return localStorage.getItem(key)
}
const setLocalStorage =(key ,value)=>{
    localStorage.setItem(key , value)
}
const removeLocalStorage =(key)=>{
    localStorage.removeItem(key)
}
const clearLocalStorage=()=>{
    localStorage.clear()
}

  const postData= async ()=>{
    try{
        loadingActive(true)
        const usernameinput=username.value;
        const passwordinput=password.value;

        const response=await fetch("https://api-renessans.mquvonchbek.uz/api/v1/auth/login",
        {
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-type":"application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                username:usernameinput,
                password:passwordinput,
            })

        }
        )

        if(!response.ok){
            throw new Error ("something error!")
        }

        const data = await response.json();
        setLocalStorage ("token",data.token)
        location.replace("./admin.html")
    } catch (error){
        activeToast(error.message)
    } finally {
        console.log("har doim ishla");
        loadingActive(false)
    }
}


 const handleSubmit = login.addEventListener("click",(e)=>{
    e.preventDefault()
    postData()
})