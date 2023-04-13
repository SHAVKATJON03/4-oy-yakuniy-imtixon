const card_box=document.querySelector(".card_box")
const saveProduct=document.querySelector("#saveProduct")
const form=document.querySelector("#form")
const title_book = document.querySelector("#title_book");
const Category = document.querySelector("#Category");
const price = document.querySelector("#price");
const img_url = document.querySelector("#img_url");
let productArray=[]
let globalImageUrl=[]
const myModal = new bootstrap.Modal("#exampleModal");


function saveProductFun() {
  uploadImage(globalImageUrl).then((res)=>{
    let bookObj = {
      title_book: title_book.value,
      Category: Category.value,
      price: price.value,
      img_url: res,
    };
    

    let arr = Object.keys(bookObj).filter((key) => !bookObj[key]);
    if (arr.length) {
      arr.forEach((item) => {
        console.log(item);
        document.querySelector(`#${item}`).classList.add("error_border1");
      });
      return;
    }
     fetch("https://book-shelter-810a8-default-rtdb.firebaseio.com/product.json" , {
      method: "POST",
      body: JSON.stringify(bookObj),
    })
      .then((res) => {
        if (!res.ok) throw new Error("something wrong :(");
        return res.json();
      })
      .then((res) => {

        console.log(res);
        form.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        myModal.hide();
        getAllBooks()
      });
  })
   
}
document.querySelector("#img_url").addEventListener("change", imageUrl);
function imageUrl(e) {
  globalImageUrl = e.target.files;

  const file = e.target.files[0];

  document
    .querySelector("#imageSrc")
    .setAttribute("src", URL.createObjectURL(file));
}
Array.from(form).forEach((item) => {
  item.addEventListener("change", (e) => {
    if (e.target.value) e.target.classList.remove("error_border1");
    else e.target.classList.add("error_border1");
  });
});
function deleteBooks(id) {
  let findedElement = productArray.find((item, index) => index === id);
  fetch(
    `https://book-shelter-810a8-default-rtdb.firebaseio.com/product/${findedElement.id}.json`,
    {
      method: "DELETE",
    }
  )
    .then((res) => {
      if (!res.ok) throw new Error("something wrong :(");
      return res.json();
    })
    .then((res) => {
      console.log("malumot ochdi", res);
      getAllBooks();
    })
    .catch((err) => {})
    .finally(() => {});
}
  
function getAllBooks() {

  fetch("https://book-shelter-810a8-default-rtdb.firebaseio.com/product.json")
    .then((res) => {
      if (!res.ok) throw new Error("something wrong :(");
      return res.json();
    })
    .then((res) => {
      productArray = Object.keys(res || {}).map((item) => {
        return {
          ...res[item],
          id: item,
        };
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderElement();
      NewrenderElement()
    });
}
getAllBooks()
function uploadImage(files,enable=false) {
  if(enable){
    return new Promise((res,rej)=>res(""))
  }
  const formData = new FormData();
  let promise = new Promise((res3, rej) => {
    Promise.all(
      [...files].map((item) => {
        formData.append("formFile", item);

        return fetch("https://api.oqot.uz/api/1.0/file/upload", {
          method: "POST",
          body: formData,
        }).then((res) => {
          return res.json();
        });
      })
    ).then((res) => {
      console.log(res);
      res3(
        res
          .map((item) => {
            return `https://api.oqot.uz/api/1.0/file/download/${item}`;
          })
          .join(" ")
      );
      console.log(arr);
    });
  });
  return promise;
}
function renderElement() {
    let result =
      productArray.map((item, index) => {
  
      
  
        let starElement = ``;
        for (let i = 0; i < item.rate; i++) {
          starElement += `<img src="./img/star.svg" alt="" />`;
        }
        let result = `      <div class="card_box">
      
        <div class="card">
          <div class="cardImgIcons">
            <span>${item.Category}</span>
            <img width="300px" height="300px" src="${item.img_url}" alt="" />
          </div>
          <div class="card_bottom">
            <p>All Natural Makeup Beauty Cosmetics</p>
            <ul class="d-flex align-items-center justify-content-between">
              <li><p class="price">$${item.price}</p></li>
              <li><img src="./img/card_button.svg" alt="icon" /></li>
            </ul>
            <ul class="d-flex align-items-center gap-5">
            <li><button class="btn btn-danger"  onclick="deleteBooks(${index})" >Delete</button></li>
            <li><button  class="btn btn-success">Edite</button></li>
          </ul>
          </div>
        </div>
    
      </div>`;
    
        return result;
      }).join(" ");
  
    card_box.innerHTML = result;
  }
  function NewrenderElement() {
          let   result =
              productArray.map((item, index) => {
          
              
          
                let starElement = ``;
                for (let i = 0; i < item.rate; i++) {
                  starElement += `<img src="./img/star.svg" alt="" />`;
                }
                let result = `
                <div class="card_box">
          
    <div class="card">
      <div class="cardImgIcons">
        <span>${item.Category}</span>
        <img src="${item.img_url}" alt="" />
      </div>
      <div class="card_bottom">
        <p>${item.title_book}</p>
        <ul class="d-flex align-items-center justify-content-between">
          <li><p class="price">$${item.price} </p></li>
          <li><img src="./img/card_button.svg" alt="icon" /></li>
        </ul>
        
  <ul class="d-flex align-items-center justify-content-evenly">
  <li><button class=" btn btn-success"  onclick="deleteBooks${index}" >Delete</button></li>
  <li><button  class="btn btn-danger">Edite</button></li>
</ul>
      </div>
    </div>
    
    </div>`;
          
                return result;
              }).join(" ");
          
           document.querySelector(".newCArdbox") .innerHTML = result;
          }
saveProduct.addEventListener('click',saveProductFun)

