const myModal = document.querySelector("#myModal");
let modalContent = document.querySelector(".modalContent");
let deleteBtn = document.querySelectorAll(".delete-btn");
let newBlogForm = document.querySelector(".newBlogForm");
let editBlogForm = document.querySelector(".editBlogForm");

myModal.classList.add("hide")



deleteBtn.forEach((btn) => {
        btn.addEventListener("click", (event) => {
                event.preventDefault();
                setTimeout(() => {
                        myModal.classList.add('show');
                        modalContent.innerText = "Blog deleted!!"
                        setTimeout(() => {
                                myModal.classList.remove('show');
                                btn.closest("form").submit();
                            }, 2000);
                },500);
        })
})

newBlogForm.addEventListener("submit", (event) => {

        event.preventDefault();
        setTimeout(() => {
        myModal.classList.add('show');
        modalContent.innerText = "Blog submitted!!"

        setTimeout(() => {
                newBlogForm.submit();
        },500)
},500);
});


editBlogForm.addEventListener("submit", (event) => {

        event.preventDefault();
        setTimeout(() => {
        myModal.classList.add('show');
        modalContent.innerText = "Blog edited!!"

        setTimeout(() => {
                newBlogForm.submit();
        },500)

},500);
});




