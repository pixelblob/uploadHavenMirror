const original = document.querySelector("#original")
const mirror = document.querySelector("#mirror")

original.oninput=function() {
    var url = original.value

    try {
        var newurl = new URL(url)
        newurl.hostname="pixelboop.net"
        newurl.pathname= "uploadhaven"+newurl.pathname
        mirror.value=newurl
    } catch (error) {
        mirror.value=""
        return original.classList.add("error")
    }
    original.classList.remove("error")
}