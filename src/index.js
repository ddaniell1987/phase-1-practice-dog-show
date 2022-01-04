document.addEventListener('DOMContentLoaded', () => {
    disableForm();
    api(DOGS_URL)
    .then(saveDogs)
    .then(renderDogs)
    .catch(error => alert('API error: sorry cannot fetch dog'));
});

const DOGS_URL = "http://localhost:3000/dogs";
const dogTable = document.querySelector("#table-body");
const dogForm = document.querySelector("#dog-form");

let dogs = [];

const patchDog = (newDog) => {
    const options =  {
        method: 'PATCH',
        header: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDog)
    };
    return api(dogForm.action,options)
    .catch(err => alert('API error: cannot update the dogs'));
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

const handleSubmit = (event) => {
    e.preventDefault();
    const dog = {
        name: dogForm.name.value,
        breed: dogForm.breed.value,
        sex: dogForm.sex.value,
    };

    patchDog(dog)
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
};

const renderDog = (dog, update = false) => {
    let dogRow;
    if(update) {
        dogRow= dogTable.querySelector(`[dog-data-id = '{dog.id}']`);
        dogRow.innerHTML = '';
    } else{
    dogRow = document.createElement('tr');
    dogRow.dataset.dogId = dog.id;
    }

    const[nameElement, breedElement, sexElement] =Array.from([1, 2, 3], x => document.createElement('td'));
    nameElement.innerText = 'Edit dog';
    editElement.addEventListener('click', () => {
        populateForm(dog);
        dogForm.addEventListener('submit', handleSubmit);
    });

    row.append(nameElement, breedElement, sexElement, editElement);
    return row;
}
//on click of the edit button, set inner Text of the form with that dog's details.
const saveDogs = () => {
    dogs = fetchDogs;
    return fetchDogs;
}

const renderDogs = () => {
    dogTable.innderHTML = '';
    dogs.forEach((dog) => {
        dogTable.appendChild(renderDog(dog));
    });
};
