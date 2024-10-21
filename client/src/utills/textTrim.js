export const trimText=(text,textLength)=>{
    let splitedText= text.split(" ").slice(0,textLength).join(" ")

    if(splitedText.length>textLength){
        splitedText=splitedText+"..."
    }
     return splitedText
}