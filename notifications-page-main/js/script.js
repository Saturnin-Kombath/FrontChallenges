let posts = [];

const fetchPosts = async () => {
    await fetch('/js/data.json')
        .then((res) => res.json())
        .then((prom) => {
            posts.push(...prom)
        })
}

const postsDisplay = async () => {
    await fetchPosts();
    document.querySelector('.notifs').innerHTML = posts.map(post => {
        let action = "";
        let message = "";
        let target = "";
        let comm_picture = false;
        let ref_img_link = "";
        switch (post.action.type) {
            case "reaction":
                action = `reacted to your recent post `;
                target = post.action.which;
                break;
            case "follow":
                action = "followed you"
                break
            case "join":
                action = "joined your ";
                target = post.action.name;
                break
            case "message":
                action = "sent you a private message";
                message = post.action.content
                break
            case "comment":
                if (post.action.what == "picture") {
                    comm_picture = true;
                    action = "commented on your picture";
                    ref_img_link = post.action.link;
                }
                
                break
            case "left":
                action = "left the group",
                target = post.action.name
                break
            default:
                action = "";
                break;
        };
        
        return `
    <div class="notif ${!post.seen ? `notSeen` : ""}">
      <div class="headInf">
        <div class="user_image">
          <img src="${post.user_image}" alt="${post.user_image}"" >
        </div>
        <div class="heading">
          <div class="cont">
            <strong class="username cursor">${post.username}</strong>
            ${action}
            <strong class="cursor">${target}</strong>${!post.seen ? `<li class="notRead"></li>` : ""}
          </div>
          <div class="time">
            ${post.post_date}
          </div>
        </div>
        ${comm_picture ? `<div class="comm_pict cursor"><img src="${ref_img_link}" alt="${ref_img_link}"" ></div>`: ""}
        
      </div>
      ${message != "" ? `
      <div class="message">
      ${message}
</div>`: ""}
      
    </div>`
    })

}
postsDisplay()

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {   
        let allreadBtn = document.getElementById('all_read');
        let notread = Array.from(document.querySelectorAll('.notSeen'))
        let notreadSignal = Array.from(document.querySelectorAll('.notRead'))
            allreadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            let i = 0
            for (let i = 0; i < notread.length; i++) {
                setTimeout(() => {
                    notread[i].classList.remove('notSeen')
                    notreadSignal[i].style.display = "none"
                }, i*200);
            }
            notread.forEach(r => {
                i+= 200
            })
        })
        let i =0
        notread.forEach(el=>{
            
            el.addEventListener('click',(e)=>{
               el.children[0].children[1].children[0].children[2].style.display = "none";
                el.classList.remove("notSeen")
            })
        })
    }, 2000);

})