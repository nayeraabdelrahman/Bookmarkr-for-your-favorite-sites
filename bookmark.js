var siteName=document.getElementById("siteName");
var siteUrl=document.getElementById("siteUrl");
var bookmarkTable=document.getElementById("bookmarkTable")

//local storage
var bookmarkArr=[];
if(localStorage.getItem("bookmarks")!=null){
    bookmarkArr=JSON.parse(localStorage.getItem("bookmarks"));
    displayBookmark();
}
//regex
siteNameRegex=/^[a-zA-Z]{3,}$/
var siteUrlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
function isvalid(element,elementRegex){
    if(elementRegex.test(element.value)==true){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");
        element.nextElementSibling.classList.replace("d-block","d-none");
        return true;
    }else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
        element.nextElementSibling.classList.replace("d-none","d-block");
        return false;
    }
}
//add
// Add Bookmark
function addBookmark() {
    if (isvalid(siteName, siteNameRegex) & isvalid(siteUrl, siteUrlRegex)) {
        var bookmarkItem = {
            bookmarkSite: siteName.value,
            bookmarkUrl: siteUrl.value,
        };
        bookmarkArr.push(bookmarkItem);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarkArr));
        console.log(bookmarkItem);
        displayBookmark();
        resetBookmark();
    } else {
        bookAlert()
    }
}

function bookAlert(){
    Swal.fire({
        html: `
            <div class="circles d-flex position-absolute">
              <span class="rounded-circle me-2"></span>
              <span class="rounded-circle me-2"></span>
              <span class="rounded-circle me-2"></span>
            </div>
            <div class="pt-5 pb-4">
                        <p class="m-0 py-2">
                            Site Name or Url is not valid, Please follow the rules below :
                        </p>
                    <ol class="list-unstyled m-0">
                        <li>
                            <i class="fa-regular fa-circle-right p-2"></i>
                            Site name must contain at least 3 characters</li>
                        <li>
                            <i class="fa-regular fa-circle-right p-2"></i>
                            Site URL must be a valid one
                        </li>
                    </ol>
            </div>
`,
        showCloseButton: true,
        focusConfirm: false,
    });
}
//display
function displayBookmark(){
    var bookmarkItemContainer="";
    for(i = 0; i < bookmarkArr.length; i++){
        console.log(i)
        bookmarkItemContainer+=`<tr>
                    <th>${i+1}</th>
                    <td>${bookmarkArr[i].bookmarkSite}</td>
                    <td>
                        <button onclick="visitBookmark('${bookmarkArr[i].bookmarkUrl}')" id="visitBtn"class="btn btn-success">
                        <i class="fa-solid fa-eye pe-2"></i>Visit
                    </button>
                    </td>
                    <td><button onclick="deleteBookmark(${i})"id="deleteBtn"class="btn btn-danger">
                        <i class="fa-solid fa-trash-can"></i>
                        Delete
                    </button></td>
                </tr>`;
    }
    bookmarkTable.innerHTML=bookmarkItemContainer;
}
//visit
function visitBookmark(item){
    window.open(item,'_blank')
}
//delete
function deleteBookmark(item){
    bookmarkArr.splice(item,1);
    localStorage.setItem("bookmarks",JSON.stringify(bookmarkArr));
    displayBookmark();
}
//reset
function resetBookmark(){
    siteName.value=null;
    siteUrl.value=null;
    siteName.classList.remove("is-valid","is-invalid");
    siteUrl.classList.remove("is-valid","is-invalid");
}

