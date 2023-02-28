document.addEventListener("DOMContentLoaded", () => {
    let display = document.getElementById("passDisp")
    let copy_btn= document.getElementById("copy")
    let generat_btn = document.getElementById("generate")
    let succes_msg = document.getElementById("success")
    let fail_msg = document.getElementById("fail")

    let password = "";
    let generated = false;

    function generate_pass(minlength,maxlength) {
        maxlength = minlength + Math.floor(Math.random() * 5);
        let pass = "";
        let chars = ["a", "z", "e", "r", "t", "y", "u", "i", "o", "p", "q", "s", "d", "f", "g", "h", "j", "k", "l", "m", "w", "x", "c", "v", "b", "n", "&", "é", "&", "~", "#", "è", "_", "ç", "à", ")", "^", "$", "*", "ù", "!", "?", "§", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

        for (let i = 0; i < maxlength; i++) {
            let rdCrt = chars[Math.floor(Math.random() * chars.length)]
            pass += rdCrt;

        }
        password = pass;
        return pass;
    }
    

    generat_btn.addEventListener('click',()=>{
        copy_btn.classList.remove('active')
        copy_btn.textContent = "Copy";
        succes_msg.classList.remove('active')
        fail_msg.classList.remove('active')
        display.innerHTML = generate_pass(8,13);
        generated = true
    })
    copy_btn.addEventListener('click',(e)=>{
        if (generated) {
            setClipboard(password)
            copy_btn.classList.add('active')
            copy_btn.textContent = "Copied"
            succes_msg.classList.add('active')
        }else{
            fail_msg.classList.add('active')
        }
    })
    function setClipboard(text) {
        const type = "text/plain";
        const blob = new Blob([text], { type });
        const data = [new ClipboardItem({ [type]: blob })];

        navigator.clipboard.write(data).then(
            () => {
                // console.log("succes");
            },
            () => {
                // console.log("fail");
            }
        );
    }

})
