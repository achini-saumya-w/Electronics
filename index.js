// Dummy electronics data
const electronicsData = [
    {
        id: 1,
        name: '',
        category: 'Mobile Phone',
        price: 'Rs.50,000',
        location: 'Colombo',
        warranty: 24,
        year: 2022,
        images: ['img5.jpg', 'img5.jpg', 'img5.jpg'],
        postedDate: '2023-01-01',
        description: ''
    },
    {
        id: 2,
        name: '',
        category: '',
        price: 'Rs.50,000',
        location: 'Colombo',
        warranty: 24,
        year: 2022,
        images: ['img4.jpg', 'img4.jpg', 'img4.jpg', 'img4.jpg'],
        postedDate: '2023-01-01',
        description: ' '
    },
    {
        id: 3,
        name: '',
        category: '',
        price: 'Rs.50,000',
        location: 'Colombo',
        warranty: 24,
        year: 2022,
        images: ['img3.jpg', 'img3.jpg', 'img3.jpg', 'img3.jpg'],
        postedDate: '2023-01-01',
        description: ''
    },
    
];

let filteredElectronics = [...electronicsData];

function handleSearch() {
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const location = document.getElementById('location').value;
    const warranty = document.getElementById('warranty').value;
    const year = document.getElementById('year').value;
    const category = document.getElementById('category').value;

    filteredElectronics = electronicsData.filter(electronic => {
        return (!minPrice || electronic.price >= minPrice) &&
               (!maxPrice || electronic.price <= maxPrice) &&
               (!location || electronic.location.toLowerCase().includes(location.toLowerCase())) &&
               (!warranty || electronic.warranty >= warranty) &&
               (!year || electronic.year >= year) &&
               (!category || electronic.category.toLowerCase().includes(category.toLowerCase()));
    });

    displayElectronics();
}

function displayElectronics() {
    const electronicsContainer = document.getElementById('electronicsContainer');
    electronicsContainer.innerHTML = '';

    filteredElectronics.forEach(electronic => {
        const card = document.createElement('div');
        card.className = 'col-md-4';
        card.innerHTML = `
            <div class="card mb-4 electronic-card">
                <div id="carousel${electronic.id}" class="carousel slide" data-ride="carousel">
                    <div class="carousel-inner">
                        ${electronic.images.map((img, index) => `
                            <div class="carousel-item ${index === 0 ? 'active' : ''}">
                                <img class="d-block w-100" src="${img}" alt="Electronic image">
                            </div>`).join('')}
                    </div>
                    <a class="carousel-control-prev" href="#carousel${electronic.id}" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carousel${electronic.id}" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${electronic.name}</h5>
                    <p class="card-text">Category: ${electronic.category}</p>
                    <p class="card-text">Price: ${electronic.price}</p>
                    <p class="card-text">Location: ${electronic.location}</p>
                    <p class="card-text">Warranty: ${electronic.warranty} months</p>
                    <p class="card-text">Year: ${electronic.year}</p>
                    <p class="card-text">Posted: ${electronic.postedDate}</p>
                    <p class="card-text">${electronic.description.slice(0, 100)}... <a href="#" onclick="handleViewDetails(${electronic.id})">View More</a></p>
                    <button class="btn btn-primary" onclick="handleViewDetails(${electronic.id})">View Details</button>
                </div>
            </div>`;
        electronicsContainer.appendChild(card);
    });
}

function handleViewDetails(id) {
    const electronic = filteredElectronics.find(e => e.id === id);
    const modal = new bootstrap.Modal(document.getElementById('electronicsModal'));

    document.getElementById('electronicsModalLabel').innerText = electronic.name;
    document.getElementById('carouselInner').innerHTML = electronic.images.map((img, index) => `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
            <img class="d-block w-100" src="${img}" alt="Electronic image">
        </div>`).join('');
    document.getElementById('modalCategory').innerText = `Category: ${electronic.category}`;
    document.getElementById('modalPrice').innerText = `Price: ${electronic.price}`;
    document.getElementById('modalLocation').innerText = `Location: ${electronic.location}`;
    document.getElementById('modalWarranty').innerText = `Warranty: ${electronic.warranty} months`;
    document.getElementById('modalYear').innerText = `Year: ${electronic.year}`;
    document.getElementById('modalPostedDate').innerText = `Posted: ${electronic.postedDate}`;
    document.getElementById('modalDescription').innerText = electronic.description;

    modal.show();
}

document.addEventListener('DOMContentLoaded', () => {
    displayElectronics();
});
