class User {
    name: string;
    surname: string;
    books: [object];
    pets: [string]
    
    constructor (name: string, surname: string, books: [object], pets: [string]) {
        this.name = name;
        this.surname = surname;
        this.books = books;
        this.pets = pets;
    }

    getFullName() : string {
        const stringConcat = name + ' ' + this.surname
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

    getBookNames() : [string] {
        const returnArray = []
        this.books.forEach( (book) => { returnArray.push(book.name)})

    }

}

const user = new User('John', 'Doe', [], ['Goofy'])
console.log(user.getFullName());



