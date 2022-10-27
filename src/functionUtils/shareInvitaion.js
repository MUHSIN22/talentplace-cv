import { toast } from "react-toastify";

export default (media,referal) => {
    let shareLink = "";
    if (media === "whatsapp") {
        shareLink = `https://api.whatsapp.com/send?text=https://talentplace.ai?user=${referal}`
    } else if (media === "facebook") {
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=https://talentplace.ai?user=${referal}`
    } else if (media === "linkedin") {
        shareLink = `https://www.linkedin.com/shareArticle?mini=true&url=https://talentplace.ai?user=${referal}`
    } else if(media === "copy"){
        let copyText = `https://talentplace.ai?user=${referal}`
        navigator.clipboard.writeText(copyText).then( _ => {
            toast.success("Link copied to clipboard!")
        }).catch( _ => {
            toast.error("Something went wrong in copying! Try again")
        })
        
        return true
    }
    window.open(shareLink, '_blank')
}