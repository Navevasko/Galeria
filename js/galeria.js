"use strict"


const limparElementos= (elemento) => {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.lastChild)
    }
}

const pesquisarImagens = async (evento) => {
    
    if(evento.key === "Enter"){
        const raca =  evento.target.value
        const url = `https://dog.ceo/api/breed/${raca}/images`
        const imagensResponse = await fetch(url)
        if(imagensResponse.ok) {
            const imagens = await imagensResponse.json()

            console.log(imagens)

            limparElementos(document.querySelector('.galeria-container'))
            limparElementos(document.querySelector('.slide-container'))

            carregarGaleria(imagens.message)
            carregarSlides(imagens.message)
        }

        else {
            alert('Erro: A raça digitada não foi encontrada')
        }
        
    }
}

const filtrarId = (urlImagem) => {
    const ultimaBarra = urlImagem.lastIndexOf("/") + 1
    const ultimoPonto = urlImagem.lastIndexOf(".")
    const url = urlImagem.substring(ultimaBarra, ultimoPonto)
    return url
}

const criarItem = (urlImagem) => {
    const container = document.querySelector(".galeria-container")
    const novoLink = document.createElement("a")
    novoLink.href = `#${filtrarId(urlImagem)}`
    novoLink.classList.add("galeria-itens")
    novoLink.innerHTML = `<img src="${urlImagem}" alt="">`
    container.append(novoLink)
    
    
    /*container.innerHTML += `
    
    // <a href="#Paisagem1" class="galeria-itens">
    //     <img src="${urlImagem}">
    // </a>
    
    // `
    */
}

const criarSlide = (urlImagem, indice, array) => {
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = filtrarId(urlImagem)

    const indiceAnterior = indice == 0 ? array.length - 1 : indice - 1 
    const slidAnterior = filtrarId(array[indiceAnterior])

    const indiceSeguinte = indice == array.length - 1 ? 0 : indice + 1 
    const slideSeguinte = filtrarId(array[indiceSeguinte])

    novaDiv.innerHTML = `
        <div class="imagem-container">
            <a href="" class="fechar">&#10006;</a>
            <a href="#${slidAnterior}" class="navegacao anterior">&#171;</a>
            <img src="${urlImagem}" alt="">
            <a href="#${slideSeguinte}" class="navegacao proximo">&#187;</a>
        </div>
    `

    container.appendChild(novaDiv)

}

const carregarGaleria = (imgs) => imgs.forEach(criarItem)
const carregarSlides = (imgs) => imgs.forEach(criarSlide)

document.querySelector('.pesquisa-container input')
        .addEventListener('keypress', pesquisarImagens)