document.addEventListener('DOMContentLoaded', () => {
    disableForm();
    api(URL)
    .then(saveDogs)
    .then(renderDogs)
    .catch(console.log('API error: sorry cannot fetch dog'));
});

const URL = 'http://localhost:3000/dogs';
const dogTable = document.querySelector('#table-body');
const dogForm = document.querySelector('#dog-form');

let dogs = [];

const patchDog = (newDog) => {
    const options =  {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDog),
    };
    return api(dogForm.action, options)
    .catch(console.log('API error: cannot update the dogs'));
};
const api =(url, options = {}) => fetch(url, options)
.then((response) => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject (response.json());
});
const enableForm = () => {
    dogForm.querySelectorAll('input').forEach((element) => {
        element.removeAttribute('disabled');
    });
};

const disableForm = () => {
    dogForm.querySelectorAll('input').forEach((element) => {
        element.setAttribute('disabled', true);
    });
};

const handleSubmit = (e) => {
    e.preventDefault();
    const dog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
    };

    patchDog(newDog)
    .then((dog) => {
        dogForm.reset();
        delete dogForm.action;
        disableForm();
        return dog;
    })
    .then(dog => renderDog(dog, 'update'));
};
const populateForm = (dog) => {
    dogForm.name.value = dog.name;
    dogForm.breed.value = dog.breed;
    dogForm.sex.value = dog.sex;
    dogForm.action = `${URL}/${dog.id}`;
    enableForm();
};

const renderDog = (dog, update = false) => {
    let row;
    if(update) {
        row= dogTable.querySelector(`[dog-data-id = '{dog.id}']`);
        row.innerHTML = '';
    } else{
    row = document.createElement('tr');
    row.dataset.dogId = dog.id;
    }

    const [nameElement, breedElement, sexElement] = Array.from([1, 2, 3], x => document.createElement('td'));
    nameElement.innerText = dog.name;
    breedElement.innerText = dog.breed;
    sexElement.innerText = dog.sex;
    }
const editElement = document.createElement('button');
editElement.innerText = 'Edit dog';
editElement.addEventListener('click', () => {
    populateForm(dog);
    dogForm.addEventListener('submit', handleSubmit);
});
    
//on click of the edit button, set inner Text of the form with that dog's details.
row.append(nameElement, breedElement, sexElement, editElement);
    return row;

const saveDogs = (fetchedDogs) => {
    dogs = fetchedDogs;
    return fetchedDogs;
};


const renderDogs = () => {
    dogTable.innerHTML = '';
    dogs.forEach((dog) => {
        dogTable.append(renderDog(dog));
    });
};
