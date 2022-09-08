let dogBar = document.querySelector("#dog-bar")
let dogInfo = document.querySelector("#dog-info")
let filter = document.querySelector("#good-dog-filter")
let isTrue = true;

const fetchDogs = () => {
    return fetch("http://localhost:3000/pups")
    .then(res => res.json())
}

const renderDogs = (dog) => {
    let dogName = document.createElement("span")
    dogName.textContent = dog.name

    dogName.addEventListener("click", () => {
        dogDetails(dog)
    })


    dogBar.appendChild(dogName)
}

const dogDetails = (dog) => {

    let dogImg = document.createElement("img")
    dogImg.src = dog.image

    let dogHeader = document.createElement("h2")    
    dogHeader.textContent = dog.name

    let dogButton = document.createElement("button")
    if(dog.isGoodDog === true){
        dogButton.textContent = "Good Dog!"
    } else {
        dogButton.textContent = "Bad Dog!"
    }

    dogButton.addEventListener("click", () => {
        if(dogButton.textContent === "Good Dog!"){
            dogButton.textContent = "Bad Dog!"
            
        } else {
            dogButton.textContent = "Good Dog!"
            fetch(`http://localhost:3000/pups/${dog.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "isGoodDog": !dog.isGoodDog,
                }),
            })
            .then(res => res.json())
            .then()
        }
    })
    
    removeAllChildNodes(dogInfo)
    dogInfo.append(dogImg, dogHeader, dogButton)
}


filter.addEventListener("click", () => {
    isTrue = !isTrue;
    if(isTrue){
        filter.textContent = "Filter good dogs: ON"
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(dogArray => {
            let filterDogArray = dogArray.filter(goodDog => {
                return goodDog.isGoodDog === true
            })
            dogBar.textContent = ''
            filterDogArray.forEach(goodDog => {
                renderDogs(goodDog)
            })
        })

    } else {
        filter.textContent = "Filter good dogs: OFF"
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(dogArray => {
            dogBar.textContent = ''
            dogArray.forEach(goodDog => {
                renderDogs(goodDog)
            })
        })
    }    
})

// used to delete previous child nodes that were appended earlier
const removeAllChildNodes = (parent) => {
    while(parent.firstChild) {
        parent.removeChild(parent.firstChild)
    }
}





fetchDogs().then(data => {
    data.forEach(dog => {
        renderDogs(dog)
    })
})
