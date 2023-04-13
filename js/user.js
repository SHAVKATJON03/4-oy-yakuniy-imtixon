const token=localStorage.getItem("token") || "";


document.querySelector(".logoutBtn").addEventListener("click",()=>{
  if(token){
    window.location.replace("./admin.html")
  }else{
    window.location.replace("./logout.html")
  
  }
})
let category;

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
      renderElement(productArray);
      categoryRender();
      renderPageAnimationNumbers(Categoryinput.length);
      NewrenderElement(Categoryinput)
    
    });
}
getAllBooks();

function renderElement(renderCate) {
  let result = choppedBookItem(
    renderCate.map((item, index) => {
      let starElement = ``;
      for (let i = 0; i < item.rate; i++) {
        starElement += `<img src="./img/star.svg" alt="" />`;
      }
      let result = `       <li class="card">
        <div class="cardImgIcons">
          <span>${item.Category}</span>
          <img src="${item.img_url}" width="300px" height="300px" alt="" />
        </div>
        <div class="card_bottom">
          <p>${item.title_book}</p>
          <ul class="d-flex align-items-center justify-content-between">
          <li><p class="price">$${item.price}</p></li>
          <div class="buttons">
          <span id="prep" onclick="renderprep1()">-</span>
          <span class="quantity" id="quantity" >0</span>
          <span id="next" onclick="renderprep()">+</span>
        </div>
        </ul>
        </div>
      </li>`;

      return result;
    })
  ).join(" ");

  document.querySelector(".card_box").innerHTML = result;
}



function NewrenderElement(ren) {
  let result = ren
    .map((item, index) => {
      let starElement = ``;
      for (let i = 0; i < item.rate; i++) {
        starElement += `<img src="./img/star.svg" alt="" />`;
      }
      let result = `   <div class="card_box">
      
          <div class="card">
            <div class="cardImgIcons">
              <span>${item.Category}</span>
              <img width="300px" height="300px" src="${item.img_url}" alt="" />
            </div>
            <div class="card_bottom">
              <p>All Natural Makeup Beauty Cosmetics</p>
              <ul class="d-flex align-items-center justify-content-between">
                <li><p>$${item.price}</p></li>
                <div id="saveBtnPro"> <img id="saveBtnProimg" onclick="renderkorzinka(${index})" src="./img/add-bookmark.png" alt="icon" /> </div>
              </ul>
            </div>
          </div>
      
        </div>`;

      return result;
    })
    .join(" ");

  document.querySelector("#newCArdbox").innerHTML = result;
}

let newUrl = new URLSearchParams(window.location.search);
let step = 3;
let page = newUrl.get("page") || 1;
function choppedBookItem(books) {
  let start = page * step - step;
  let end = start + step;
  return books.slice(start, end);
}
function renderPageAnimationNumbers(length) {
  let pageNumbers = Math.ceil(length / step);
  let result = "";
  for (let i = 0; i < pageNumbers; i++) {
    result += `  <li>
  <button class="page-btn ${page == i + 1 ? "active" : ""}">${i + 1}</button>
  </li>`;
  }
  document.querySelector("#pages").innerHTML = result;

  document.querySelectorAll(".page-btn").forEach((item) => {
    item.addEventListener("click", (e) => {
      page = e.target.innerHTML;
      getAllBooks();
      pageElements(page);
    });
  });
}
function pageElements(pageNumbers) {
  console.log(pageNumbers);
  let url1 = new URL(window.location.href);
  let query1 = new URLSearchParams();
  query1.append("page", pageNumbers);

  const urlSerchQuery = query1.toString();
  url1.search = urlSerchQuery;
  window.history.pushState({}, "", url1.toString());
}
const newCategory = document.querySelector("#newCategory");

const onsaleCategory = document.querySelector("#onsale");
const upcomingCategory = document.querySelector("#upcomingProducts");
const newProducts = document.querySelector("#newProducts");

let Categoryinput = [];


function categoryRender(e) {
  category = e?.target?.id || "newProducts";
  Categoryinput = productArray.filter((item) => {
    return item.Category === category;
  });
  // console.log(result);
  // return result\
  renderElement(Categoryinput);
}


newProducts.addEventListener("click", categoryRender);
upcomingCategory.addEventListener("click", categoryRender);
onsaleCategory.addEventListener("click", categoryRender);



const   saveBtnProimg=document.querySelector("#saveBtnProimg")
const   saveBtnPro=document.querySelector("#saveBtnPro")

var x=document.querySelector("#prep")
var y=document.querySelector("#next")
var z=document.querySelector("#quantity")



// let increment=(id)=>{
//   let selectedItem=id
//   let search=basket.find((x)=> x.id===selectedItem)
//   if(search===undefined){
//     basket.push({
//       id:selectedItem,
//       item:1
//     })
//   }else{
//     search.item +=1
//   }
//   update(selectedItem)
  
// }
// let search=basket.find((x)=> x.id===id)
// // console.log(search.item);
// console.log(id);
// // let elemen=document.getElementById(id)
// quantity.textContent=search.item
let basket=[]

function renderprep(index){
  let selectedItem=index
  console.log(selectedItem);
  basket.push({
    id:selectedItem,
    item:1
  })
  let search1=basket.find((x)=> x.id===index)
  // let search1=basket.find((x)=> x.id===id)
  var z=document.querySelector("#quantity").innerHTML;
  // search1.item++
   document.querySelector("#quantity").innerHTML= search1.item++
  
}
function renderprep1(){
  if (document.querySelector("#quantity").innerHTML>0) {
    var z=document.querySelector("#quantity").innerHTML;
    z--
    
    document.querySelector("#quantity").innerHTML=z--
  }
  
}
// x.addEventListener("click",renderprep1)
// y.addEventListener("click",renderprep)