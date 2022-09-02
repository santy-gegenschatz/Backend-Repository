class User {
    name: string;
    surname: string;
    books: [object | any];
    pets: [string]
    
    constructor (name: string, surname: string, books: [Book], pets: [string]) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() : string {
        const stringConcat = this.name + ' ' + this.surname
        return stringConcat
    }

    addPet(name: string) {
        this.pets.push(name);
    }

    addBook(name: string, author: string) {
        const newBook = {
            name : name,
            author : author
        }

        this.books.push(newBook);
    }

    countPets() : Number {
        return this.pets.length
    }

    getBookNames() {
        let returnArray: string[] = []
        this.books.forEach( (book) => { returnArray.push(book.name)})
        return returnArray;
    }

}

class Book {
    name: string;
    author: string;

    constructor(name: string, author: string) {
        this.name = name;
        this.author = author;
    }
}

const firstBook = new Book('Lord of the Flies', 'William Golding');
const secondBook = new Book('Foundation', 'Isaac Asimov');

const user = new User('John', 'Doe', [firstBook], ['Goofy'])

// Log the beginning of the program
console.log(('---Program starting---'));

// Log the user name
console.log(user.getFullName());

// Add one Book
user.addBook(secondBook.name, secondBook.author);

// Add one pet
user.addPet('Donald');

// Log the pet Count
console.log('Number of pets: ', user.countPets());

// Log the book names
console.log('Book names: ', user.getBookNames());

// Log end of the program
console.log('---End of the program---');
