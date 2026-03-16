let listName = document.getElementById("txt-list")
let addList = document.getElementById("list-btn")
let editId =null
let allList = JSON.parse(localStorage.getItem("mylist")) || []

addList.addEventListener("click", () => {

  let listvalue = listName.value.trim()

  if (listvalue === "") {
    alert("please write something before add")
    return
  }
 if(editId){
  allList = allList.map(item=>{
    if(item.id === editId){
      return {...item,value:listvalue}
    }
    return item
  })
 }
 else{
  let listobj = {
    id: Date.now(),
    value: listvalue
  }
  allList.push(listobj)
 }
  

  localStorage.setItem("mylist", JSON.stringify(allList))

  displayList()

  listName.value = ""
})

function displayList() {

  let ul = document.getElementById("lists")
  ul.innerHTML = ""

  allList.forEach(item => {

    let li = document.createElement("li")
    li.innerHTML = `
     ${item.value} 
     <button id="del" onclick="deleteList(${item.id})">Delete </button>
       <button id="edit" onclick="editList(${item.id})">Edit </button>
    `

    ul.appendChild(li)

  })

}
function deleteList(id){
  allList = allList.filter(item => item.id !== id)
  displayList()
}
function editList(id){

  let item = allList.find(item => item.id === id)

  if(item){
    listName.value = item.value
    editId= id
  }

}
displayList()