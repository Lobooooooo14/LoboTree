const defineColors = (background, foreground, imageURL) => {
    const background_color = `rgb(${background[0]}, ${background[1]}, ${background[2]})`
    const foreground_color = `rgb(${foreground[0]}, ${foreground[1]}, ${foreground[2]})`
    const background_color_transparent = `rgba(${background[0]}, ${background[1]}, ${background[2]}, 80%)`
    const foreground_color_transparent = `rgba(${foreground[0]}, ${foreground[1]}, ${foreground[2]}, 80%)`

    document.body.style.backgroundImage = `url(${imageURL})`

    const header = document.getElementById("header")

    header.style.backgroundColor = `rgba(${background[0]}, ${background[1]}, ${background[2]}, 60%)`
    
    document.documentElement.style.setProperty("--bg", background_color)
    document.documentElement.style.setProperty("--fg", foreground_color)  
    document.documentElement.style.setProperty("--bg-t", background_color_transparent)
    document.documentElement.style.setProperty("--fg-t", foreground_color_transparent)

}


const changeTheme = (collection) => {
    const sig = Math.floor(Math.random() * (collection.sig - 0 + 1) + 0)
    fetch(`https://source.unsplash.com/collection/${collection.id}/?sig=${sig}`).then((request) => {
        const colorThief = new ColorThief()
        const image = new Image()

        image.src = request.url
        image.crossOrigin = "{anonymous}"

        image.onload = () => {
            const imagePalette = colorThief.getPalette(image, 2)

            const background = imagePalette[0]
            const foreground = imagePalette[1]
            const loading_screen = document.getElementById("loading-screen")

            defineColors(background, foreground, request.url)

            const animation_seconds = 1000
            loading_screen.style.animation = `fadeOutLoading ${animation_seconds}ms ease`
            setTimeout(() => { loading_screen.style.display = "none" }, animation_seconds)
            
        }

    })
}


fetch("./assets/json/phases.json")
    .then((response) => response.json())
    .then((data) => {
        const loading_phase = document.getElementById("loading-phase")
        const phase = data[Math.floor(Math.random() * data.length)]

        loading_phase.innerText = phase
    })


//Huskys collection
const collection = {id: 82921214, sig: 30}

changeTheme(collection)